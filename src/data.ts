import { ProfileData } from "./types";

export const profileData: ProfileData = {
  name: "강대연",
  title: "EMBEDDED BLOCK CODING EDUCATOR",
  subtitle: "임베디드 하드웨어 & 블록코딩 융합 교육 전문가",
  contact: {
    phone: "010-4821-3754",
    email: "gigabitamin@gmail.com",
    website: "www.kangembeddededu.com",
    location: "Seoul, South Korea",
    homepage: "https://hearthchat.app/",
    youtube: "https://www.youtube.com/@gigabitamin",
    instagram: "https://www.instagram.com/gigabitamin/",
    threads: "https://www.threads.net/@gigabitamin"
  },
  bio: "임베디드 하드웨어와 블록코딩 교육을 결합한 융합형 교육 콘텐츠를 개발하며 학생 중심의 실습 교육을 진행해온 교육자입니다. 다양한 연령대의 학습자를 대상으로 창의적 문제 해결 능력과 논리적 사고를 키울 수 있는 프로젝트 기반 수업을 운영해왔습니다. 기술을 단순히 전달하는 것이 아니라 실제 생활 속 문제를 해결하는 도구로 활용하도록 돕는 것을 목표로 하고 있습니다. 협업과 소통을 기반으로 학습 몰입도를 높이며, 최신 에듀테크와 임베디드 기술 트렌드를 교육 현장에 적용하는 데 큰 열정을 가지고 있습니다.",
  skills: [
    {
      name: "Arduino & Microcontroller Programming",
      rating: 5,
      description: "아두이노, ATmega 계열 마이크로컨트롤러 활용 하드웨어 제어 및 회로 설계 실무 교육"
    },
    {
      name: "Scratch / Blockly Educational Coding",
      rating: 5,
      description: "스크래치, 블록클리(Blockly) 기반 교육용 코딩 플랫폼 및 학년별 맞춤 블록 교구 설계"
    },
    {
      name: "IoT & Sensor Integration",
      rating: 4,
      description: "조도/온습도/초음파 등 다양한 센서 융합 하드웨어 및 Wi-Fi/Bluetooth 연동 스마트 IoT 키트 개발"
    }
  ],
  experience: [
    {
      company: "스마트에듀랩",
      period: "2023/03 - Present",
      role: "임베디드 블록코딩 교육 강사",
      description: "초·중학생 대상의 임베디드 블록코딩 교육 커리큘럼을 설계하고 운영하였습니다.",
      highlights: [
        "Arduino 기반 센서 제어와 블록형 프로그래밍을 연동하는 실전 기획 수업 구성",
        "학생 개개인의 문제 해결력을 기르는 '메이커 서밋' 프로젝트 발표형 수업 신규 도입 및 학부모 참관 유치",
        "초·중등 공기관 계약용 맞춤 하드웨어 모듈 및 쉘 케이싱을 포함한 에듀테크 교구 키트 설계 참여"
      ]
    },
    {
      company: "퓨처메이커스 교육센터",
      period: "2021/07 - 2023/02",
      role: "메이커 교육 콘텐츠 개발자",
      description: "IoT 및 피지컬 컴퓨팅 기반의 메이커 교육 콘텐츠를 기획하고 제작하였습니다.",
      highlights: [
        "블록코딩과 하드웨어 인터페이스를 연동한 하이브리드 실습 교구 및 디지털 지도 가이드라인 편찬",
        "전국 약 150여 개 교육기관 및 거점 메이커 스페이스에 배포된 하드웨어 실습 자료 및 워크북 총괄 기획",
        "일선 초·중등 전문 교사 대상의 피지컬 메이커 코딩 지도안 연수 워크숍 메인 패널 참여"
      ]
    },
    {
      company: "에듀테크 코리아",
      period: "2019/01 - 2021/06",
      role: "코딩교육 연구원",
      description: "어린이 및 청소년 대상 코딩 교육 프로그램을 연구하고 학습 데이터를 분석하였습니다.",
      highlights: [
        "Scratch x Arduino 센서 피드백 소프트웨어 융합 교육 모델 시각화 프레임워크 연구",
        "정규 방과후 교무실 연동 창의 학습 코스 설계 및 약 1,200명의 학습 진척도 데이터 마이닝 분석",
        "교육 만족도 피드백 사이클을 도입한 에듀테크 소프트웨어 사용자인터페이스(UI) 최적화 제안"
      ]
    }
  ],
  education: [
    {
      school: "고려대학교 (Korea University)",
      major: "교육공학 (Educational Technology)",
      degree: "교육학 석사 (Master of Education)",
      period: "2024/03 - 2026/02"
    },
    {
      school: "한밭대학교 (Hanbat National University)",
      major: "전자·임베디드 시스템공학 (Electronics & Embedded Systems)",
      degree: "공학사 (Bachelor of Engineering)",
      period: "2015/03 - 2019/02"
    }
  ],
  languages: [
    { name: "한국어 (Korean)", rating: 5, level: "Native Speaker" },
    { name: "영어 (English)", rating: 4, level: "Business Fluency" },
    { name: "일본어 (Japanese)", rating: 2, level: "Basic Communication" }
  ]
};
