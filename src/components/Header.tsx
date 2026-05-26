import React, { useState, useEffect } from "react";
import { Cpu, Menu, X, ArrowRight, Cloud, Sun, Radio } from "lucide-react";

export default function Header() {
  const [seoulTime, setSeoulTime] = useState("");
  const [weather, setWeather] = useState({ text: "쾌청함", temp: "22°C" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Update Seoul Time (GMT+9)
    const updateTime = () => {
      const now = new Date();
      // Adjust to Seoul Time
      const options = {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      } as const;
      setSeoulTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch random weather description
    fetch("/api/weather-info")
      .then((res) => res.json())
      .then((data) => {
        if (data.temp) {
          setWeather({ text: data.text, temp: data.temp });
        }
      })
      .catch(() => {}); // Fallback silently
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 text-[#1A1A1A] py-5 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
      {/* Brand Identity */}
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleScrollTo("hero")}>
        <div className="relative flex items-center justify-center w-9 h-9 rounded-sm bg-[#1A1A1A]/5 border border-[#1A1A1A]/20 text-[#1A1A1A] group-hover:scale-105 transition-transform duration-300">
          <Cpu className="w-5 h-5 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-600 rounded-full border border-[#FDFCFB]" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-black tracking-tight text-base text-[#1A1A1A] uppercase">강대연</span>
          <span className="text-[9px] font-mono tracking-widest text-[#888888]">EMBEDDED CODER</span>
        </div>
      </div>

      {/* Desktop Meta & Status */}
      <div className="hidden lg:flex items-center gap-8 text-xs font-mono text-[#666666]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-ping" />
          <span>SEOUL TIME: <strong className="text-[#1A1A1A] font-semibold">{seoulTime}</strong> [GMT +9]</span>
        </div>
        <div className="h-4 w-px bg-[#1A1A1A]/10" />
        <div className="flex items-center gap-2">
          <Sun className="w-3.5 h-3.5 text-[#1A1A1A]" />
          <span>SEOUL: <strong className="text-[#1A1A1A] font-semibold">{weather.temp} ({weather.text})</strong></span>
        </div>
      </div>

      {/* Desktop Navigation Link Tags */}
      <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-sans font-medium">
        <button
          onClick={() => handleScrollTo("profile")}
          className="hover:text-[#888888] transition-colors focus:outline-none cursor-pointer"
        >
          Profile
        </button>
        <button
          onClick={() => handleScrollTo("simulator")}
          className="hover:text-[#888888] transition-colors focus:outline-none flex items-center gap-1.5 cursor-pointer"
        >
          <span className="px-1.5 py-0.5 rounded-sm bg-[#1A1A1A] text-white text-[9px] lowercase font-mono">live</span>
          Playground
        </button>
        <button
          onClick={() => handleScrollTo("skills")}
          className="hover:text-[#888888] transition-colors focus:outline-none cursor-pointer"
        >
          Skills
        </button>
        <button
          onClick={() => handleScrollTo("experience")}
          className="hover:text-[#888888] transition-colors focus:outline-none cursor-pointer"
        >
          Experience
        </button>
        <button
          onClick={() => handleScrollTo("education")}
          className="hover:text-[#888888] transition-colors focus:outline-none cursor-pointer"
        >
          Education
        </button>
        <button
          onClick={() => handleScrollTo("contact")}
          className="bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80 transition-all duration-300 font-bold px-4 py-1.5 rounded-sm text-[11px] flex items-center gap-1 cursor-pointer"
        >
          Contact <ArrowRight className="w-3 h-3" />
        </button>
      </nav>

      {/* Mobile Menu Toggle Button */}
      <div className="flex items-center gap-4 md:hidden">
        <div className="flex items-center gap-2 text-[11px] font-mono bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 px-2.5 py-1 rounded text-[#1A1A1A]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
          <span>{seoulTime}</span>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#1A1A1A] hover:text-[#1A1A1A]/75 transition-colors cursor-pointer"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FDFCFB] border-b border-[#1A1A1A]/10 px-6 py-8 flex flex-col gap-5 md:hidden shadow-xl z-50 animate-fadeIn text-sm">
          <button
            onClick={() => handleScrollTo("profile")}
            className="text-left py-2 border-b border-[#1A1A1A]/5 font-medium hover:text-[#888888] text-[#1A1A1A]"
          >
            01. Profile (교육자 상)
          </button>
          <button
            onClick={() => handleScrollTo("simulator")}
            className="text-left py-2 border-b border-[#1A1A1A]/5 font-medium hover:text-[#888888] text-[#1A1A1A] flex items-center justify-between"
          >
            <span>02. Block Coding Playground</span>
            <span className="px-2 py-0.5 rounded-sm bg-[#1A1A1A] text-white text-[9px] uppercase font-bold tracking-widest">interactive</span>
          </button>
          <button
            onClick={() => handleScrollTo("skills")}
            className="text-left py-2 border-b border-[#1A1A1A]/5 font-medium hover:text-[#888888] text-[#1A1A1A]"
          >
            03. Core Skills (전문 기술)
          </button>
          <button
            onClick={() => handleScrollTo("experience")}
            className="text-left py-2 border-b border-[#1A1A1A]/5 font-medium hover:text-[#888888] text-[#1A1A1A]"
          >
            04. Work History (교육 경력)
          </button>
          <button
            onClick={() => handleScrollTo("education")}
            className="text-left py-2 border-b border-[#1A1A1A]/5 font-medium hover:text-[#888888] text-[#1A1A1A]"
          >
            05. Academics & Languages (학력 및 언어)
          </button>
          <button
            onClick={() => handleScrollTo("contact")}
            className="bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80 text-center font-bold py-3 rounded-sm text-xs flex items-center justify-center gap-2 mt-2"
          >
            상담하기 (Contact) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
