# Personal Portfolio Design System Guide (`designPortfolio.md`)

> **Based on**: [prdPortfolio.md](file:///home/raybeak/.gemini/antigravity-ide/scratch/portfolio/prdPortfolio.md)  
> **Concept**: **Clean Minimalist** + **Terminal Monospace Accent (Nerdness)** + **1980 ASCII Rogue & Retro Glitch (Madness)**  
> **Target Audience**: Technical Recruiters, Engineering Leads, Developer Community

---

## 1. Overview & Tone of Voice

본 디자인 가이드는 가볍고 극도로 정제된 **Minimalist Layout**을 기반으로, 은은한 **Terminal/Developer 감성(Nerdness)**과 1980년대 **ASCII Rogue 게임 이스터에그 및 Glitch 인터랙션(Madness)**이 조화롭게 결합된 UI/UX 디자인 시스템입니다.

### Core Design Principles
1. **Simplicity & Ample Negative Space**: 불필요한 복잡 요소와 빽빽한 배치를 배제하고, 넓은 여백과 가독성 높은 타이포그래피 중심의 시원한 초간결 레이아웃 구축.
2. **Terminal Motif (Nerdness)**: 과하지 않은 은은한 커서 깜빡임 (`$ dev ~`), `Cmd + K` 커맨드 패브릭 등 핵심 개발자 감성 요소만 정제하여 적용.
3. **Retro Arcade & ASCII Rogue (Madness)**: 평소에는 숨겨져 있으며, 특정 키 입력/이스터에그 발동 시에만 깔끔하게 레이어로 노출.

---

## 2. Color System

기본 테마는 개발자 선호도가 높고 CRT/터미널 콘트라스트 연출이 용이한 **Dark Theme (Default)**를 기준으로 설계하며, 가독성을 위한 Light Theme 토글을 지원합니다.

### 2.1 Theme Colors

| Color Token | Hex Code | HSL / RGB | Key Usage Scenario |
| :--- | :--- | :--- | :--- |
| **`--bg-primary`** | `#0D1117` | `hsl(216, 28%, 7%)` | 메인 바탕색 (Dark Minimal Canvas) |
| **`--bg-surface`** | `#161B22` | `hsl(213, 21%, 11%)` | 카드, 모달, 커맨드 팔레트 배경 |
| **`--bg-elevated`** | `#21262D` | `hsl(215, 15%, 15%)` | 드롭다운, 태그, 호버 시 배경 |
| **`--border-default`** | `#30363D` | `hsl(212, 12%, 21%)` | 카드 테두리, 구분선 |
| **`--border-active`** | `#58A6FF` | `hsl(212, 100%, 67%)` | Focus, Highlight 테두리 |

### 2.2 Brand & Accent Palette

| Palette Name | Hex Code | Key Concept | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Accent (Phosphor Green)** | `#00FF66` | Classic Terminal Phosphor | Hero 포인트, 성공 상태, Terminal Cursor, Active Status |
| **Secondary Accent (Cyber Amber)** | `#FFB800` | Vintage CRT Amber / Warning | 경고, 이스터에그 힌트, Star/Badge 강조 |
| **Madness Accent (Panic Crimson)** | `#FF3366` | Retro Glitch & Danger | Error, Glitch effect, Rogue Boss / Hard Attack |
| **Rogue Magic Accent (Neon Violet)** | `#A855F7` | 1980 Rogue Portal / Item | Rogue 이스터에그 아이템 (`P` Scroll), 마법 팝업 |
| **Cyan Ray (Tech Cyan)** | `#00F0FF` | Cyber Glow / Command Palette | `Cmd + K` 핫키 뱃지, Live Demo 링크 포인트 |

### 2.3 Neutral Text Palette

- **`--text-primary`**: `#F0F6FC` (High-contrast Title & Main Content)
- **`--text-secondary`**: `#8B949E` (Subtitles, Descriptions, Metadata)
- **`--text-muted`**: `#484F58` (Placeholder, Disabled, Footnote)
- **`--text-code`**: `#00FF66` (Terminal text & Monospace highlighted elements)

---

## 3. Typography System

### 3.1 Font Families

```css
/* Body & UI Text */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Terminal & Nerdness Monospace Text */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace;

/* 1980 Rogue Easter Egg & Retro Mode Text */
--font-retro: 'VT323', 'Press Start 2P', monospace;
```

### 3.2 Typography Scale

| Token Name | Size (px/rem) | Line Height | Weight | Application |
| :--- | :--- | :--- | :--- | :--- |
| **`--text-4xl`** | `36px (2.25rem)` | `1.2` | `800 Bold` | Hero Main Tagline |
| **`--text-3xl`** | `28px (1.75rem)` | `1.3` | `700 Bold` | Section Title (About, Projects, Contact) |
| **`--text-2xl`** | `22px (1.375rem)`| `1.35` | `600 SemiBold` | Project Card Title |
| **`--text-xl`** | `18px (1.125rem)`| `1.4` | `600 SemiBold` | Sub-section Header, Modal Title |
| **`--text-base`** | `16px (1.0rem)` | `1.6` | `400 Regular` | Main Body Text, Description |
| **`--text-sm`** | `14px (0.875rem)`| `1.5` | `400 / 500` | Button Label, Tag, Metadata |
| **`--text-xs`** | `12px (0.75rem)` | `1.4` | `500 Medium` | Hotkey Badge (`Cmd+K`), Footnote |

---

## 4. Spacing, Grid & Layout

### 4.1 Spacing Scale (8pt System)

```css
--space-1: 4px;   /* 0.25rem - Micro gap (Icon + Text gap) */
--space-2: 8px;   /* 0.5rem  - Badge padding, Small element gap */
--space-3: 12px;  /* 0.75rem - Compact button padding */
--space-4: 16px;  /* 1.0rem  - Standard input/button padding */
--space-6: 24px;  /* 1.5rem  - Card inner padding */
--space-8: 32px;  /* 2.0rem  - Section element gap */
--space-12: 48px; /* 3.0rem  - Major section padding */
--space-16: 64px; /* 4.0rem  - Hero section spacing */
```

### 4.2 Layout Grid & Container Widths

- **Max Container Width**: `1200px` (Centering layout with `px-4 md:px-8`)
- **Reading / About Width**: `768px` (Optimal line length for reading markdown content)
- **Breakpoints**:
  - `Mobile`: `< 640px` (Single column layout)
  - `Tablet`: `640px ~ 1024px` (2-column project grid)
  - `Desktop`: `> 1024px` (3-column project grid, expanded navbar)

---

## 5. UI Component Specifications

### 5.1 Button Components

#### Button Sizes

| Size | Height | Horizontal Padding | Font Size | Border Radius | Best Used For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Small (SM)** | `32px` | `12px` | `13px (--text-xs)` | `6px` | Tag filtering, Compact actions |
| **Medium (MD)** | `40px` | `16px` | `14px (--text-sm)` | `8px` | Standard UI actions, Links |
| **Large (LG)** | `48px` | `24px` | `16px (--text-base)`| `10px` | Hero Call-To-Action (Contact, Resume) |

#### Button Variants & States

1. **Primary Button (Terminal Glow)**
   - **Background**: `#00FF66`
   - **Text**: `#0D1117` (Font-weight: 700)
   - **Hover State**: Background `#33FF85`, `box-shadow: 0 0 16px rgba(0, 255, 102, 0.4)`
   - **Active State**: Scale `0.98`
2. **Secondary Button (Outline Glass)**
   - **Background**: `rgba(22, 27, 34, 0.6)` + `backdrop-filter: blur(8px)`
   - **Border**: `1px solid #30363D`
   - **Text**: `#F0F6FC`
   - **Hover State**: Border `#58A6FF`, Text `#58A6FF`, Background `rgba(88, 166, 255, 0.1)`
3. **Ghost Terminal Button (`$ cmd`)**
   - **Background**: Transparent
   - **Text**: `#8B949E` (Monospace: `font-family: var(--font-mono)`)
   - **Hover State**: Text `#00FF66`, Icon/Prefix `$ ` Animated blink
4. **Retro Pixel Button (Rogue Mode)**
   - **Background**: `#000000`
   - **Border**: `2px solid #00FF66` (Double pixel border look)
   - **Text**: `#00FF66` (`font-family: var(--font-retro)`)
   - **Hover State**: Background `#00FF66`, Text `#000000`

---

### 5.2 Project Cards

- **Background**: `var(--bg-surface)` (`#161B22`)
- **Border**: `1px solid var(--border-default)` (`#30363D`)
- **Border Radius**: `12px`
- **Padding**: `24px`
- **Hover Interaction**:
  - `transform: translateY(-4px)`
  - `border-color: rgba(0, 255, 102, 0.5)`
  - `box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 255, 102, 0.15)`
- **Header**: Project Title + External Link / GitHub Icon (Monospace tags at bottom)

---

### 5.3 Quick Command Palette (`Cmd + K`)

- **Modal Backdrop**: `rgba(13, 17, 23, 0.8)` + `backdrop-filter: blur(12px)`
- **Modal Box**: Width `640px`, Background `#161B22`, Border `1px solid #30363D`, Radius `16px`
- **Search Input**: Monospace font, prefix `> `, caret color `#00FF66`
- **Key Badge**: `border: 1px solid #30363D`, `bg: #21262D`, `text: #8B949E`, `font-size: 11px`

---

### 5.4 1980 ASCII Rogue Easter Egg Overlay

- **Viewport Mode**: Fullscreen Overlay (`fixed inset-0 z-50 bg-black`)
- **CRT Effect**: Scanline overlay (`repeating-linear-gradient` with subtle opacity `0.15`)
- **ASCII Viewport Border**: Custom ASCII border string (`+---+`, `|   |`) rendered in Monospace font
- **Color Mode**: Classic Green CRT (`#00FF66` on `#000000`) or Amber CRT (`#FFB800` on `#000000`) toggleable.
- **Rogue HUD**: Bottom status line (`Level: 1 | HP: 12/12 | Str: 16 | Gold: 0`) in `var(--font-retro)`.

---

## 6. Micro-Animations & Madness Effects

### 6.1 Terminal Cursor Blink Keyframe
```css
@keyframes terminal-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 18px;
  background-color: var(--color-primary-accent, #00FF66);
  animation: terminal-blink 1s infinite;
}
```

### 6.2 Glitch Effect (Madness Trigger)
```css
@keyframes glitch-anim {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.glitch-active {
  animation: glitch-anim 0.2s ease-in-out infinite;
  text-shadow: 2px 0 #FF3366, -2px 0 #00F0FF;
}
```

### 6.3 CRT Scanline CSS Overlay
```css
.crt-overlay::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
              linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  z-index: 10;
  background-size: 100% 3px, 6px 100%;
  pointer-events: none;
}
```

---

## 7. Production Ready CSS Variables (`tokens.css`)

```css
:root {
  /* Color Palette - Dark Minimal Theme (Default) */
  --bg-primary: #0D1117;
  --bg-surface: #161B22;
  --bg-elevated: #21262D;

  --border-default: #30363D;
  --border-active: #58A6FF;

  --accent-primary: #00FF66;    /* Terminal Phosphor Green */
  --accent-secondary: #FFB800;  /* Retro Amber */
  --accent-panic: #FF3366;      /* Madness Crimson */
  --accent-cyan: #00F0FF;       /* Tech Cyan */
  --accent-violet: #A855F7;     /* Rogue Item Glow */

  --text-primary: #F0F6FC;
  --text-secondary: #8B949E;
  --text-muted: #484F58;
  --text-code: #00FF66;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace;
  --font-retro: 'VT323', 'Press Start 2P', monospace;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Transitions & Shadows */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  --shadow-glow: 0 0 20px rgba(0, 255, 102, 0.25);
  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.4);
}
```

---

## 8. Clarifying Questions & Next Steps

현재 작성된 가이드는 [prdPortfolio.md](file:///home/raybeak/.gemini/antigravity-ide/scratch/portfolio/prdPortfolio.md)의 요구사항을 반영하여 제작되었습니다. 추가로 세부 조율이 필요하신 경우 언제든 말씀해 주세요:

1. **메인 테마 톤선택**:
   - **A안 (권장)**: Phosphor Green (`#00FF66`) 메인 + Dark Charcoal (`#0D1117`) 바탕의 클래식 개발자 터미널 느낌
   - **B안**: Tech Emerald (`#10B981`) + Modern Slate (`#0F172A`)의 정갈한 파이낸스/사스(SaaS) 스타일 포트폴리오
   - **C안**: Retro Amber (`#FFB800`) 메인 + Black (`#050505`) 바탕의 비vintage 80s 가스식 디스플레이 느낌
2. **이스터에그 발동 감도**:
   - Rogue 이스터에그 진입 시 풀스크린 모달 방식 vs 별도의 페이지 전환 방식 중 어느 쪽을 더 선호하시나요?
