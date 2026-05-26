import React, { useState, useEffect, useRef } from "react";
import { profileData } from "../data";
import { Mail, Phone, MapPin, Globe, ArrowRight, Send, Sparkles, Youtube, Instagram, MessageCircle, HelpCircle } from "lucide-react";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export default function Contact() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"ai_twin" | "email">("ai_twin");
  
  // Custom contact form states
  const [emailForm, setEmailForm] = useState({ name: "", email: "", msg: "" });
  const [emailSent, setEmailSent] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);

  // Initialize helper welcome message on startup
  useEffect(() => {
    setChatHistory([
      {
        role: "model",
        text: `안녕하세요! 💡 임베디드 블록코딩 교육자 **강대연(Dae-yeon Kang)**의 AI 대화 지원 비서입니다.\n강대연 교육자의 **강의 경력, 아두이노 전문 교구, 교육 철학 및 출강/비즈니스 미팅 절차**에 대해 편히 질문해 보세요. 성심성의껏 대신 안내해 드리겠습니다.`,
      },
    ]);
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Append user input
    const newHistory = [...chatHistory, { role: "user" as const, text: textToSend }];
    setChatHistory(newHistory);
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/portfolio-chat", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           message: textToSend,
           history: chatHistory
         }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.text) {
        setChatHistory((prev) => [...prev, { role: "model" as const, text: data.text }]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { role: "model" as const, text: "죄송합니다. 서버로부터 유효한 응답을 받지 못했습니다. 다시 시도해 주세요." },
        ]);
      }
    } catch (e) {
      setIsTyping(false);
      setChatHistory((prev) => [
        ...prev,
        { role: "model" as const, text: "네트워크 통신 오류가 발생했습니다. 잠시 후 강대연 담당 비서와 재연동해 주세요." },
      ]);
    }
  };

  const handleQuickQuestion = (q: string) => {
    handleSendMessage(q);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.name || !emailForm.msg) return;
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setEmailSent(true);
      setEmailForm({ name: "", email: "", msg: "" });
      setTimeout(() => setEmailSent(false), 4000);
    }, 1200);
  };

  const quickQuestions = [
    "임베디드 하드웨어 결합 블록코딩 교육의 차별점은 무엇인가요?",
    "출장 강연 및 학부모 참관 수업 컨설팅 제안 연락 채널과 절차는 어떻게 되나요?",
    "개발하신 대표 맞춤형 임베디드 교구 키트에 대해 알려주세요."
  ];

  return (
    <section id="contact" className="py-24 bg-[#FDFCFB] text-[#1A1A1A] border-t border-[#1A1A1A]/10 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1A1A1A]/10" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        
        {/* Section Heading Editorial Row */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#1A1A1A]/10 pb-12 mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-[#666666] tracking-widest uppercase block mb-3">
              06 // COMMUNICATE & CONNECT
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-[#1A1A1A]">
              GET IN TOUCH
            </h2>
          </div>
          <p className="text-zinc-500 font-mono text-xs max-w-sm tracking-widest uppercase md:text-right">
            새로운 임베디드 마이크로 교육 기획 및 출강 프로젝트 협업 제안 환영
          </p>
        </div>

        {/* Contact Layout Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct info cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="text-2xl font-black text-[#1A1A1A] font-serif leading-tight">
              교육 자문 및 출강 파트너십 <br />
              상담 채널
            </h3>
            
            <p className="text-sm text-zinc-650 leading-relaxed max-w-md">
              초·중등 정규 교육 과정, 방과후 융합 교실 아두이노 블록코딩 클래스 기획, 교직원 교사 전문 연수 및 맞춤 피지컬 교재 공동 개발 협의를 언제든 제안하실 수 있습니다.
            </p>

            <div className="flex flex-col gap-5 mt-4">
              {/* Phone item */}
              <div className="flex items-center gap-4 p-4 rounded-none bg-white border border-[#1A1A1A]/10 shadow-sm">
                <div className="p-3 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-none">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block">DIRECT CALL</span>
                  <a href={`tel:${profileData.contact.phone}`} className="text-sm font-bold text-[#1A1A1A] hover:text-zinc-500 transition-colors">{profileData.contact.phone}</a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-center gap-4 p-4 rounded-none bg-white border border-[#1A1A1A]/10 shadow-sm">
                <div className="p-3 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-none">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block">OFFICIAL EMAIL</span>
                  <a href={`mailto:${profileData.contact.email}`} className="text-sm font-bold text-[#1A1A1A] hover:text-zinc-500 transition-colors">{profileData.contact.email}</a>
                </div>
              </div>

              {/* Location item */}
              <div className="flex items-center gap-4 p-4 rounded-none bg-white border border-[#1A1A1A]/10 shadow-sm">
                <div className="p-3 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-none">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block">BASE LOCATION</span>
                  <span className="text-sm font-bold text-[#1A1A1A]">{profileData.contact.location} (전국 출장 대응 가능)</span>
                </div>
              </div>

              {/* Website link */}
              <div className="flex items-center gap-4 p-4 rounded-none bg-white border border-[#1A1A1A]/10 shadow-sm">
                <div className="p-3 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-none">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block">LITERAL DOMAIN</span>
                  <a href={`http://${profileData.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#1A1A1A] hover:underline flex items-center gap-1">
                    {profileData.contact.website} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Social Link Badges bar */}
            <div className="mt-4 pt-6 border-t border-[#1A1A1A]/10">
              <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest block mb-4">공식 소셜 미디어 아카이브:</span>
              <div className="flex flex-wrap gap-3">
                
                <a
                  href={profileData.contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4.5 py-2.5 rounded-none bg-white border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#FAF9F6] text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Youtube className="w-4 h-4 text-red-600" />
                  YOUTUBE 📹
                </a>

                <a
                  href={profileData.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4.5 py-2.5 rounded-none bg-white border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#FAF9F6] text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Instagram className="w-4 h-4 text-[#1A1A1A]" />
                  INSTAGRAM 📸
                </a>

                <a
                  href={profileData.contact.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4.5 py-2.5 rounded-none bg-white border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#FAF9F6] text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-sky-600" />
                  THREADS 📝
                </a>

              </div>
            </div>

          </div>

          {/* Right Column: Interaction Window (AI Twin & Message Form toggle) (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-white border border-[#1A1A1A]/10 rounded-none overflow-hidden shadow-sm h-[560px]">
            
            {/* Toggle header header tab */}
            <div className="bg-[#FAF9F6] border-b border-[#1A1A1A]/10 flex px-2 py-1.5 justify-between items-center text-xs font-mono">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveTab("ai_twin")}
                  className={`px-4 py-2.5 rounded-none flex items-center gap-2 font-bold cursor-pointer transition-colors ${
                    activeTab === "ai_twin"
                      ? "bg-white text-[#1A1A1A] border border-[#1A1A1A]/15 shadow-sm"
                      : "text-zinc-500 hover:text-[#1A1A1A]"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> 강대연 AI 챗방 (AI Helper)
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  className={`px-4 py-2.5 rounded-none flex items-center gap-2 font-bold cursor-pointer transition-colors ${
                    activeTab === "email"
                      ? "bg-white text-[#1A1A1A] border border-[#1A1A1A]/15 shadow-sm"
                      : "text-zinc-500 hover:text-[#1A1A1A]"
                  }`}
                >
                  ✉️ 이메일 전송 (Private Note)
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-zinc-650 bg-white px-2.5 py-1 rounded-none border border-[#1A1A1A]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>ONLINE PORTAL</span>
              </div>
            </div>

            {/* Content box based on selected tab */}
            {activeTab === "ai_twin" ? (
              /* TAB 1: Gemini AI Twin Chat interface */
              <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
                
                {/* Scrollable messages container area */}
                <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 text-xs bg-[#FAF9F6]/20">
                  {chatHistory.map((item, index) => {
                    const isModel = item.role === "model";
                    return (
                      <div
                        key={index}
                        className={`max-w-[85%] flex flex-col gap-1.5 ${
                          isModel ? "self-start" : "self-end items-end"
                        }`}
                      >
                        <span className="text-[9px] font-mono text-zinc-400 uppercase px-1">
                          {isModel ? "🤖 강대연 AI 대변인" : "👤 방문자"}
                        </span>
                        
                        <div
                          className={`p-3.5 rounded-none border leading-relaxed ${
                            isModel
                              ? "bg-white border-[#1A1A1A]/10 text-zinc-700 shadow-sm animate-fade-in"
                              : "bg-[#FAF9F6] border-[#1A1A1A]/15 text-[#1A1A1A] shadow-sm"
                          }`}
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {item.text}
                        </div>
                      </div>
                    );
                  })}
                  
                  {isTyping && (
                    <div className="self-start max-w-[85%] flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase px-1">
                        🤖 강대연 AI 대변인
                      </span>
                      <div className="p-3 bg-white border border-[#1A1A1A]/10 rounded-none text-zinc-400 italic flex items-center gap-2 font-mono">
                        <span className="animate-bounce font-sans">•</span>
                        <span className="animate-bounce delay-100 font-sans">•</span>
                        <span className="animate-bounce delay-200 font-sans">•</span>
                        <span>Dae-yeon's AI Twin is writing a response...</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messageEndRef} />
                </div>

                {/* Question suggestions list */}
                {chatHistory.length < 5 && (
                  <div className="bg-[#FAF9F6] px-4 py-3 border-t border-[#1A1A1A]/10 flex flex-col gap-2 shadow-inner">
                    <span className="text-[8px] font-mono text-[#666666] uppercase tracking-widest flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#1A1A1A]" /> 아래 자주 묻는 교육 관련 추천 질문을 즉각 클릭해 보세요:
                    </span>
                    <div className="flex flex-col gap-1.5 max-h-24 overflow-y-auto">
                      {quickQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickQuestion(q)}
                          className="text-left text-[10px] text-zinc-650 hover:text-[#1A1A1A] bg-white hover:bg-[#FAF9F6] border border-[#1A1A1A]/15 hover:border-[#1A1A1A]/35 px-3 py-2 rounded-none transition-all truncate cursor-pointer shadow-sm"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input box */}
                <div className="bg-[#FAF9F6] p-4 border-t border-[#1A1A1A]/10 flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="강대연 에듀케이터의 프로필과 출강 일정에 관해 자유롭게 작성해 보세요..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage(chatInput)}
                    className="flex-1 bg-white border border-[#1A1A1A]/15 rounded-none px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] placeholder:text-zinc-400 font-sans shadow-sm"
                  />
                  
                  <button
                    onClick={() => handleSendMessage(chatInput)}
                    className="p-3.5 bg-[#1A1A1A] text-white hover:opacity-85 border border-[#1A1A1A] rounded-none transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4 fill-current text-white" />
                  </button>
                </div>

              </div>
            ) : (
              /* TAB 2: Standard Contact email form mock */
              <form onSubmit={handleEmailSubmit} className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white">
                <div className="flex flex-col gap-5">
                  <span className="text-[10px] font-mono text-[#1A1A1A] uppercase tracking-widest block mb-1">
                    전송 세부 항목 기입 (Private Outbox)
                  </span>

                  <div>
                    <label className="text-[10px] font-mono text-[#666666] uppercase block mb-1.5">제안 단체 / 귀하의 성명 (Required)</label>
                    <input
                      type="text"
                      required
                      placeholder="예시: 고려 교육재단 김지혁 팀장"
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]/45 placeholder:text-zinc-400 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#666666] uppercase block mb-1.5">회신 가능하신 연락처 정보 / 이메일 (Optional)</label>
                    <input
                      type="text"
                      placeholder="예시: service@educompany.org 또는 010-0000-0000"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]/45 placeholder:text-zinc-400 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#666666] uppercase block mb-1.5">제안 혹은 상담문의 내용 (Required)</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="출강 제정 및 기획하시고자 하는 센서 블록코딩 교육 프로그램, 연령대 규모에 대해 상세히 적어주시면 신속히 이메일로 회신해 드리겠습니다."
                      value={emailForm.msg}
                      onChange={(e) => setEmailForm({ ...emailForm, msg: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-none p-4 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]/45 placeholder:text-zinc-400 leading-relaxed font-sans shadow-inner"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  {emailSent ? (
                    <div className="bg-green-50 border border-green-200/50 p-4 rounded-none text-green-700 text-xs text-center font-bold font-serif shadow-sm animate-pulse">
                      ✓ 메시지가 로컬 메모리 버퍼에 완벽히 전송 저장되었습니다! 강대연 교육자 확인이 예약되었습니다.
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-[#1A1A1A] hover:bg-[#1A1A1A]/85 text-white font-bold text-xs uppercase py-4 rounded-none flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                    >
                      <Send className="w-4 h-4" /> 메시지 즉각 발송 (Submit Note)
                    </button>
                  )}
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
