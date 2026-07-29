import React, { useState } from 'react';
import Button from '../Button/Button.jsx';
import Badge from '../Badge/Badge.jsx';
import './AdminLoginModal.css';

/**
 * AdminLoginModal 컴포넌트
 * ------------------------------------------
 * 관리자 세션 진입을 위한 비밀번호 인증 모달 (기본 Passcode: admin123)
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - 로그인 모달 표시 여부
 * @param {function} props.onClose - 모달 닫기 콜백
 * @param {function} props.onSuccess - 로그인 성공 시 인증 완료 콜백
 */
export const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  /* 로그인 제출 처리 */
  const handleSubmit = (e) => {
    e.preventDefault();
    // 기본 비밀번호 검증 (admin123)
    if (passcode.trim() === 'admin123') {
      setErrorMsg('');
      setPasscode('');
      onSuccess();
    } else {
      setErrorMsg('비밀번호가 올바르지 않습니다. (기본: admin123)');
    }
  };

  return (
    <div className="admin-login-backdrop" onClick={onClose}>
      <div className="admin-login-card" onClick={(e) => e.stopPropagation()}>
        <div className="admin-login-header">
          <h2 className="admin-login-title">
            🔒 Admin Authentication
          </h2>
          <Badge variant="hotkey">Passcode Required</Badge>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="admin-input-group">
            <label className="admin-label">관리자 비밀번호 입력</label>
            <input
              type="password"
              className="admin-input"
              placeholder="비밀번호를 입력하세요 (admin123)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              autoFocus
            />
            {errorMsg && <span className="admin-error-msg">{errorMsg}</span>}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Button variant="secondary" size="md" type="button" onClick={onClose}>
              취소
            </Button>
            <Button variant="primary" size="md" type="submit">
              로그인 접속
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
