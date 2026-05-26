import React from "react";
import { ArrowDown, Cpu, ChevronRight, Binary, Globe } from "lucide-react";

export default function Hero() {
  const stats = [
    {
      value: "100+",
      label: "CURRICULUM LECTURES",
      desc: "초·중학교 및 교육기관 대상 센서/하드웨어 제어 강연 설계 및 운영 횟수",
    },
    {
      value: "15+",
      label: "CUSTOM EDUCATIVE KITS",
      desc: "학교 교육과정 맞춤형 피지컬 센서 연동 에듀테크 하드웨어 교구 개발 개발 참여",
    },
    {
      value: "5,000+",
      label: "TRAINED STUDENTS",
      desc: "온·오프라인 메이커 블록코딩 수업을 경험한 누적 어린이 및 청소년 학습자 수",
    },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] bg-[#FDFCFB] flex flex-col justify-between border-b border-[#1A1A1A]/10 text-[#1A1A1A] overflow-hidden">
      {/* Editorial Tech Blueprint Overlays */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-400/5 via-[#1A1A1A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 bottom-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-yellow-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-[1600px] mx-auto pt-20 pb-16 px-6 md:px-12 items-center gap-12 z-10">
        {/* Left Side: Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 text-[10px] font-mono tracking-widest uppercase text-[#1A1A1A] px-3.5 py-1.5 rounded-none w-fit font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
            Featured Embedded Block Coding Educator
          </div>

          <div className="relative">
            {/* Outline title behind */}
            <h2 className="absolute -top-12 left-0 text-[6vw] lg:text-[7vw] font-black tracking-tighter text-[#1A1A1A]/5 uppercase select-none font-serif italic">
              Academic
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-black tracking-tighter leading-[0.9] text-[#1A1A1A] relative">
              강대연
              <span className="block text-base md:text-lg font-mono tracking-widest text-[#666666] mt-5 font-normal uppercase">
                EMBEDDED BLOCK CODING EDUCATOR
              </span>
            </h1>
          </div>

          <p className="text-[#444444] text-sm md:text-base max-w-xl leading-relaxed mt-4">
            임베디드 하드웨어와 블록코딩 교육을 결합하여 학생들이 직접 손으로 기기를 움직이고 가상의 반응을 도출하는 융합형 교육 콘텐츠를 만듭니다. 기술을 단순히 암기하는 지식이 아닌, 현실의 문제를 해결하는 논리적 열쇠로 가리키고 있습니다.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => handleScrollTo("simulator")}
              className="bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80 font-bold text-xs uppercase px-7 py-4 rounded-none transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer"
            >
              Playground 시뮬레이터 <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollTo("profile")}
              className="border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] font-semibold text-xs uppercase px-7 py-4 rounded-none transition-all duration-300 flex items-center gap-2 bg-transparent cursor-pointer"
            >
              교육 프로그램 & 약력
            </button>
          </div>
        </div>

        {/* Right Side: Virtual Interactive Microcontroller Board Graphic Overlay */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px] aspect-square rounded-none bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 flex flex-col justify-between overflow-hidden group hover:border-[#1A1A1A]/40 transition-all duration-500 shadow-sm">
            {/* Tech Design background grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none select-none" />

            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-2">
                <Binary className="w-5 h-5 text-[#1A1A1A]" />
                <span className="text-[10px] font-mono tracking-widest text-[#666666]">COM3: ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-none px-2.5 py-1 text-[9px] font-mono text-[#1A1A1A] font-bold">
                <Globe className="w-3 h-3 text-[#1A1A1A]" /> SEOUL, KOREA
              </div>
            </div>

            {/* Glowing Core Chip Vector */}
            <div className="my-auto py-8">
              <div className="relative w-44 h-44 mx-auto rounded-none bg-white border border-[#1A1A1A]/10 flex flex-col items-center justify-center shadow-sm hover:scale-105 transition-transform duration-500">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-1 bg-[#1A1A1A]/20 rounded-b" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-5 w-1 bg-[#1A1A1A]/20 rounded-t" />
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-1 bg-[#1A1A1A]/20 rounded-r" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-1 bg-[#1A1A1A]/20 rounded-l" />

                <Cpu className="w-13 h-13 text-[#1A1A1A] opacity-80" />
                <span className="text-[10px] font-mono text-[#1A1A1A] font-bold mt-2 tracking-widest">ATMEGA328</span>
                <span className="text-[8px] font-mono text-[#888888] mt-1">BLOCK-READY firmware v2.6</span>

                {/* Circuit lines decorative elements */}
                <div className="absolute w-[1px] h-[30px] bg-[#1A1A1A]/10 top-0 left-6" />
                <div className="absolute h-[1px] w-[30px] bg-[#1A1A1A]/10 bottom-8 right-0" />
                <div className="absolute w-[30px] h-[1px] bg-[#1A1A1A]/10 top-12 left-0" />
              </div>
            </div>

            <div className="flex justify-between items-center z-10 border-t border-[#1A1A1A]/10 pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-[#888888]">MCU FIRMWARE LICENSE</span>
                <span className="text-xs font-sans text-[#1A1A1A] font-semibold">Open-Source Blockly v3.1</span>
              </div>
              <button
                onClick={() => handleScrollTo("simulator")}
                className="text-[11px] font-mono text-[#1A1A1A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                코드 실행 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker Banner */}
      <div className="w-full bg-[#1A1A1A] border-y border-[#1A1A1A] py-3.5 uppercase text-[10px] font-mono tracking-widest text-[#FDFCFB] select-none pointer-events-none flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-12">
          <span>⚙️ HARDWARE INTEGRATION • 🧩 SCRATCH / BLOCKLY CODING • 🌐 SMART IOT SENSORS • 📚 AGENT CUSTOM PEDAGOGY • 🔌 ARDUINO MICROCONTROLLER •</span>
          <span>⚙️ HARDWARE INTEGRATION • 🧩 SCRATCH / BLOCKLY CODING • 🌐 SMART IOT SENSORS • 📚 AGENT CUSTOM PEDAGOGY • 🔌 ARDUINO MICROCONTROLLER •</span>
        </div>
      </div>

      {/* Premium Statistics Grid */}
      <div className="bg-[#FAF9F6] py-12 border-b border-[#1A1A1A]/10 w-full">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 p-6 rounded-none bg-white border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex justify-between items-baseline">
                <span className="text-4xl md:text-5xl font-black font-serif tracking-tight text-[#1A1A1A]">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono text-[#666666] tracking-widest uppercase">
                  {stat.label}
                </span>
              </div>
              <p className="text-xs text-[#555555] mt-2 leading-relaxed font-sans">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative arrow Down row */}
      <div className="flex justify-center py-6 bg-[#FAF9F6]/30">
        <button
          onClick={() => handleScrollTo("profile")}
          className="text-xs font-mono text-[#666666] hover:text-[#1A1A1A] transition-colors duration-300 capitalize flex items-center gap-2 animate-bounce cursor-pointer justify-center focus:outline-none"
        >
          <ArrowDown className="w-4.5 h-4.5" /> 아래로 슬라이딩하여 프로필 탐색
        </button>
      </div>
    </section>
  );
}
