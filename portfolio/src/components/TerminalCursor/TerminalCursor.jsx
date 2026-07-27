import React from 'react';
import './TerminalCursor.css';

/**
 * TerminalCursor 컴포넌트
 * ------------------------------------------
 * 개발자 커스텀 터미널 프롬프트($ dev ~)와 은은하게 깜빡이는 블록 커서를 제공합니다.
 * 
 * @param {Object} props
 * @param {string} [props.path="dev ~"] - 터미널 경로 표시 텍스트
 * @param {string} [props.command=""] - 프롬프트 옆에 입력될 명령어 텍스트
 * @param {string} [props.className=""] - 추가 커스텀 CSS 클래스명
 */
export const TerminalCursor = ({
  path = "dev ~",
  command = "",
  className = ""
}) => {
  return (
    <div className={`terminal-prompt-container ${className}`}>
      {/* 터미널 달러 기호 프롬프트 */}
      <span className="terminal-symbol">$</span>
      
      {/* 터미널 디렉토리 경로 */}
      <span className="terminal-path">{path}</span>
      
      {/* 명령어가 있을 경우 출력 */}
      {command && <span className="terminal-command">{command}</span>}
      
      {/* 1초 주기로 깜빡이는 터미널 블록 커서 */}
      <span className="terminal-cursor-block" aria-hidden="true" />
    </div>
  );
};

export default TerminalCursor;
