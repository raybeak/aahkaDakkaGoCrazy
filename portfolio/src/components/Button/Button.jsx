import React from 'react';
import './Button.css';

/**
 * Button 컴포넌트
 * ------------------------------------------
 * 개발자 포트폴리오 테마에 맞춘 범용 버튼 컴포넌트
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'retro'} [props.variant='primary'] - 버튼 디자인 변형
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - 버튼 크기
 * @param {React.ReactNode} props.children - 버튼 내부에 들어갈 요소
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {function} [props.onClick] - 클릭 이벤트 핸들러
 * @param {string} [props.className=""] - 추가 CSS 클래스
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  onClick,
  className = '',
  ...restProps
}) => {
  /* 버튼 클래스 조합 */
  const buttonClass = `btn btn-${variant} btn-${size} ${className}`.trim();

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {/* Ghost 스타일일 경우 터미널 프롬프트 기호 자동 삽입 */}
      {variant === 'ghost' && <span className="btn-prompt-icon">$ </span>}
      {children}
    </button>
  );
};

export default Button;
