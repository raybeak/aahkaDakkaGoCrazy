import React, { useState } from 'react';
import Button from '../Button/Button.jsx';
import Badge from '../Badge/Badge.jsx';
import './AdminDashboard.css';

/**
 * AdminDashboard 컴포넌트
 * ------------------------------------------
 * 자기소개(About) 문구 편집 및 작업물(Projects) 신규 추가/수정/삭제를 수행하는 대시보드
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - 대시보드 표시 여부
 * @param {function} props.onClose - 대시보드 닫기/로그아웃 콜백
 * @param {string} props.aboutText - 현재 자기소개 문구
 * @param {Array} props.projects - 현재 프로젝트 목록
 * @param {function} props.onSaveAbout - 자기소개 저장 콜백
 * @param {function} props.onAddProject - 프로젝트 추가 콜백
 * @param {function} props.onDeleteProject - 프로젝트 삭제 콜백
 * @param {function} props.onResetData - 초기 기본 데이터 복원 콜백
 */
export const AdminDashboard = ({
  isOpen,
  onClose,
  aboutText,
  projects = [],
  onSaveAbout,
  onAddProject,
  onDeleteProject,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState('about'); // 'about' 또는 'projects'
  const [editingAbout, setEditingAbout] = useState(aboutText || '');
  
  // 프로젝트 추가 폼 상태
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newLink, setNewLink] = useState('');

  if (!isOpen) return null;

  /* 자기소개 저장 제출 */
  const handleAboutSubmit = (e) => {
    e.preventDefault();
    onSaveAbout(editingAbout);
  };

  /* 신규 프로젝트 추가 제출 */
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const tagsArray = newTags.split(',').map(t => t.trim()).filter(Boolean);
    onAddProject({
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      tags: tagsArray.length > 0 ? tagsArray : ['JavaScript'],
      link: newLink || '#'
    });

    // 폼 초기화
    setNewTitle('');
    setNewDesc('');
    setNewTags('');
    setNewLink('');
  };

  return (
    <div className="admin-dashboard-backdrop">
      <div className="admin-dashboard-box">
        
        {/* 대시보드 헤더 */}
        <div className="admin-dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>⚙️ Admin Dashboard</span>
            <Badge variant="terminal">Session Active</Badge>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm" onClick={onResetData}>
              기본 데이터 복원
            </Button>

            <Button variant="retro" size="sm" onClick={onClose}>
              LOGOUT [ESC]
            </Button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="admin-dashboard-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            ✏️ 자기소개 (About) 수정
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            📂 작업물 (Projects) 관리 ({projects.length})
          </button>
        </div>

        {/* 바디 컨텐츠 */}
        <div className="admin-dashboard-body">
          
          {/* 1. 자기소개 편집 탭 */}
          {activeTab === 'about' && (
            <form onSubmit={handleAboutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-input-group">
                <label className="admin-label">자기소개 및 Work Description 내용</label>
                <textarea
                  className="admin-input"
                  style={{ minHeight: '180px', resize: 'vertical' }}
                  value={editingAbout}
                  onChange={(e) => setEditingAbout(e.target.value)}
                  placeholder="포트폴리오에 보여질 소개 글을 작성하세요..."
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" size="md" type="submit">
                  자기소개 저장 (LocalStorage 반영)
                </Button>
              </div>
            </form>
          )}

          {/* 2. 작업물 추가 및 리스트 관리 탭 */}
          {activeTab === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* 신규 프로젝트 추가 폼 */}
              <form onSubmit={handleProjectSubmit} className="admin-form-card">
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                  + 신규 작업물(Project) 추가
                </h3>

                <div className="admin-input-group">
                  <label className="admin-label">프로젝트 이름 *</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="예: WASM Rogue Engine"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">핵심 설명 *</label>
                  <textarea
                    className="admin-input"
                    style={{ minHeight: '70px' }}
                    placeholder="프로젝트의 주요 기능과 성과를 작성하세요..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-input-group">
                    <label className="admin-label">기술 스택 (쉼표 구분)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="React, TypeScript, WASM"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label className="admin-label">연결 URL (GitHub / Demo)</label>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="https://github.com/username/project"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <Button variant="primary" size="md" type="submit">
                    프로젝트 추가하기
                  </Button>
                </div>
              </form>

              {/* 기존 프로젝트 목록 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>등록된 프로젝트 목록</h3>

                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="admin-project-item">
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{proj.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {proj.description}
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                        {proj.tags && proj.tags.map((t, i) => (
                          <Badge key={i} variant="tech">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: 'var(--accent-panic)' }}
                      onClick={() => onDeleteProject(proj.id || idx)}
                    >
                      🗑️ 삭제
                    </Button>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
