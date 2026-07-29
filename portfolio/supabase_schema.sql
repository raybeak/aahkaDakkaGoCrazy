-- ============================================================
-- Supabase SQL Editor용 테이블 생성 및 초기 데이터 삽입 스크립트
-- Supabase Dashboard > SQL Editor 에 복사하여 실행하세요.
-- ============================================================

-- 1. 자기소개(about) 테이블 생성
CREATE TABLE IF NOT EXISTS public.about (
  id INT PRIMARY KEY DEFAULT 1,
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 초기 기본 자기소개 행 삽입 (이미 존재하는 경우 무시)
INSERT INTO public.about (id, content) 
VALUES (
  1, 
  '시스템 프로그래밍과 웹 아키텍처의 경계에서 빠르고 가벼운 웹 경험을 만드는 엔지니어입니다.
불필요한 라이브러리 의존성을 최소화하고, 단결하면서도 강렬한 사용자 경험(UX)을 추구합니다.

• Major Focus: WebAssembly, High-Performance Front-end, Systems Architecture
• Core Values: Simplicity First, Code Hygiene, High Density Information'
)
ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- 2. 작업물(projects) 테이블 생성
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  link TEXT DEFAULT '#',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 초기 샘플 프로젝트 삽입
INSERT INTO public.projects (id, title, description, tags, link)
VALUES 
  ('proj-1', 'WASM Rogue Engine (1980)', '1980년 원작 Rogue 게임을 WebAssembly 및 Canvas 기술로 브라우저 상에 포팅한 미니 ASCII 던전 엔진입니다.', ARRAY['Rust', 'WASM', 'Canvas API'], 'https://github.com'),
  ('proj-2', 'Minimal Portfolio UI Kit', 'Simplicity First 원칙 기반의 8pt 여백 시스템과 터미널 커서, 핫키 검색창이 적용된 초간결 포트폴리오 템플릿입니다.', ARRAY['TypeScript', 'Next.js', 'CSS Tokens'], 'https://github.com'),
  ('proj-3', 'High-Performance State Engine', 'Zero-dependency 모듈 구조로 초당 60fps 상태 렌더링을 보장하는 초경량 클라이언트 바인딩 라이브러리입니다.', ARRAY['JavaScript', 'Web Components'], 'https://github.com')
ON CONFLICT (id) DO NOTHING;

-- 3. Row Level Security (RLS) 비활성화 또는 누구나 접근 가능하도록 정책 설정
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access for about" ON public.about;
CREATE POLICY "Allow public access for about" ON public.about FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access for projects" ON public.projects;
CREATE POLICY "Allow public access for projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
