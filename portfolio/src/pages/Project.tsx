import { useState } from "react";
import { projects, type Project as ProjectType } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";

export function Project() {
  const [selected, setSelected] = useState<ProjectType | null>(null);

  return (
    <div className="page-container">
      <h1>Projects</h1>

      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={(proj) => setSelected(proj)} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
