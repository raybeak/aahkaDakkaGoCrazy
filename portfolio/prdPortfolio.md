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
- **Contact**: Email 및 Social Media Link (GitHub, LinkedIn 등).

### F-2. Owner-Only Editable Section

- **Requirement**: 작성자(Owner) 본인만 '소개 글' 및 'Work Description'을 쉽고 안전하게 수정 가능해야 함.
- **Implementation Architecture**:
  - **Static MDX / Markdown (Recommended)**: Git Repository 내의 `.mdx` 파일 수정 후 Push 시 자동 배포 반영 (DB/Auth 비활성화).
  - **Lightweight Admin / CMS**: Supabase / Firebase Auth 기반으로 본인 계정 로그인 시 웹페이지 상에서 텍스트 수정 및 저장.

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
