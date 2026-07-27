import React from 'react';
import Badge from '../Badge/Badge.jsx';
import './Header.css';

/**
 * Header 컴포넌트
 * ------------------------------------------
 * 상단 네비게이션 헤더 (로고, 네비게이션 링크, Cmd+K 빠른 탐색 버튼)
 * 
 * @param {Object} props
 * @param {function} props.onOpenCmdPalette - Cmd+K 모달 열기 핸들러
 */
export const Header = ({ onOpenCmdPalette }) => {
  return (
    <header className="site-header">
      <div className="site-header-container">
        {/* 로고 영역 */}
        <a href="#" className="site-logo">
          <span className="site-logo-symbol">&gt;_</span>
          <span>developer.portfolio</span>
        </a>

        {/* 메인 네비게이션 & Cmd+K 트리거 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <nav>
            <ul className="site-nav-links">
              <li><a href="#about" className="site-nav-link">About</a></li>
              <li><a href="#projects" className="site-nav-link">Projects</a></li>
              <li><a href="#interests" className="site-nav-link">Interests</a></li>
              <li><a href="#contact" className="site-nav-link">Contact</a></li>
            </ul>
          </nav>

          {/* Cmd + K 커맨드 팔레트 실행 버튼 */}
          <button
            className="cmd-trigger-btn"
            onClick={onOpenCmdPalette}
            title="Quick Command Palette"
          >
            <span>Search</span>
            <Badge variant="hotkey">⌘K</Badge>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
