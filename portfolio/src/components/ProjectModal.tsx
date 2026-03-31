import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    // Try to ensure the video plays when a .mp4 demo is opened and pause/reset when closed.
    const v = videoRef.current;
    if (!project || !project.links.demo || !project.links.demo.endsWith(".mp4")) return;
    if (!v) return;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch (err) {
        // Play may fail due to browser policy; we silently ignore here.
      }
    };

    tryPlay();

    return () => {
      try { v.pause(); v.currentTime = 0; } catch (e) { /* ignore */ }
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">Close</button>
        <h2>{project.title}</h2>
        <p>{project.tagline}</p>

        {project.links.demo && project.links.demo.endsWith(".mp4") && (
          <div style={{ marginTop: 12 }}>
            <video
              ref={videoRef}
              src={project.links.demo}
              controls
              autoPlay
              muted
              playsInline
              style={{ maxWidth: "100%" }}
            />
            <div style={{ marginTop: 6 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const v = videoRef.current as any;
                  if (!v) return;
                  if (v.requestFullscreen) v.requestFullscreen();
                  else if (v.webkitEnterFullScreen) v.webkitEnterFullScreen();
                  else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
                }}
                aria-label="Enter fullscreen"
              >
                Fullscreen
              </button>
            </div>
          </div>
        )}

        <h3>Highlights</h3>
        <ul>
          {project.highlights.map((h, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: h }} />
          ))}
        </ul>

        <div style={{ marginTop: 12 }}>
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noreferrer">Repo</a>
          )}
          {project.links.live && (
            <a style={{ marginLeft: 12 }} href={project.links.live} target="_blank" rel="noreferrer">Live</a>
          )}
          {project.links.demo && (
            <a style={{ marginLeft: 12 }} href={project.links.demo} target="_blank" rel="noreferrer">Demo</a>
          )}
        </div>
      </div>
    </div>
  );
}
