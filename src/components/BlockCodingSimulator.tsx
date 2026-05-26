import React, { useState, useEffect, useRef } from "react";
import { Play, Square, RefreshCw, Cpu, Code, HelpCircle, Terminal, Clipboard, Check, Volume2 } from "lucide-react";

interface Block {
  id: string;
  type: "control" | "actuator" | "sensor_if" | "serial";
  color: string;
  text: string;
  cpp: string;
  simAction: (states: any, logger: (msg: string) => void, soundPlayer: () => void) => void;
}

export default function BlockCodingSimulator() {
  const [activePreset, setActivePreset] = useState("blink");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [boardLED, setBoardLED] = useState(false);
  const [boardBuzzerGlow, setBoardBuzzerGlow] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const simulationTimerRef = useRef<any>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Sound generator helper
  const playPulseSound = (freq = 950, ms = 120) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ms / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + ms / 1000);
    } catch (_) {}
  };

  // Predefined visual blocks dictionary
  const blocksDict: Record<string, Block> = {
    loop: {
      id: "loop",
      type: "control",
      color: "bg-[#4a154b] border-[##ec4899]",
      text: "➰ 계속 무한 반복 실행 (void loop)",
      cpp: "void loop() {",
      simAction: (_, log) => { log("[System] loop() 루틴을 다시 무한 반복 시작합니다."); }
    },
    led_on: {
      id: "led_on",
      type: "actuator",
      color: "bg-orange-600 border-orange-400 border",
      text: "⚡ DIGITAL WRITE [핀 13 LED] -> 켜기 (HIGH)",
      cpp: "  digitalWrite(13, HIGH);",
      simAction: (states, log) => {
        states.setLED(true);
        log("[Serial COM3] D13 HIGH - LED ON");
      }
    },
    led_off: {
      id: "led_off",
      type: "actuator",
      color: "bg-orange-800 border-orange-500 border",
      text: "🔌 DIGITAL WRITE [핀 13 LED] -> 끄기 (LOW)",
      cpp: "  digitalWrite(13, LOW);",
      simAction: (states, log) => {
        states.setLED(false);
        log("[Serial COM3] D13 LOW - LED OFF");
      }
    },
    delay: {
      id: "delay",
      type: "control",
      color: "bg-emerald-700 border-emerald-500 border",
      text: "⏱️ DELAY [1000 밀리초(1초)] 대기",
      cpp: "  delay(1000);",
      simAction: (_, log) => {
        log("[System] delay(1000) : 1초 대기 중...");
      }
    },
    buzzer_beep: {
      id: "buzzer_beep",
      type: "actuator",
      color: "bg-yellow-600 border-yellow-400 border",
      text: "🔊 TONE [핀 11 부저] -> 멜로디 연주 (950Hz)",
      cpp: "  tone(11, 950, 150);",
      simAction: (states, log, sound) => {
        states.setBuzzerGlow(true);
        sound();
        log("[Serial COM3] buzzer tone active: 950Hz");
        setTimeout(() => states.setBuzzerGlow(false), 200);
      }
    },
    if_dark: {
      id: "if_dark",
      type: "sensor_if",
      color: "bg-sky-700 border-sky-500 border",
      text: "💡 IF [A0 조도 센서값 < 300] 이라면 (어두움 감지)",
      cpp: "  if (analogRead(A0) < 300) {",
      simAction: (_, log) => {
        log("[Sensor A0] 조도 센서 측정값: 185 LUX (참 - 어둠 감지)");
      }
    },
    serial_dry: {
      id: "serial_dry",
      type: "serial",
      color: "bg-indigo-700 border-indigo-500 border",
      text: "🖥️ SERIAL PRINT [\"가로등 밤등 자동 활성화!\"] 출력",
      cpp: "    Serial.println(\"가로등 밤등 자동 활성화!\");",
      simAction: (_, log) => {
        log("[Serial COM3] PRINT: 가로등 밤등 자동 활성화!");
      }
    }
  };

  // Preset Configurations representing lesson modules
  const presets: Record<string, { title: string; desc: string; blocks: string[]; hexSize: string }> = {
    blink: {
      title: "기초 01: LED 1초 간격 깜빡이기",
      desc: "지연(delay) 블록과 디지털 출력 블록을 사용하여 아두이노 온보드 LED를 주기에 맞춰 깜빡이는 피지컬 컴퓨팅의 헬로월드 래슨입니다.",
      blocks: ["loop", "led_on", "delay", "led_off", "delay"],
      hexSize: "9,428"
    },
    nightlight: {
      title: "응용 02: 스마트 가로등 (조도 자동 센서)",
      desc: "A0 아날로그 조도센서로 수집한 빛 밝기를 비교하여 어두워졌을 때(300 Lux 미만) 자동으로 전등을 켜고 시리얼 경고를 보냅니다.",
      blocks: ["loop", "if_dark", "led_on", "serial_dry", "delay", "led_off", "delay"],
      hexSize: "11,844"
    },
    buzzer_melody: {
      title: "융합 03: 화재 경보 비프 버저 사이렌",
      desc: "피에조 수동 부저(D11) 모듈에 특정 주파수의 전기 펄스를 통과시켜 소리 주파수를 내는 하드웨어 연동 피지컬 알림 장치 실습입니다.",
      blocks: ["loop", "led_on", "buzzer_beep", "delay", "led_off", "delay"],
      hexSize: "10,212"
    }
  };

  // Compile active block C++ code representatively
  const generateCppCode = (blockList: string[]) => {
    let code = `/**\n * Dae-yeon Block Educative Auto-Generated C++ Sketch\n * Educational Template for Arduino Uno R3\n */\n\n`;
    code += `void setup() {\n`;
    code += `  pinMode(13, OUTPUT);     // 온보드 LED 출력 설정\n`;
    code += `  pinMode(11, OUTPUT);     // 피에조 부저 핀 설정\n`;
    code += `  Serial.begin(9600);      // COM3 시리얼 통신 초기화\n`;
    code += `}\n\n`;

    // Setup main body loop
    code += `void loop() {\n`;
    let indent = "  ";
    blockList.forEach((bId) => {
      if (bId === "loop") return;
      
      const block = blocksDict[bId];
      if (block) {
        if (bId === "serial_dry") {
          code += "  " + block.cpp + "\n";
        } else {
          code += block.cpp + "\n";
        }
      }
    });
    
    // Close blocks if they was condition
    if (blockList.includes("if_dark")) {
      code += `  }\n`;
    }
    code += `}`;
    return code;
  };

  const activeBlockIds = presets[activePreset]?.blocks || presets.blink.blocks;
  const activeCppCode = generateCppCode(activeBlockIds);

  const addLog = (msg: string) => {
    setConsoleLogs((prev) => [...prev, msg]);
  };

  // Handle simulation run loop
  const startSimulation = () => {
    if (isPlaying) {
      stopSimulation();
      return;
    }

    setIsPlaying(true);
    setConsoleLogs([]);
    setCurrentStepIndex(0);
    setBoardLED(false);
    setBoardBuzzerGlow(false);

    // Booting sequences logger
    addLog("[System] 아두이노 가상 컴파일러 가동...");
    setTimeout(() => {
      addLog("[System] 링크 및 타겟 스케치 스택 검사 확인 완료.");
      addLog(`[System] 가상 업로드 성공 (스케치 크기: ${presets[activePreset].hexSize} 바이트)`);
      addLog("[System] COM3 포트 바우드 레이트 9600 열림.");
      addLog("[System] ------------------------------------------------");
      
      // Start loop step iteration
      let step = 0;
      const runNextStep = () => {
        if (step >= activeBlockIds.length) {
          step = 0; // Loop indefinitely
        }
        
        setCurrentStepIndex(step);
        const activeBlockId = activeBlockIds[step];
        const block = blocksDict[activeBlockId];

        if (block) {
          block.simAction(
            {
              setLED: setBoardLED,
              setBuzzerGlow: setBoardBuzzerGlow
            },
            addLog,
            () => playPulseSound(block.id === "buzzer_beep" ? 950 : 1200, 150)
          );
        }

        step++;
        simulationTimerRef.current = setTimeout(runNextStep, 1500); // 1.5s interval per block step
      };

      runNextStep();
    }, 1000);
  };

  const stopSimulation = () => {
    setIsPlaying(false);
    setCurrentStepIndex(-1);
    setBoardLED(false);
    setBoardBuzzerGlow(false);
    if (simulationTimerRef.current) {
      clearTimeout(simulationTimerRef.current);
      simulationTimerRef.current = null;
    }
    addLog("[System] 시뮬레이션 중단됨. 아두이노 하드웨어 파워 다운.");
  };

  useEffect(() => {
    stopSimulation();
    setConsoleLogs([]);
  }, [activePreset]);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeCppCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="simulator" className="py-24 bg-[#FDFCFB] border-b border-[#1A1A1A]/10 text-[#1A1A1A]">
      <div className="max-w-[1450px] mx-auto px-6 md:px-12 w-full">
        
        {/* Editorial Subheader */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#1A1A1A]/10 pb-12 mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-[#666666] tracking-widest uppercase block mb-3">
              02 // LECTURE WORKSPACE
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-[#1A1A1A]">
              INTERACTIVE CODES
            </h2>
          </div>
          <p className="text-[#666666] font-mono text-xs max-w-sm tracking-widest uppercase md:text-right">
            강대연 선생님의 가상 블록 코딩 & C++ 임베디드 시뮬레이터
          </p>
        </div>

        {/* Introduction text */}
        <div className="bg-white border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-sm">
          <div className="lg:col-span-8">
            <h3 className="text-lg font-bold text-[#1A1A1A] font-serif mb-2">💡 실제 교육 현장에서 사용되는 블록 프로그래밍 체험</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              본 모듈은 아두이노 C++ 프로그래밍과 스크래치형 교육용 블록 제어의 결합 시너지를 직접 테스트할 수 있도록 특수 설계된 포트폴리오 기믹입니다. 아래에서 다른 <strong>교육 데모 레슨을 클릭</strong>해 보고, <strong>[▶ 코드 업로드 및 실행]</strong> 버튼을 통해 가상 마이크로컨트롤러가 동작하는 모습을 실시간 햅틱 사운드와 시리얼 모니터로 감상해 보세요!
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
            {Object.keys(presets).map((key) => (
              <button
                key={key}
                onClick={() => setActivePreset(key)}
                className={`px-4 py-2.5 rounded-none text-xs font-sans tracking-wide transition-all border font-bold cursor-pointer ${
                  activePreset === key
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm"
                    : "bg-white border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-[#1A1A1A]"
                }`}
              >
                {presets[key].title.split(":")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Simulation Sandbox Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
          
          {/* Column A: Visual Blocks Stack (4 cols) */}
          <div className="xl:col-span-4 flex flex-col bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none p-5 md:p-6 justify-between gap-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs font-mono text-[#666666] border-b border-[#1A1A1A]/10 pb-3">
                <span>[BLOCK ARDU-WORKSPACE]</span>
                <span className="text-[#1A1A1A] font-bold">Notched Stack</span>
              </div>
              
              <div className="flex flex-col gap-2 relative pl-4 border-l border-zinc-200">
                {activeBlockIds.map((bId, idx) => {
                  const block = blocksDict[bId];
                  if (!block) return null;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={idx}
                      className={`relative px-4 py-3.5 rounded-none text-xs font-mono font-medium text-white transition-all duration-300 flex items-center justify-between shadow-sm ${
                        block.color
                      } ${
                        isCurrent 
                          ? "ring-4 ring-[#1A1A1A] ring-offset-2 ring-offset-[#FAF9F6] scale-102 translate-x-2 opacity-100"
                          : "opacity-85"
                      }`}
                      style={{
                        marginLeft: bId === "serial_dry" || (bId === "led_on" && activeBlockIds.includes("if_dark") && idx > 1 && idx < 4) ? "20px" : "0px",
                        clipPath: "polygon(0% 0%, 20% 0%, 25% 6px, 35% 6px, 40% 0%, 100% 0%, 100% 100%, 40% 100%, 35% calc(100% + 6px), 25% calc(100% + 6px), 20% 100%, 0% 100%)"
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-white animate-ping absolute -left-1" />}
                        <span>{block.text}</span>
                      </div>
                      
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold text-white animate-pulse font-sans">
                          RUN
                        </span>
                      )}
                    </div>
                  );
                })}

                {/* Closing Bracket if IF condition present */}
                {activeBlockIds.includes("if_dark") && (
                  <div className="bg-zinc-800 border border-[#1A1A1A]/20 px-3 py-1.5 rounded-none text-[10px] font-mono text-zinc-300 max-w-[120px]">
                    🔒 조건문 마감 (End IF)
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-white border border-[#1A1A1A]/10 rounded-none shadow-sm">
              <span className="text-[10px] font-mono text-[#666666] block mb-1">SELECTED LESSON MODULE:</span>
              <span className="text-sm font-bold text-[#1A1A1A] block mb-2">{presets[activePreset].title}</span>
              <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">{presets[activePreset].desc}</p>
            </div>
          </div>

          {/* Column B: Generated C++ Source View (4 cols) */}
          <div className="xl:col-span-4 flex flex-col bg-white border border-[#1A1A1A]/10 rounded-none overflow-hidden relative shadow-sm">
            <div className="flex justify-between items-center bg-[#FAF9F6] px-5 py-3.5 border-b border-[#1A1A1A]/10">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#1A1A1A]" />
                <span className="text-xs font-mono font-bold text-[#1A1A1A]">Arduino Sketch (C++)</span>
              </div>
              
              <button
                onClick={copyToClipboard}
                className="text-[#1A1A1A] hover:bg-zinc-100 transition-all flex items-center gap-1.5 text-[10px] font-mono w-fit bg-white px-2.5 py-1 rounded-none border border-[#1A1A1A]/15 shadow-sm cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Clipboard className="w-3.5 h-3.5" />}
                {copied ? "COPIED" : "COPY CODE"}
              </button>
            </div>

            <pre className="text-xs font-mono p-5 text-zinc-700 overflow-y-auto max-h-[460px] flex-1 leading-relaxed bg-[#FAF9F6]/20 select-all">
              <code>{activeCppCode}</code>
            </pre>
          </div>

          {/* Column C: Interactive Simulator Board & Console (4 cols) */}
          <div className="xl:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Visual Board Box */}
            <div className="bg-white border border-[#1A1A1A]/10 rounded-none p-5 flex flex-col justify-between items-center relative aspect-video shadow-sm">
              <div className="absolute top-3 left-4 text-[10px] font-mono text-[#888888]">
                PHY-SIM ENGINE
              </div>

              {/* Status lights bar */}
              <div className="absolute top-3 right-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-600 animate-pulse" : "bg-zinc-300"}`} />
                <span className="text-[9px] font-mono text-[#666666]">MCU POWER</span>
              </div>

              {/* Board Vector mockup rendering */}
              <div className="my-auto py-2 w-full flex justify-center">
                <div className="relative w-72 h-36 rounded-none bg-[#FDFCFB] border-2 border-[#1A1A1A] shadow-inner overflow-hidden">
                  {/* Silk text screen layers */}
                  <div className="absolute top-2 left-6 text-[#1A1A1A] font-mono text-[9px] font-black border border-[#1A1A1A]/20 px-1 py-0.5 select-none uppercase">KANG CORE EDU-BOARD</div>
                  <div className="absolute bottom-2 left-6 text-zinc-400 font-mono text-[7px] tracking-widest uppercase">MADE FOR YOUNG MAKERS</div>

                  {/* ATMEGA Microchip processor rectangle */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-20 w-32 h-10 bg-[#1A1A1A] border border-[#1A1A1A] rounded-none flex items-center justify-center">
                    <span className="text-[9px] font-mono text-white font-bold uppercase tracking-widest">ATMEGA328P</span>
                  </div>

                  {/* Pin connection header lines */}
                  <div className="absolute top-0 right-10 flex gap-1.5 bg-[#FAF9F6] py-0.5 px-3 border-b border-[#1A1A1A]/10 text-[6px] font-mono text-[#666666]">
                    <span>13</span><span>12</span><span className="text-[#1A1A1A] font-bold">11</span><span>10</span><span>9</span><span>GND</span>
                  </div>

                  {/* Interactive LED indicator */}
                  <div className="absolute top-5 right-24 flex flex-col items-center">
                    <span className="text-[7px] font-mono text-zinc-400 mb-1">L13 LED</span>
                    <div className={`relative w-4 h-4 rounded-full border transition-all duration-300 ${
                      boardLED 
                        ? "bg-orange-500 border-orange-400 shadow-sm" 
                        : "bg-zinc-200 border-zinc-300"
                    }`}>
                      {boardLED && <div className="absolute inset-0 bg-[#EA580C] rounded-full animate-ping opacity-70" />}
                    </div>
                  </div>

                  {/* Interactive Buzzer component circle */}
                  <div className="absolute bottom-4 right-8 flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="text-[6px] font-mono text-zinc-400">PIEZO ALARM</span>
                      <span className="text-[7px] font-mono text-[#1A1A1A] font-bold uppercase tracking-wide">D11</span>
                    </div>
                    <div className="relative w-8 h-8 rounded-full bg-white border border-[#1A1A1A]/20 flex items-center justify-center shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
                      {boardBuzzerGlow && <div className="absolute inset-x-0 inset-y-0 border-2 border-amber-500 rounded-full animate-ping" />}
                    </div>
                  </div>

                  {/* Input wire line simulation */}
                  <div className="absolute inset-y-0 inset-x-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <path d="M 200 18 L 205 32" stroke={boardLED ? "#EA580C" : "#E5E5E5"} strokeWidth="1" strokeDasharray="1,1" fill="none" />
                      <path d="M 235 110 L 250 18" stroke={boardBuzzerGlow ? "#EA580C" : "#E5E5E5"} strokeWidth="1.5" strokeDasharray="2,2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Upload control toggler buttons */}
              <button
                onClick={startSimulation}
                className={`w-full py-4 text-xs font-mono font-bold uppercase tracking-wider rounded-none flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                  isPlaying 
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-sm" 
                    : "bg-[#1A1A1A] hover:bg-[#1A1A1A]/85 text-white shadow-sm"
                }`}
              >
                {isPlaying ? <Square className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 fill-current text-white" />}
                {isPlaying ? "시뮬레이션 정지 (STOP)" : "▶ 코드 업로드 및 실행 (Upload & Run Code)"}
              </button>
            </div>

            {/* Smart Serial COM3 Terminal */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-none flex flex-col overflow-hidden h-56 shadow-md relative text-white">
              <div className="bg-[#0b0b0a] px-4 py-3.5 border-b border-zinc-900 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-[10px] font-mono tracking-widest text-[#a1a19a] uppercase">COM3 Serial Monitor (9600 bps)</span>
                </div>
                
                <button
                  onClick={() => setConsoleLogs([])}
                  className="text-zinc-400 hover:text-white text-[9px] font-mono uppercase bg-zinc-900 px-2 py-0.5 rounded-none border border-zinc-800 cursor-pointer"
                >
                  Clear Logs
                </button>
              </div>

              {/* Scrolling Log Output area */}
              <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] text-[#8deb8d] flex flex-col gap-1.5 selection:bg-zinc-800 leading-normal bg-zinc-950/40">
                {consoleLogs.length === 0 ? (
                  <span className="text-zinc-600 italic select-none">
                    현재 연결 유기 중. 코드 업로드 및 가동 시 실시간 입출력이 출력됩니다...
                  </span>
                ) : (
                  consoleLogs.map((log, idx) => {
                    const isSystem = log.startsWith("[System]");
                    const isSensor = log.startsWith("[Sensor");
                    return (
                      <div
                        key={idx}
                        className={`${
                          isSystem 
                            ? "text-zinc-400 font-bold" 
                            : isSensor 
                            ? "text-sky-400" 
                            : "text-[#8deb8d]"
                        }`}
                      >
                        {log}
                      </div>
                    );
                  })
                )}
                <div ref={consoleEndRef} />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
