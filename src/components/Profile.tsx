import React, { useState } from "react";
import { profileData } from "../data";
import { Award, Zap, BookOpen, Volume2, Sparkles, Sliders } from "lucide-react";

export default function Profile() {
  const [pin13Active, setPin13Active] = useState(false);
  const [sensorValue, setSensorValue] = useState(380); // Slider value 0-1023
  const [buzzerActive, setBuzzerActive] = useState(false);

  // Synthesize an embedded electronic buzzer sound using Web Audio API
  const playBuzzerSound = (frequency = 1200, duration = 0.15) => {
    try {
      setBuzzerActive(true);
      setTimeout(() => setBuzzerActive(false), duration * 1000);

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "square"; // Piezo alarm usually square wave
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      // Gentle fade out
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context not supported in this frame environment.", e);
    }
  };

  return (
    <section id="profile" className="py-24 bg-[#FAF9F6] border-b border-[#1A1A1A]/10 text-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        
        {/* Section Heading Editorial Row */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#1A1A1A]/10 pb-12 mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-[#666666] tracking-widest uppercase block mb-3">
              01 // CONCEPTUAL BIOGRAPHY
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight">
              EDUCATION & TECHNOLOGY
            </h2>
          </div>
          <p className="text-zinc-500 font-mono text-xs max-w-sm tracking-widest uppercase md:text-right">
            하드웨어 기술과 인간 중심의 교육공학이 만나는 스마트 에듀케이션
          </p>
        </div>

        {/* Content Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Human Resume Profile Description */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <h3 className="text-2xl md:text-3xl font-black font-serif text-[#1A1A1A] leading-tight max-w-lg italic">
              "기술을 넘어서, 직접 체감하며 성장하는 융합 교육을 기획합니다."
            </h3>
            
            <p className="text-[#444444] text-sm md:text-base leading-relaxed">
              {profileData.bio}
            </p>

            {/* Teaching Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-none bg-white border border-[#1A1A1A]/10 flex gap-4 shadow-sm hover:border-[#1A1A1A]/30 transition-all">
                <div className="text-[#1A1A1A]">
                  <BookOpen className="w-5 h-5 mt-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1A1A] font-sans">학생 중심의 프로젝트</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                    이론 위주 암기를 지양하며, 실생활 문제를 챌린지로 정의해 해결책을 직접 블록 코딩으로 구현합니다.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-none bg-white border border-[#1A1A1A]/10 flex gap-4 shadow-sm hover:border-[#1A1A1A]/30 transition-all">
                <div className="text-[#1A1A1A]">
                  <Award className="w-5 h-5 mt-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1A1A] font-sans">완벽한 학력-기술 융합</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                    전자·임베디드 엔지니어링 지식과 고려대 교육공학 석사 학위를 바탕으로, 깊이 있는 교수 모델과 에듀테크를 연구합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Core philosophy pullquote */}
            <div className="border-l-2 border-[#1A1A1A] pl-6 italic text-sm text-[#444444] font-serif my-4 py-1">
              "피지컬 코딩은 코딩의 결과를 가상 화면 속 픽셀에 머물게 하는 것이 아닌, 눈앞의 LED가 켜지고 센서 모터가 돌아가며 우리의 방을 변화시키는 하드웨어 체험입니다."
            </div>
          </div>

          {/* Right Column: Virtual Hardware Board Simulator Display Widget */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-[480px] rounded-none bg-white border border-[#1A1A1A]/10 p-6 md:p-8 flex flex-col gap-6 shadow-sm relative group hover:border-[#1A1A1A]/30 transition-all duration-300">
              
              {/* Header Widget */}
              <div className="flex justify-between items-center border-b border-[#1A1A1A]/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1A1A1A]" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A] font-bold">교육용 디지털 센서 실습 쉴드</span>
                </div>
                <span className="text-[9px] font-mono text-[#666666] bg-[#FAF9F6] border border-[#1A1A1A]/10 px-2.5 py-1 rounded-none">
                  v3.1 ONLINE
                </span>
              </div>

              {/* Hardware Board Interaction Console */}
              <div className="bg-[#FAF9F6] rounded-none p-5 border border-[#1A1A1A]/10 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                {/* Digital LED 13 Indicator Rendering */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-[#888888]">DIGITAL OUTPUT PIN D13</span>
                    <span className="text-xs text-[#1A1A1A] font-bold">오렌지 LED 다이오드</span>
                  </div>
                  <button
                    onClick={() => setPin13Active(!pin13Active)}
                    className={`px-4 py-2 text-[10px] font-mono rounded-none border transition-all duration-300 cursor-pointer ${
                      pin13Active
                        ? "bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold shadow-sm"
                        : "bg-white border-[#1A1A1A]/10 text-zinc-500 hover:text-[#1A1A1A] hover:border-[#1A1A1A]"
                    }`}
                  >
                    {pin13Active ? "● ACTIVE" : "○ HIGH (ON)"}
                  </button>
                </div>

                {/* Analog Light Sensor Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#888888]">ANALOG INPUT SENSOR A0</span>
                      <span className="text-xs text-[#1A1A1A] font-bold">A0 조도 센서 (광트랜지스터)</span>
                    </div>
                    <span className="text-xs font-mono text-[#1A1A1A] font-bold bg-[#1A1A1A]/5 px-2.5 py-0.5 border border-[#1A1A1A]/10 rounded-none">
                      ADC: {sensorValue} Lux
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <Sliders className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <input
                      type="range"
                      min="0"
                      max="1023"
                      value={sensorValue}
                      onChange={(e) => setSensorValue(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-200 rounded-none appearance-none cursor-pointer accent-[#1A1A1A]"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                    <span>어두움 (0)</span>
                    <span>밝음 (1023)</span>
                  </div>
                </div>

                {/* Active Buzzer Tone trigger */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-[#888888]">FREQUENCY AUDIO PIN D11</span>
                    <span className="text-xs text-[#1A1A1A] font-bold">피에조 부저 (스피커 출력)</span>
                  </div>
                  <button
                    onClick={() => playBuzzerSound(1100)}
                    className={`px-3 py-2 text-[10px] font-mono rounded-none border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      buzzerActive
                        ? "bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold"
                        : "bg-white border-[#1A1A1A]/10 text-zinc-500 hover:text-[#1A1A1A] hover:border-[#1A1A1A]"
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {buzzerActive ? "BEEPING!" : "소리 자극 (Beep)"}
                  </button>
                </div>
              </div>

              {/* Graphical Board Layout Representation */}
              <div className="relative border border-[#1A1A1A]/10 rounded-none p-4 bg-white flex flex-col items-center justify-center">
                {/* Board SVG representation */}
                <svg width="240" height="120" viewBox="0 0 240 120" className="opacity-95">
                  <rect x="5" y="5" width="230" height="110" rx="3" fill="#FDFCFB" stroke="#1A1A1A" strokeWidth="1.5" />
                  {/* Microprocessor chip */}
                  <rect x="75" y="40" width="90" height="36" rx="1" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="1.5" />
                  <text x="120" y="62" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KANG-UNO R3</text>
                  
                  {/* Glowing D13 LED */}
                  <circle cx="210" cy="30" r="6" fill={pin13Active ? "#EA580C" : "#E5E5E5"} stroke="#1A1A1A" strokeWidth="1" />
                  {pin13Active && <circle cx="210" cy="30" r="14" fill="#EA580C" opacity="0.3" className="animate-ping" />}
                  <text x="210" y="48" fill="#555" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">LED13</text>

                  {/* Piezo buzzer circle */}
                  <circle cx="35" cy="40" r="16" fill="#F0EFEA" stroke="#1A1A1A" strokeWidth="1.5" />
                  <circle cx="35" cy="40" r="4" fill="#1A1A1A" />
                  {buzzerActive && <circle cx="35" cy="40" r="28" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.4" className="animate-ping" />}
                  <text x="35" y="68" fill="#555" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">BUZZER D11</text>

                  {/* A0 Phototransistor light sensor */}
                  <rect x="30" y="85" width="12" height="12" rx="1" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.2" />
                  {/* Dynamic glow in phototransistor corresponding to brightness */}
                  <circle cx="36" cy="91" r="3.5" fill="#D4AF37" opacity={0.2 + (sensorValue / 1023) * 0.8} />
                  <text x="36" y="107" fill="#555" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A0 LIGHT</text>

                  {/* Technical connection wire representations */}
                  <path d="M 36 91 C 50 91, 50 58, 75 58" fill="none" stroke="#1A1A1A" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.3" />
                  <path d="M 35 40 C 50 40, 50 50, 75 50" fill="none" stroke="#1A1A1A" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.3" />
                  <path d="M 210 30 C 180 30, 180 44, 165 44" fill="none" stroke="#EA580C" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.3" />
                </svg>

                <p className="text-[10px] font-mono text-zinc-500 mt-3 text-center">
                  ▲ 이 장치는 브라우저 Web Audio 및 State 가상 연결되어 있습니다. <br />위 콘솔의 버튼과 슬라이더를 통해 반응을 실시간 확인해 보세요.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
