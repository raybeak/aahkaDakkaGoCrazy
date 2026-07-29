import React, { useState, useEffect } from 'react';
import Badge from '../Badge/Badge.jsx';
import './CommandPalette.css';

/**
 * CommandPalette 컴포넌트
 * ------------------------------------------
 * Cmd + K 키 조합으로 모달을 열어 빠르게 탐색하거나 이스터에그(rogue)를 실행할 수 있는 커맨드 센터
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 여부
 * @param {function} props.onClose - 모달 닫기 이벤트 핸들러
 * @param {function} [props.onSelectCommand] - 명령어 선택 콜백
 */
export const CommandPalette = ({
  isOpen,
  onClose,
  onSelectCommand
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // ESC 키 누를 경우 모달 닫기 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* 기본 커맨드 항목들 */
  const commands = [
    { id: 'projects', label: '프로젝트 목록 보기', shortcut: 'G P' },
    { id: 'about', label: '자기소개 (About Me) 이동', shortcut: 'G A' },
    { id: 'rogue', label: '🎮 1980 ASCII Rogue 이스터에그 모드 실행', shortcut: 'ROGUE' },
    { id: 'contact', label: '이메일 문의 보내기', shortcut: 'G C' },
  ];

  /* 검색어로 항목 필터링 */
  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.shortcut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (cmd) => {
    if (onSelectCommand) {
      onSelectCommand(cmd.id);
    }
    onClose();
  };

  return (
    <div className="cmd-palette-backdrop" onClick={onClose}>
      <div
        className="cmd-palette-container"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        {/* 인풋 영역 */}
        <div className="cmd-palette-input-wrapper">
          <span className="cmd-palette-prompt">&gt;</span>
          <input
            type="text"
            className="cmd-palette-input"
            placeholder="명령어를 입력하거나 검색하세요... (예: rogue)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <Badge variant="hotkey">ESC 닫기</Badge>
        </div>

        {/* 명령어 목록 */}
        <ul className="cmd-palette-list">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <li
                key={cmd.id}
                className="cmd-palette-item"
                onClick={() => handleSelect(cmd)}
              >
                <span>{cmd.label}</span>
                <Badge variant="tech">{cmd.shortcut}</Badge>
              </li>
            ))
          ) : (
            <li className="cmd-palette-item" style={{ cursor: 'default' }}>
              검색 결과가 없습니다.
            </li>
          )}
        </ul>

        {/* 푸터 핫키 안내 */}
        <div className="cmd-palette-footer">
          <span>Navigate with Arrow keys</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
