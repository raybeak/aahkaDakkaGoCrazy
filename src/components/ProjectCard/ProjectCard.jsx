import React from 'react';
import Badge from '../Badge/Badge.jsx';
import './ProjectCard.css';

/**
 * ProjectCard 컴포넌트
 * ------------------------------------------
 * 주요 개발 프로젝트 정보(제목, 설명, 기술 스택 태그, 데모/GitHub 링크)를 보여주는 카드 컴포넌트
 * 
 * @param {Object} props
 * @param {string} props.title - 프로젝트 이름
 * @param {string} props.description - 프로젝트 핵심 요약 설명
 * @param {string[]} [props.tags=[]] - 프로젝트에 사용된 기술 스택 태그 목록
 * @param {string} [props.link="#"] - Live Demo 또는 GitHub repository URL
 * @param {string} [props.className=""] - 추가 커스텀 CSS 클래스
 */
export const ProjectCard = ({
  title,
  description,
  tags = [],
  link = "#",
  className = ""
}) => {
  return (
    <div className={`project-card ${className}`.trim()}>
      <div>
        {/* 헤더: 프로젝트 제목 및 외부 링크 아이콘 */}
        <div className="project-card-header">
          <h3 className="project-card-title">{title}</h3>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link-icon"
            aria-label={`${title} 프로젝트 링크 이동`}
          >
            ↗
          </a>
        </div>

        {/* 본문 요약 설명 */}
        <p className="project-card-description">{description}</p>
      </div>

      {/* 하단 기술 스택 태그 리스트 */}
      {tags.length > 0 && (
        <div className="project-card-tags">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="tech">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
