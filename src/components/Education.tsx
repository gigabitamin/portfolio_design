import React from "react";
import { profileData } from "../data";
import { GraduationCap, Award, Landmark, Languages, Star, BadgeAlert } from "lucide-react";

export default function Education() {
  
  // Custom helper to provide educational details
  const getEduDetails = (school: string) => {
    if (school.includes("고려대학교")) {
      return {
        focus: "교육방법 및 교육공학 전공 (Educational Methods & Tech)",
        thesis: "교수설계 모델링, 가상 피지털 블록 환경 개발 프레임워크 설계 기안",
        subColor: "border-[#1A1A1A]/10 text-[#1A1A1A] bg-[#FAF9F6]"
      };
    }
    return {
      focus: "전자·임베디드 시스템공학 전공 (Electronics & Embedded Systems Engineering)",
      thesis: "마이크로컨트롤러 MCU 펌웨어 어셈블리어 제어, 소형 자주주행 로봇 학사 졸업 연구",
      subColor: "border-[#1A1A1A]/10 text-[#1A1A1A] bg-[#FAF9F6]"
    };
  };

  return (
    <section id="education" className="py-24 bg-[#FAF9F6] border-b border-[#1A1A1A]/10 text-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        
        {/* Section Heading Editorial Row */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#1A1A1A]/10 pb-12 mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-[#666666] tracking-widest uppercase block mb-3">
              05 // ACADEMICS & LINGUISTICS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight">
              EDUCATION & LANGUAGES
            </h2>
          </div>
          <p className="text-[#666666] font-mono text-xs max-w-sm tracking-widest uppercase md:text-right">
            탄탄한 공학 기반 과학 지식과 인간 혁신 교육 방법론의 융합
          </p>
        </div>

        {/* Modular Grid split (Education vs Languages) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column A: Academics Chronology (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-4 mb-2">
              <GraduationCap className="w-5 h-5 text-[#1A1A1A]" />
              <span className="text-sm font-mono tracking-widest uppercase text-zinc-500 font-bold">EDUCATIONAL DEGREES</span>
            </div>

            <div className="flex flex-col gap-8">
              {profileData.education.map((edu, idx) => {
                const details = getEduDetails(edu.school);

                return (
                  <div
                    key={idx}
                    className="p-6 md:p-8 rounded-none bg-white border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 transition-all duration-300 relative overflow-hidden shadow-sm"
                  >
                    {/* Tiny decorative stamp */}
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-500 bg-[#FAF9F6] px-2.5 py-1 rounded-none border border-[#1A1A1A]/10">
                      {edu.period}
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none text-[#1A1A1A] shrink-0">
                        <Landmark className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 flex flex-col gap-1.5 pt-1">
                        <h3 className="text-xl font-bold font-serif text-[#1A1A1A]">
                          {edu.school}
                        </h3>
                        
                        <p className="text-zinc-600 text-xs font-mono tracking-wide uppercase font-bold">
                          {edu.degree}
                        </p>

                        <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 flex flex-col gap-3">
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-0.5">상세 수학연구 분과:</span>
                            <span className="text-xs text-zinc-600 font-sans leading-normal">{details.focus}</span>
                          </div>
                          
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-0.5">학위 주요 산출물 / 졸업 연구 주제:</span>
                            <span className="text-xs text-zinc-500 font-sans leading-relaxed italic">"{details.thesis}"</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column B: Language Proficiencies (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-white border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-4 mb-2">
              <Languages className="w-5 h-5 text-[#1A1A1A]" />
              <span className="text-sm font-mono tracking-widest uppercase text-zinc-500 font-bold">GLOBAL LINGUISTICS</span>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed mb-4 font-sans">
              글로벌 교육 자료 수사, 아두이노 다국어 라이브러리 레퍼런스 분석, 글로벌 소프트웨어 릴리즈 로컬라이징이 가능한 역량 풀을 갖추고 있습니다.
            </p>

            <div className="flex flex-col gap-6">
              {profileData.languages.map((lang, lIdx) => {
                const percentage = (lang.rating / 5) * 100;

                return (
                  <div key={lIdx} className="flex flex-col gap-2 p-4 bg-[#FAF9F6] rounded-none border border-[#1A1A1A]/10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[#1A1A1A]">{lang.name}</span>
                      <span className="text-[10px] font-mono text-[#1A1A1A] font-semibold bg-white px-2.5 py-1 rounded-none border border-[#1A1A1A]/10">
                        {lang.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mt-1.5">
                      <div className="flex gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= lang.rating
                                ? "fill-[#D4AF37] text-[#D4AF37] stroke-none"
                                : "text-zinc-200 stroke-1"
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Bar indicator */}
                      <div className="h-1 bg-white flex-1 rounded-none overflow-hidden border border-[#1A1A1A]/10">
                        <div
                          className="h-full bg-[#1A1A1A]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none flex gap-3 shadow-inner">
              <div className="text-[#1A1A1A] shrink-0 font-bold">
                📖
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal font-sans">
                영어 수강 진행 및 비즈니스 토론 가능하며, 한-영 기술 워크북 번역 제작 경험을 구비하고 있습니다. 일본어는 기본적인 기계식 매뉴얼 해독 및 일상 대화 교류가 가능합니다.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
