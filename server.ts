import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// System instructions detailing Dae-yeon Kang's resume and tone
const systemInstruction = `
당신은 대한민국 대표 임베디드 하드웨어 및 블록코딩 교육 전문가인 '강대연(Dae-yeon Kang)'의 AI 디지털 분신(Twin)입니다.
방문자가 당신에게 강대연 교육자 및 그의 웹 포트폴리오에 대해 질문할 때, 아래의 프로필과 상세 경력을 기반으로 예의 바르고, 열정적이며 전문적인 어조로 한국어로 답변하십시오.

[기본 정보]
- 이름: 강대연 (Dae-yeon Kang)
- 역할: 임베디드 하드웨어 및 블록코딩 교육 전문가 (EMBEDDED BLOCK CODING EDUCATOR)
- 전화번호: 010-4821-3754
- 이메일: gigabitamin@gmail.com
- 웹사이트: www.kangembeddededu.com
- 거주지: 서울특별시 (Seoul, South Korea)
- 소셜 미디어: 
  * 홈 페이지: https://hearthchat.app/
  * 유튜브: https://www.youtube.com/@gigabitamin
  * 인스타그램: https://www.instagram.com/gigabitamin/
  * 스레드: https://www.threads.net/@gigabitamin

[소개글]
"임베디드 하드웨어와 블록코딩 교육을 결합한 융합형 교육 콘텐츠를 개발하며 학생 중심의 실습 교육을 진행해온 교육자입니다. 다양한 연령대의 학습자를 대상으로 창의적 문제 해결 능력과 논리적 사고를 키울 수 있는 프로젝트 기반 수업을 운영해왔습니다. 기술을 단순히 전달하는 것이 아니라 실제 생활 속 문제를 해결하는 도구로 활용하도록 돕는 것을 목표로 하고 있습니다. 협업과 소통을 기반으로 학습 몰입도를 높이며, 최신 에듀테크와 임베디드 기술 트렌드를 교육 현장에 적용하는 데 큰 열정을 가지고 있습니다."

[핵심 역량 (Skills)]
1. Arduino & Microcontroller Programming (★★★★★ 5/5)
   - 아두이노 및 ATmega 마이크로컨트롤러 활용 하드웨어 제어, 회로 설계, C/C++ 기반 코딩 교육
2. Scratch / Blockly Educational Coding (★★★★★ 5/5)
   - 스크래치, 블록클리(Blockly) 기반 교육용 코딩 플랫폼 기획, 학생 눈높이에 맞춘 교구 설계
3. IoT & Sensor Integration (★★★★☆ 4/5)
   - 조도, 온습도, 초음파, 수분 센서 등 융합 하드웨어 및 Wi-Fi/Bluetooth 무선 스마트 IoT 키트 개발

[경력 사항 (Work Experience)]
1. 스마트에듀랩 | 2023/03 - 현재
   - 역할: 임베디드 블록코딩 교육 강사
   - 아두이노 기반 센서 제어와 블록형 프로그래밍 연동 실전 커리큘럼 설계
   - 창의 문제 해결을 돕는 메이커 발표형 수업 도입, 학습 참여도 극대화
   - 맞춤형 교육 교구 키트 제작 프로젝트 참여
2. 퓨처메이커스 교육센터 | 2021/07 - 2023/02
   - 역할: 메이커 교육 콘텐츠 개발자
   - IoT 및 피지컬 컴퓨팅 기반 코딩 콘텐츠 기획, 전국 교육 기관에 배포
   - 교사 연수 프로그램 운영으로 일선 현장 적용성 강화
3. 에듀테크 코리아 | 2019/01 - 2021/06
   - 역할: 코딩교육 연구원
   - 청소년 대상 Scratch & Arduino 융합 교육 모델 설계 및 교육 품질 피드백 분석 시스템 기획

[학력 사항 (Education)]
1. 고려대학교 (Korea University) | 2024/03 - 2026/02
   - 전공: 교육공학 (Educational Technology)
   - 학위: 교육학 석사 (Master of Education)
2. 한밭대학교 (Hanbat National University) | 2015/03 - 2019/02
   - 전공: 전자·임베디드 시스템공학 (Electronics & Embedded Systems)
   - 학위: 공학사 (Bachelor of Engineering)

[언어 능력]
- 한국어 (Korean): ★★★★★ (Native)
- 영어 (English): ★★★★☆ (Business Fluency)
- 일본어 (Japanese): ★★☆☆☆ (Basic)

[답변 태도 지침]
1. 항상 높임말을 쓰고 온화하고 겸손하며 자신감 넘치는 교육자의 태도로 답하십시오.
2. 연락처나 이메일, 링크를 요청하면 정확히 기재해 주세요.
3. 아두이노나 피지컬 코딩 교육에 관한 상담 요청에 대해서는 그의 교육 철학('문제를 직접 해결하는 도구로서의 기술')을 강조해 주세요.
`;

// Helper for local keyword evaluation in case API key is missing
function getLocalFallbackAnswer(message: string): string {
  const norm = message.toLowerCase();
  
  if (norm.includes("연락") || norm.includes("번호") || norm.includes("전화") || norm.includes("폰") || norm.includes("이메일") || norm.includes("메일") || norm.includes("email") || norm.includes("phone")) {
    return `강대연 교육자의 연락처 정보입니다.\n\n• **휴대전화**: 010-4821-3754\n• **이메일**: gigabitamin@gmail.com\n• **기타 채널**: 홈페이지(www.kangembeddededu.com), 유튜브(@gigabitamin)... 편하게 연락주시면 친절하게 교육 및 자문 상담을 진행해 드리겠습니다! 💬`;
  }
  
  if (norm.includes("경력") || norm.includes("일") || norm.includes("근무") || norm.includes("회사") || norm.includes("스마트에듀랩") || norm.includes("퓨처메이커스") || norm.includes("에듀테크")) {
    return `임베디드 및 코딩 교육 분야에서 쌓아온 핵심 경력입니다.\n\n1. **스마트에듀랩 (2023/03 ~ 현재)**: 임베디드 블록코딩 교육 강사로 초·중등 주도형 메이커 발표 커리큘럼 및 맞춤 교구를 만듭니다.\n2. **퓨처메이커스 교육센터 (2021/07 ~ 2023/02)**: 메이커 교육 콘텐츠 개발자로 피지컬 컴퓨팅 워크북을 기획하고 전국에 배포하였습니다.\n3. **에듀테크 코리아 (2019/01 ~ 2021/06)**: 코딩교육 연구원으로 융합 모델과 피드백 피닝 루틴을 분석했습니다.`;
  }

  if (norm.includes("학력") || norm.includes("학교") || norm.includes("대학") || norm.includes("고려대") || norm.includes("한밭대") || norm.includes("공학") || norm.includes("석사")) {
    return `강대연 교육자의 탄탄한 융합 학력 정보입니다.\n\n• **석사**: 고려대학교 대학원 교육공학과 교육학 석사 (2024.03 ~ 2026.02)\n• **학사**: 한밭대학교 전자·임베디드 시스템공학과 공학사 (2015.03 ~ 2019.02)\n\n하드웨어 공학 지식과 고도의 교육공학 방법론을 합친 독자적인 시너지 교육 체계를 지향하고 있습니다. 🎓`;
  }

  if (norm.includes("기술") || norm.includes("역량") || norm.includes("아두이노") || norm.includes("블록") || norm.includes("코딩") || norm.includes("센서") || norm.includes("iot") || norm.includes("arduino") || norm.includes("coding")) {
    return `주요 임베디드 교육 전문 기술 역량입니다.\n\n• **Arduino & Microcontroller**: ★★★★★ (아두이노 제어, 회로 설계 코칭)\n• **Scratch & Blockly**: ★★★★★ (블록형 교육 소프트웨어 및 고유 교구 구현)\n• **IoT & Sensor**: ★★★★☆ (조도, 온습도, 블루투스/Wi-Fi 모듈 융합)\n\n단순한 암기식 코딩이 아니라, 학생들이 직접 주변 물리 장치를 제어하며 논린적 사고를 넓힐 수 있도록 돕습니다.`;
  }

  if (norm.includes("유튜브") || norm.includes("youtube") || norm.includes("채널") || norm.includes("인스타") || norm.includes("instagram") || norm.includes("스레드") || norm.includes("threads")) {
    return `각종 소셜 채널을 통해 다양한 교육 정보와 임베디드 콘텐츠를 소통하고 있습니다!\n\n• **유튜브 📹**: [유튜브 채널 가기](https://www.youtube.com/@gigabitamin)\n• **인스타그램 📸**: [@gigabitamin](https://www.instagram.com/gigabitamin/)\n• **스레드 📝**: [@gigabitamin](https://www.threads.net/@gigabitamin)\n\n구독하시고 에듀테크와 컨설팅 꿀팁을 확인해 보세요! ✨`;
  }

  if (norm.includes("철학") || norm.includes("목표") || norm.includes("소개") || norm.includes("가치") || norm.includes("자기소개")) {
    return `제 교육 철학은 **"기술을 단순히 전달하는 데 그치지 않고, 학생들이 문제를 직접 정의하고 해결하는 창의적 도구로 활용할 수 있도록 돕는 것"**입니다.\n\n공학적 백그라운드와 교육공학 석사 지식을 바탕으로 학습 몰입감을 최대화하는 실전형 에듀테크 콘텐츠를 기획·연구하고 있습니다.`;
  }

  return `안녕하세요! 임베디드 하드웨어 및 블록코딩 교육 전문가 **강대연**의 디지털 아바타입니다. 🤖\n\n강대연 교육자의 **경력, 학력, 핵심 역량(아두이노/블록코딩), 연락처(이메일/소셜 링크)** 및 그의 **교육 철학**에 대해 궁금하신 점을 자유롭게 물어보세요! 상세히 안내해 드리겠습니다.`;
}

// Chat API Route
app.post("/api/portfolio-chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Graceful offline simulated fallback
    const answer = getLocalFallbackAnswer(message);
    return res.json({
      text: answer,
      source: "local-simulated",
      note: "Gemini API Key is waiting to be configured. The reply is generated dynamically by Dae-yeon's interactive local knowledge base."
    });
  }

  try {
    // Convert request history format to Gemini format if present
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({
      text: response.text || "답변을 생성하지 못했습니다. 다시 시도해 주세요.",
      source: "gemini-api"
    });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    // Graceful error fallback
    const answer = getLocalFallbackAnswer(message);
    return res.json({
      text: `${answer}\n\n*(참고: Gemini API에서 오류가 발생하여 강대연 도우미 로컬 지식 기반으로 즉시 자동 전환되어 답변해 피킹했습니다: ${err.message})*`,
      source: "local-error-fallback"
    });
  }
});

// Weather state utility route for active time header widget
app.get("/api/weather-info", (req, res) => {
  // Return random elegant seoul weather description
  const weathers = [
    { text: "맑음", temp: "22°C", icon: "sunny" },
    { text: "쾌청함", temp: "24°C", icon: "wind" },
    { text: "구름 조금", temp: "21°C", icon: "cloud" },
    { text: "온화한 산들바람", temp: "23°C", icon: "breeze" }
  ];
  const choice = weathers[Math.floor(Math.random() * weathers.length)];
  res.json({ location: "Seoul, South Korea", ...choice });
});

// Vite server integrations
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on port ${PORT}`);
  });
}

startServer();
