import React from "react";
import { profileData } from "../data";
import { Cpu, Puzzle, Wifi, Star, CheckCircle, ChevronRight, Gauge } from "lucide-react";

export default function Skills() {
  // Mapping specific stylized icons to Dae-yeon's key skill categories
  const getSkillIcon = (name: string) => {
    if (name.toLowerCase().includes("arduino")) return <Cpu className="w-5 h-5 text-[#1A1A1A]" />;
    if (name.toLowerCase().includes("scratch")) return <Puzzle className="w-5 h-5 text-[#1A1A1A]" />;
    return <Wifi className="w-5 h-5 text-[#1A1A1A]" />;
  };

  // Adding specific technical keywords for visual enrichment
  const getSkillSpecs = (name: string) => {
    if (name.toLowerCase().includes("arduino")) {
      return ["ATmega328 / ESP32 MCU", "C/C++ Bare-Metal Programming", "PWM & Register Control", "Custom Circuit Prototyping"];
    }
    if (name.toLowerCase().includes("scratch")) {
      return ["Scratch 3.0 Custom Extensions", "Google Blockly JSON Configuration", "Visual Logic Puzzle Compiling", "K-12 Educational Pedagogy"];
    }
    return ["Wi-Fi & Bluetooth Smart Modules", "I2C, SPI, UART Communication", "Analog/Digital Sensor Pipelines", "Interactive IoT Web Dashboards"];
  };

  return (
    <section id="skills" className="py-24 bg-[#FAF9F6] border-b border-[#1A1A1A]/10 text-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        
        {/* Section Heading Editorial Row */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#1A1A1A]/10 pb-12 mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-[#666666] tracking-widest uppercase block mb-3">
              03 // EXPERT CAPABILITIES
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight">
              CORE SKILLS
            </h2>
          </div>
          <p className="text-zinc-500 font-mono text-xs max-w-sm tracking-widest uppercase md:text-right">
            하드웨어 제어 레벨부터 블록 교구 기획까지 관통하는 입증된 기술력
          </p>
        </div>

        {/* Skills Bento Style Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {profileData.skills.map((skill, index) => {
            const specs = getSkillSpecs(skill.name);
            const percentage = (skill.rating / 5) * 100;

            return (
              <div
                key={index}
                className="group relative rounded-none bg-white border border-[#1A1A1A]/10 p-6 md:p-8 flex flex-col justify-between overflow-hidden hover:border-[#1A1A1A]/30 transition-all duration-300 shadow-sm"
              >
                {/* Visual Accent Corner Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#1A1A1A]/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Skill Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none group-hover:scale-105 transition-transform duration-300">
                      {getSkillIcon(skill.name)}
                    </div>
                    
                    {/* Star ratings */}
                    <div className="flex gap-1.5 bg-[#FAF9F6] px-2.5 py-1.5 rounded-none border border-[#1A1A1A]/10 text-[10px] font-mono font-bold tracking-widest text-zinc-600">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] stroke-none" />
                      {skill.rating} / 5
                    </div>
                  </div>

                  {/* Skill name */}
                  <h3 className="text-xl font-bold font-serif text-[#1A1A1A] group-hover:text-[#1A1A1A]/80 transition-colors duration-200 mb-3 leading-snug">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Technical components and progress bars */}
                <div className="mt-4 pt-6 border-t border-[#1A1A1A]/10 flex flex-col gap-5">
                  
                  {/* Styled Level Gauge */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#888888]">
                      <span>기술 성숙도 레벨</span>
                      <span className="text-[#1A1A1A] font-bold">{percentage}% PROFICIENCY</span>
                    </div>
                    
                    <div className="h-2 w-full bg-[#FAF9F6] rounded-none overflow-hidden border border-[#1A1A1A]/10">
                      <div
                        className="h-full bg-[#1A1A1A] rounded-none transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Specs List with custom checks */}
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-[10px] font-mono text-[#666666] tracking-wider block mb-1">DETAILED TECHNOLOGIES:</span>
                    {specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-xs text-zinc-500">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1A1A1A] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic educational notice banner */}
        <div className="mt-12 bg-white border border-[#1A1A1A]/10 p-6 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none text-[#1A1A1A] shrink-0">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif text-[#1A1A1A]">공학 지식과 교육학 지식의 완벽한 얼라인먼트</h4>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1 max-w-2xl">
                하드웨어를 단순 조립하는 조교 수준의 코딩 강습이 존재하지만, 강대연 교육자는 마이크로컨트롤러 아키텍처 제어 역량(Bare-metal ASM/C)과 교육공학(Instructional Design) 마스터 학문을 동시에 축적하여 차원이 다른 원리 중심 교육을 개발합니다.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              const el = document.getElementById("simulator");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs font-mono font-bold text-[#1A1A1A] hover:opacity-85 shrink-0 flex items-center gap-1 cursor-pointer hover:underline"
          >
            플레이그라운드에서 기술 시뮬레이션 하기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
