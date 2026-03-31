import type React from "react";
import type { Project } from "../data/projects";
import "../style/project-card.css";

type Props = {
    project: Project;
    onOpen?: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: Props) {
    const handleKey = (e: React.KeyboardEvent) => {
      if (!onOpen) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(project);
      }
    };

    return (
    <article
      className={`project-card ${onOpen ? "clickable" : ""}`}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen ? () => onOpen(project) : undefined}
      onKeyDown={handleKey}
    >
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-tagline">{project.tagline}</p>

      <div className="project-tech-list">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="project-links">
        {project.links.repo && (
          <a onClick={(e) => e.stopPropagation()} href={project.links.repo} target="_blank" rel="noreferrer">
            Repo
          </a>
        )}
        {project.links.live && (
          <a onClick={(e) => e.stopPropagation()} href={project.links.live} target="_blank" rel="noreferrer">
            Live
          </a>
        )}
        {project.links.demo && (
          project.links.demo.endsWith(".mp4") ? (
            <a
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (onOpen) onOpen(project);
                else window.open(project.links.demo, "_blank", "noopener,noreferrer");
              }}
              href={project.links.demo}
            >
              Demo
            </a>
          ) : (
            <a onClick={(e) => e.stopPropagation()} href={project.links.demo} target="_blank" rel="noreferrer">
              Demo
            </a>
          )
        )}
        {onOpen && (
          <button
            className="project-details-btn"
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
          >
            Details
          </button>
        )}
      </div>
    </article>
  );

}