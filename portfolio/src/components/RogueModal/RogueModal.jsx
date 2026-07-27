import React from 'react';
import Button from '../Button/Button.jsx';
import './RogueModal.css';

/**
 * RogueModal 컴포넌트
 * ------------------------------------------
 * 1980년대 원작 ASCII Rogue 던전 탐험 이스터에그 모드 풀스크린 모달
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - 이스터에그 모드 실행 상태
 * @param {function} props.onClose - 모달 종료 핸들러
 */
export const RogueModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  /* 더미 ASCII 던전 그래픽 데이터 (Rogue 1980 렌더링 예시) */
  const asciiDungeonMap = `
+-------------------------------------------------------------+
|                                                             |
|   @ .................. [P] (Portfolio Project Scroll)        |
|     |                                                       |
|     +-------+                                               |
|             |                                               |
|           [ D ] Dungeon Entrance                            |
|             |                                               |
|             +------------ K (Kobold)                        |
|                                                             |
+-------------------------------------------------------------+
  `;

  return (
    <div className="rogue-modal-fullscreen rogue-crt-overlay">
      {/* 레트로 게임 상단 바 */}
      <div className="rogue-header">
        <span>ROGUE (1980) EASTER EGG MODE</span>
        <Button variant="retro" size="sm" onClick={onClose}>
          EXIT [ESC]
        </Button>
      </div>

      {/* ASCII 던전 화면 */}
      <div className="rogue-viewport">
        <pre className="rogue-ascii-screen">{asciiDungeonMap}</pre>
      </div>

      {/* 하단 플레이어 스탯바 */}
      <div className="rogue-status-bar">
        <span>Level: 1</span>
        <span>HP: 12/12</span>
        <span>Str: 16</span>
        <span>Gold: 100</span>
        <span>Armor: Ring Mail</span>
      </div>
    </div>
  );
};

export default RogueModal;
