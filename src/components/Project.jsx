// Project.js
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Project.css";

const projects = [
  {
    title: "MatchVision – End-to-End EPL Prediction Platform",
    description:
      "Containerized ML pipeline using Airflow, MariaDB, Redis, and DVC to automate data ingestion, cleaning, validation, and model training for EPL match prediction. Tracked experiments with MLflow and served real-time predictions via DRF, integrated into a Django web app displaying live stats, fixtures, and betting probabilities.",
    githubUrl: "https://github.com/ToniBirat7/English_Premier_League_End_To_End_Project",
    techStack: ["Airflow", "Redis", "PostgreSQL", "Docker", "DRF", "MLFlow", "Node.js", "React.js"],
    icon: "fas fa-futbol",
  },
  {
    title: "AI Powered Document RAG System",
    description:
      "Modular backend enabling intelligent document-based conversations using a custom RAG pipeline. Document Ingestion API to upload and process PDF/TXT files, extract text, apply chunking strategies, and generate embeddings stored in Weaviate. Conversational RAG API with custom retrieval logic, integrated Redis for multi-turn chat memory.",
    githubUrl: "https://github.com/ToniBirat7/RAG_Project_End_To_End",
    techStack: ["FastAPI", "Weaviate", "LangChain", "Redis", "Next.js", "PostgreSQL"],
    icon: "fas fa-brain",
  },
  {
    title: "Automated Nuclei Segmentation in Microscopy Images",
    description:
      "A U-Net-based deep learning model for nuclei detection in microscopy images using the 2018 Data Science Bowl dataset, achieving an IoU score of 0.88. Automated segmentation reduces manual annotation and enhances diagnostic efficiency in resource-constrained medical environments.",
    githubUrl: "https://github.com/ToniBirat7/Nuclei_Segmentation_U-Net_VGG_x_RFC",
    techStack: ["CNN", "TensorFlow", "U-Net", "OpenCV", "Deep Learning"],
    icon: "fas fa-microscope",
  },
  {
    title: "Screen Recording & Video Sharing Platform",
    description:
      "Built with Next.js and Bunny.net CDN, featuring user authentication (Better Auth), screen recording, video uploads with public/private sharing, AI-generated transcripts, metadata access, and a search-enabled content library.",
    githubUrl: "https://github.com/ToniBirat7/Screen_Recording_Full_Stack",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "OAuth", "Drizzle ORM"],
    icon: "fas fa-video",
  },
  {
    title: "Steganography: Communicate with Hidden Images",
    description:
      "Real-time one-to-one chat application using DRF and Django Channels, featuring steganography-based messaging where secret text is hidden inside images fetched from APIs. Enabled instant WebSocket communication with a sleek UI for secure messaging.",
    githubUrl: "https://github.com/ToniBirat7/stagnography_project",
    techStack: ["DRF", "ReactJs", "PostgreSQL", "JavaScript", "WebSocket"],
    icon: "fas fa-user-secret",
  },
  {
    title: "Attendance Management System Using Computer Vision",
    description:
      "Web application enabling educational institutions to streamline attendance tracking using face recognition. Empowers educators to focus on delivering quality education by eliminating constraints of traditional attendance methods.",
    githubUrl: "https://github.com/ToniBirat7/AMS_CV/tree/birat",
    techStack: ["Django", "ReactJs", "ResNet", "Computer Vision", "Docker"],
    icon: "fas fa-camera",
  },
  {
    title: "Attendance Management System Web Application",
    description:
      "Full-stack attendance management platform built with Django. Streamlines operations, reduces administrative burden, and enhances overall efficiency for educational institutions.",
    githubUrl: "https://github.com/ToniBirat7/AMS_Deerwalk_Project",
    techStack: ["Python", "Django", "JavaScript", "HTML", "CSS", "Bootstrap"],
    icon: "fas fa-clipboard-check",
  },
  {
    title: "Hospital Management System GUI",
    description:
      "Python-based application for managing hospital processes — admin login, CRUD operations on doctors/patients, assignment workflows, relocation, and interactive statistics visualization. Integrates ChatGPT API for illness detection.",
    githubUrl: "https://github.com/ToniBirat7/Hospital-Management-System-GUI",
    techStack: ["Python", "Tkinter", "SQLite", "ChatGPT API", "Data Viz"],
    icon: "fas fa-hospital",
  },
  {
    title: "Baali Bigyan",
    description:
      "Mobile application powered by ML that detects plant diseases, suggests treatments, and supports urban agriculture. Connects users with agro-vet professionals. Top 5 Finalist in ICT Award 2024 under Rising Star Innovation.",
    githubUrl: "https://github.com/ToniBirat7/Baali-Bigyan",
    techStack: ["Python", "Django", "Deep Learning", "ResNet50", "Computer Vision"],
    icon: "fas fa-leaf",
  },
];

const TerminalModal = ({ project, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const executionLogs = {
      "MatchVision – End-to-End EPL Prediction Platform": [
        "> Initializing Airflow DAG...",
        "> Connecting to MariaDB Cluster...",
        "> Loading DVC tracked model...",
        "> Fetching real-time odds via DRF...",
        "> System: Optimal. Predictions live."
      ],
      "AI Powered Document RAG System": [
        "> Connecting to Weaviate Vector DB...",
        "> Loading LangChain Embeddings...",
        "> Initializing PDF Ingestion Engine...",
        "> Setting up Redis cache...",
        "> RAG Pipeline: Ready for queries."
      ],
      "Automated Nuclei Segmentation in Microscopy Images": [
        "> Loading TensorFlow weights (U-Net)...",
        "> Initializing OpenCV image pipeline...",
        "> Normalizing microscopy dataset...",
        "> Running inference on nuclei detection...",
        "> IoU Score: 0.88. Segmentation complete."
      ],
      "Screen Recording & Video Sharing Platform": [
        "> Initializing Better Auth session...",
        "> Connecting to Bunny.net CDN...",
        "> Loading AI transcription engine...",
        "> Syncing metadata with Drizzle ORM...",
        "> Status: Online. Recording interface ready."
      ],
      "Steganography: Communicate with Hidden Images": [
        "> Establishing WebSocket connection...",
        "> Initializing bit-shifting encryption...",
        "> Connecting to Image API...",
        "> Security: E2EE enabled.",
        "> Chat: Listening for hidden messages."
      ],
      "Attendance Management System Using Computer Vision": [
        "> Activating Camera Feed...",
        "> Loading ResNet50 Face Encoding...",
        "> Fetching student registration DB...",
        "> Matching faces in real-time...",
        "> Status: 98.5% Accuracy. Logging attendance."
      ],
      "Attendance Management System Web Application": [
        "> Connecting to Django Backend...",
        "> Fetching department records...",
        "> Generating attendance reports...",
        "> Status: Operational."
      ],
      "Hospital Management System GUI": [
        "> Initializing Tkinter UI...",
        "> Connecting to SQLite database...",
        "> Integrating ChatGPT API illness detection...",
        "> Ready: Hospital environment stable."
      ],
      "Baali Bigyan": [
        "> Loading ResNet50 Plant Disease Model...",
        "> Initializing Agro-vet matching engine...",
        "> Analyzing leaf symptoms...",
        "> Diagnosis: Early Blight detection active.",
        "> ICT Award Status: Finalist Confirmed."
      ]
    };

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < executionLogs[project.title].length) {
        setLogs(prev => [...prev, executionLogs[project.title][currentLog]]);
        currentLog++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [project.title]);

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={e => e.stopPropagation()}>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">birat@terminal:~/{project.title.toLowerCase().replace(/\s+/g, '_').substring(0, 15)}</span>
          <button className="terminal-close" onClick={onClose}>&times;</button>
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
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

const Project = () => {
  const [activeProject, setActiveProject] = useState(null);
  const timelineItemsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !timelineItemsRef.current.includes(el)) {
      timelineItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = timelineItemsRef.current;
    currentRef.forEach((item) => observer.observe(item));

    return () => {
      currentRef.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div className="project-gallery">
      <h2 id="project">Project Gallery</h2>
      <div className="project-cards">
        {projects.map((project, index) => (
          <div className="project-card" key={index} ref={addToRefs}>
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
                {project.techStack.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeProject && (
        <TerminalModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}
    </div>
  );
};

export default Project;
