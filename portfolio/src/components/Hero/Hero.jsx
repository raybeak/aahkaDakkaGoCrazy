import React from 'react';
import TerminalCursor from '../TerminalCursor/TerminalCursor.jsx';
import Button from '../Button/Button.jsx';
import './Hero.css';

/**
 * Hero 컴포넌트
 * ------------------------------------------
 * 웹사이트 메인 히어로 섹션 (강렬한 타이틀, 은은한 터미널 프롬프트 커서, 핵심 CTA)
 * 
 * @param {Object} props
 * @param {string} [props.title] - 메인 타이틀
 * @param {string} [props.subtitle] - 서브 설명 문구
 * @param {function} [props.onOpenRogue] - 1980 Rogue 이스터에그 실행 콜백
 */
export const Hero = ({
  title = "Crafting Minimalist & Performant Web Systems",
  subtitle = "Clean UI와 절제된 Terminal 감성, 그리고 레트로 이스터에그를 즐기는 개발자입니다.",
  onOpenRogue
}) => {
  return (
    <section className="hero-section">
      {/* 터미널 프롬프트 커서 */}
      <TerminalCursor path="whoami" command="cat intro.md" />

      {/* 메인 헤드라인 */}
      <h1 className="hero-title">
        {title}
      </h1>

      {/* 서브 설명 문구 */}
      <p className="hero-subtitle">
        {subtitle}
      </p>

      {/* CTA 버튼 조합 */}
      <div className="hero-cta-group">
        <Button variant="primary" size="lg" onClick={() => window.location.href = '#projects'}>
          View Projects
        </Button>
        <Button variant="secondary" size="lg" onClick={() => window.location.href = '#contact'}>
          Get in Touch
        </Button>
        {onOpenRogue && (
          <Button variant="retro" size="md" onClick={onOpenRogue} title="Launch 1980 Rogue Easter Egg">
            🎮 ROGUE 1980
          </Button>
        )}
      </div>
    </section>
  );
};

export default Hero;
