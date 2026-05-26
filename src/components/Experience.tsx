import React from "react";
import { profileData } from "../data";
import { Calendar, Briefcase, Award, Library, Users } from "lucide-react";

export default function Experience() {
  
  // Custom metadata to enrich each company's card with extra stats & links
  const getExperienceMeta = (company: string) => {
    if (company.includes("스마트에듀랩")) {
      return {
        tag: "CURRENT ENGAGEMENT",
        subColor: "text-[#1A1A1A] border-[#1A1A1A]/10 bg-[#FAF9F6]",
        icon: <Users className="w-4 h-4 text-[#1A1A1A]" />,
        milestone: "🏆 2024 학부모 초청 공개 실시간 메이커 페어 성공 개최"
      };
    }
    if (company.includes("퓨처메이커스")) {
      return {
        tag: "CONTENT DEVELOPMENT CORES",
        subColor: "text-[#1A1A1A] border-[#1A1A1A]/10 bg-[#FAF9F6]",
        icon: <Library className="w-4 h-4 text-[#1A1A1A]" />,
        milestone: "⚡ 전국 150여 개 에듀케이션 거점 교구 가이드 배포 기안 완료"
      };
    }
    return {
      tag: "ACADEMIC INNOVATOR",
      subColor: "text-[#1A1A1A] border-[#1A1A1A]/10 bg-[#FAF9F6]",
      icon: <Award className="w-4 h-4 text-[#1A1A1A]" />,
      milestone: "🎯 청소년 학습 데이터 1,200건을 기반으로 한 소프트웨어 사용성 패턴 논문 보조"
    };
  };

  return (
    <section id="experience" className="py-24 bg-[#FAF9F6] border-b border-[#1A1A1A]/10 text-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        
        {/* Section Heading Editorial Row */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#1A1A1A]/10 pb-12 mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-[#666666] tracking-widest uppercase block mb-3">
              04 // EXPERIENCE CHRONICLE
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight">
              WORK HISTORY
            </h2>
          </div>
          <p className="text-zinc-500 font-mono text-xs max-w-sm tracking-widest uppercase md:text-right">
            에듀테크 현장에서 입증해 온 체계적 커리큘럼 설계 및 교수 경험
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="flex flex-col gap-16 relative">
          
          {/* Vertical Central Line Overlay for timeline grid */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-[#1A1A1A]/10 pointer-events-none select-none" />

          {profileData.experience.map((exp, idx) => {
            const meta = getExperienceMeta(exp.company);
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-stretch w-full relative transition-all duration-300 gap-8 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                
                {/* Timeline node bullet point */}
                <div className="absolute left-[10px] md:left-1/2 -translate-x-[5px] md:-translate-x-1.5 top-6 z-10 w-3 h-3 rounded-full bg-[#FAF9F6] border-2 border-[#1A1A1A]" />

                {/* Left Side: Empty space on larger screens, layout balance */}
                <div className="hidden md:block md:w-1/2" />

                {/* Right Side / Active Side: Actual Experience Card (1/2 width) */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-8">
                  <div className="bg-white border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 flex flex-col justify-between hover:border-[#1A1A1A]/30 transition-all duration-300 group shadow-sm">
                    
                    <div>
                      {/* Meta header bar */}
                      <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
                        <span className={`text-[9px] font-mono tracking-widest uppercase font-bold px-2.5 py-1.5 rounded-none border ${meta.subColor}`}>
                          {meta.tag}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Job title & company */}
                      <h3 className="text-2xl font-black font-serif text-[#1A1A1A] group-hover:text-[#1A1A1A]/80 transition-colors mb-2 leading-snug">
                        {exp.company}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-zinc-600 mb-5 font-medium font-sans">
                        <Briefcase className="w-4 h-4 text-zinc-400" />
                        <span>{exp.role}</span>
                      </div>

                      {/* Brief description */}
                      <p className="text-xs text-zinc-500 leading-relaxed mb-6 italic">
                        "{exp.description}"
                      </p>

                      {/* Direct Highlights list */}
                      <div className="flex flex-col gap-3 pt-6 border-t border-[#1A1A1A]/10">
                        <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest block mb-1">
                          수행 프로젝트 및 혁신 성과:
                        </span>
                        
                        {exp.highlights.map((hlt, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-3">
                            <span className="text-[#1A1A1A] font-mono text-xs font-bold leading-none mt-1">
                              •
                            </span>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                              {hlt}
                            </p>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Milestone Highlight Banner */}
                    <div className="mt-8 p-4 bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none flex items-center gap-3">
                      <div className="shrink-0">
                        {meta.icon}
                      </div>
                      <span className="text-[10px] font-sans text-zinc-500 tracking-wide font-medium">
                        {meta.milestone}
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
