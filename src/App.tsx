import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import BlockCodingSimulator from "./components/BlockCodingSimulator";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-[#FDFCFB] min-h-screen text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-[#1A1A1A]/10 selection:text-[#1A1A1A]">
      {/* Editorial clean rule top border */}
      <div className="h-[1px] w-full bg-[#1A1A1A]/10" />
      
      {/* Header Sticky Navigation */}
      <Header />

      {/* Main Single-Scroll Structure */}
      <main>
        {/* Typographical Editorial Hero Block */}
        <Hero />

        {/* Human Bio & Live Sensor Shield Illustration */}
        <Profile />

        {/* Master Active Educational Code Simulator */}
        <BlockCodingSimulator />

        {/* Skills Capabilities Bento */}
        <Skills />

        {/* Chronological Dual-Track Work History timeline */}
        <Experience />

        {/* Academic Degrees & Multi-Language Star Gauges */}
        <Education />

        {/* Inquiries Portal and Gemini AI Twin Chat Helper */}
        <Contact />
      </main>

      {/* Editorial Footer */}
      <footer className="bg-[#FAF9F6] border-t border-[#1A1A1A]/10 py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-serif font-black tracking-widest text-[#1A1A1A] text-sm uppercase">강대연</span>
            <span className="text-[10px] font-mono tracking-widest text-[#666666]">EMBEDDED HW & BLOCK CODING SPECIALIST</span>
          </div>
          
          <div className="text-[#666666] font-mono text-[10px] text-center md:text-right leading-relaxed">
            <span>&copy; {new Date().getFullYear()} DAEYEON KANG. ALL RIGHTS RESERVED.</span>
            <span className="block mt-1">CRAFTED IN SOUTH KOREA // EDITORIAL EDITION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
