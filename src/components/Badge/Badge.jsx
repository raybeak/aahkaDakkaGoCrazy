import React from 'react';
import './Badge.css';

/**
 * Badge 컴포넌트
 * ------------------------------------------
 * 기술 스택 태그, 단축키 표시(Cmd+K), 상태 강조 등을 위한 뱃지 컴포넌트
 * 
 * @param {Object} props
 * @param {'tech' | 'hotkey' | 'terminal' | 'retro'} [props.variant='tech'] - 뱃지 스타일 종류
 * @param {React.ReactNode} props.children - 뱃지 내부 텍스트/요소
 * @param {string} [props.className=""] - 추가 CSS 클래스
 */
export const Badge = ({
  variant = 'tech',
  children,
  className = '',
  ...restProps
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()} {...restProps}>
      {children}
    </span>
  );
};

export default Badge;
