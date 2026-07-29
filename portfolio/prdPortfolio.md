# Product Requirement Document (PRD): Personal Single-Page Portfolio Web

---

## 1. Executive Summary & Overview

- **Project Name**: Personal Portfolio Single-Page Web
- **Core Objective**: 개인의 작업물(Work)과 관심사(Interests)를 단 하나의 페이지에 직관적으로 시각화하고, Clean UI에 절제된 Nerdness와 강렬한 Madness, 그리고 1980년 원작 Rogue 게임 이스터에그를 결합하여 보여주는 Portfolio 웹 사이트 구축.
- **Core Principle**: **Simplicity First** (구조, UI/UX, Tech Stack 전반의 가벼움과 단순함 유지).

---

## 2. Target Audience & Design Concept

### 2.1 Target Audience

- **Technical Recruiter & Engineering Lead**: 색다른 테크니컬 감성에 반응하는 채용 담당자 및 리드 엔지니어.
- **Developer Community**: 기술적 완성도와 고전 레트로 게임 유머(Madness)에 흥미를 느끼는 커뮤니티 유저.

### 2.2 Tone & Manner

- **Base Layout**: 스캔이 용이한 Minimalist Layout.
- **Pinch of Nerdness**: Terminal motif, Monospace typography, Keyboard shortcuts 등 기술적 정교함을 은은하게 노출.
- **Pinch of Madness & Retro**: 1980년대 ASCII Rogue 그래픽을 활용한 이스터에그 및 디버깅 패닉 요소를 모티브로 한 인터랙션.

---

## 3. Key Functional Requirements

### F-1. Single-Page Navigation & Layout

- **Hero Section**: 강렬한 한 줄 메세지 및 핵심 Identity 표시.
- **About & Work Description**: 본인 소개 및 주요 경력 요약 (소유자 편집 전용 섹션).
- **Projects & Works**: 주요 프로젝트 카드 목록; GitHub Repository 및 Live Demo Link 연결.
- **Interests & Tech Stack**: 관심 기술, 개인 프로젝트, 취향 관련 키워드 및 태그.
- **Contact**: EmailJS 기반 실시간 이메일 전송 연락폼(이름, 이메일, 메시지) 및 Social Media Link (GitHub, LinkedIn 등).

### F-4. EmailJS-Powered Interactive Contact Form

- **Requirement**: 방문자가 이름(Name), 이메일 주소(Email), 메시지(Message)를 작성하고 전송 버튼을 클릭하면 작성자 수신 이메일(`ray.beak@proton.me`)로 즉시 이메일이 발송되어야 함.
- **EmailJS Configuration & Payload**:
  - **Service ID**: `service_7qxoyeq`
  - **Template ID**: `template_wwmx8wv`
  - **Public API Key**: `zrK2yN-1TYiiAA_pv`
  - **Payload Structure**: `from_name`, `title`, `name`, `time` (Zulu time), `message`, `from_email`.
- **Form UX & Validation**:
  - 이름, 이메일, 메시지 필수 입력 검증.
  - 전송 중 로딩 애니메이션 및 버튼 비활성화.
  - 전송 성공/실패 시 테두리 가이드 및 Toast UI 알림 메시지 출력.

### F-2. Client-Side Admin Page & LocalStorage Persistence

- **Requirement**: 작성자(Owner)가 로그인(인증)을 거쳐 전용 관리자 페이지(Admin Dashboard)에 접속하여 '자기소개(About)'를 수정하고 '작업물(Projects)'을 자유롭게 추가/수정/삭제할 수 있어야 함.
- **Admin Access & Authentication**:
  - **Access Point**: Header의 `Admin Login` 버튼 또는 Quick Command Palette (`Cmd + K` -> `admin` 입력).
  - **Authentication Flow**: 간단한 비밀번호(Passcode/Secret Key) 인증 후 관리자 세션 발급 및 관리자 대시보드 진입.
- **Key Admin Capabilities**:
  - **Bio & About Editor**: 소개 글, 직함, 주요 가치관 문구 수정 및 렌더링.
  - **Project Manager**: 신규 프로젝트 추가 (제목, 요약 설명, 기술 스택 태그, GitHub 및 Live Demo URL), 기존 프로젝트 수정 및 삭제.
- **Implementation & Storage Architecture**:
  - **LocalStorage Persistence**: 작성 및 수정된 모든 데이터(Bio, Projects 리스트)는 브라우저 `LocalStorage`에 JSON 포맷으로 실시간 저장 및 복원.
  - **Reset to Default**: 필요 시 초기 기본 데이터로 복원(Reset)하는 기능 제공.

### F-3. Subtle Nerdness, Madness & Rogue (1980) Easter Egg Accents

- **Nerdness Features**:
  - `Cmd + K` / `Ctrl + K` 기반 Quick Command Palette.
  - Terminal cursor blink 효과 및 Hover 시 Monospace 폰트 변환.
- **Madness Features**:
  - DevTools 콘솔(F12) 탐색 시 ASCII Art 및 이스터에그 모드 진입.
  - 특정 인터랙션 시 가벼운 UI Glitch effect 또는 Retro CRT monitor 효과 토글.
- **Rogue (1980) Easter Egg Features**:
  - **Trigger**: 커맨드 패브릭 입력(`rogue`), 특정 텍스트 입력 또는 특정 키 시퀀스(`HJKL` 이동 키 조합 등) 입력 시 전체 모달/전체 화면으로 ASCII Rogue 모드 진입.
  - **Game Integration**: JS/WebAssembly 기반 1980 Rogue 포트 엔진(또는 커스텀 구현된 미니 ASCII 던전 탐험기)을 렌더링.
  - **Meta Feature**: 던전 내 요소에 포트폴리오 스탯/프로젝트(예: `@` 플레이어가 던전 탐험 중 `P`(Project) 스크롤을 주우면 해당 프로젝트 팝업 표시) 연동.

---

## 4. Non-Functional Requirements & Tech Stack Recommendations

- **Category; Technical Details**
- **Frontend Framework;** Next.js (App Router) 또는 React with Vite; Tailwind CSS; TypeScript
- **Deployment & CI/CD;** Vercel 또는 GitHub Pages (Automated build & deployment)
- **Content Source;** Local MDX files 또는 Headless CMS (Contentful/Supabase)
- **Rogue Engine;** Lightweight JS Rogue / C-ported WASM Rogue Engine
- **Performance;** Lighthouse Performance 95+ 이상 유지; Zero-heavy library 사용
