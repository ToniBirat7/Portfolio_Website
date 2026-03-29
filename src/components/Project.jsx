import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useInView } from "../hooks/useInView";
import { projects, executionLogs } from "../data/projects";
import "./Project.css";

const TerminalModal = ({ project, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  useEffect(() => {
    const projectLogs = executionLogs[project.id] || [];
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < projectLogs.length) {
        setLogs(prev => [...prev, projectLogs[currentLog]]);
        currentLog++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [project.id]);

  return (
    <div
      className={`terminal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Build logs for ${project.title}`}
    >
      <div className="terminal-window" onClick={e => e.stopPropagation()}>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">birat@terminal:~/{project.id}</span>
          <button className="terminal-close" onClick={handleClose} aria-label="Close build logs">&times;</button>
        </div>
        <div className="terminal-body">
          {logs.map((log, i) => (
            <div key={i} className="log-line">{log}</div>
          ))}
          {isTyping && <div className="command-line">_</div>}
          {!isTyping && (
            <div className="terminal-footer">
              <span className="prompt">birat@terminal:~$</span>
              <span className="cursor-blink">|</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TerminalModal.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

const Project = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section className="project-gallery" id="project" aria-labelledby="project-heading" ref={ref}>
      <h2 id="project-heading">Project Gallery</h2>
      <div className="project-cards">
        {projects.map((project, index) => (
          <article
            className={`project-card animate-in ${inView ? 'in-view' : ''}`}
            key={project.id}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="project-header">
              <div className="project-icon">
                <i className={project.icon}></i>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github-link"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-actions">
                <button
                  className="preview-btn"
                  onClick={() => setActiveProject(project)}
                >
                  <i className="fas fa-terminal"></i> Build Logs
                </button>
              </div>
              <div className="tech-stack">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      {activeProject && (
        <TerminalModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

export default Project;
