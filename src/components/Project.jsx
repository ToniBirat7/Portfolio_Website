// Project.js
import React from 'react';
import { useRef, useEffect } from 'react';
import './Project.css';

const projects = [
  {
    title: 'Attendance Management System Using Computer Vision',
    imageUrl: 'AMS.png', // Replace with the actual image path
    description:
      'By leveraging Attendance Management Web Application, educational institutions can streamline their operations, reduce administrative burden, and enhance overall efficiency. By eliminating the constraints of traditional attendance tracking methods, our platform empowers educators and administrators to focus their time and resources on delivering quality education and fostering student success',
    githubUrl: 'https://github.com/ToniBirat7/AMS_CV/tree/birat', // Replace with the actual URL
    techStack: ['Django', 'ReactJs', 'ResNet', 'Computer Vision', 'Docker'],
  },
  {
    title: 'Attendance Management System Web Application',
    imageUrl: 'AMS2.png', // Replace with the actual image path
    description:
      'By leveraging Attendance Management Web Application, educational institutions can streamline their operations, reduce administrative burden, and enhance overall efficiency. By eliminating the constraints of traditional attendance tracking methods, our platform empowers educators and administrators to focus their time and resources on delivering quality education and fostering student success.',
    githubUrl: 'https://github.com/ToniBirat7/AMS_Deerwalk_Project.git', // Replace with the actual URL
    techStack: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    title: 'Hospital Management System GUI',
    imageUrl: 'HMS.png', // Replace with the actual image path
    description:
      'This Hospital Management System is a Python-based application designed to streamline the management processes within a hospital or medical facility. The system provides various features such as admin login, CRUD operations on doctors and patients, assignment of doctors to patients, relocation of patients between doctors, and interactive visualization of statistics. Additionally, the system can be integrated with the ChatGPT API to detect illnesses based on patient symptoms, allowing for automatic assignment of doctors to patients.',
    githubUrl: 'https://github.com/ToniBirat7/AMS_Deerwalk_Project.git', // Replace with the actual URL
    techStack: [
      'Python',
      'Tkinter',
      'SQLite',
      'ChatGPT API',
      'Data Visualization',
    ],
  },
  {
    title: 'Baali Bigyan',
    videoUrl: 'Bali_Bigyan.mp4',
    imageUrl: 'HMS.png', // Replace with the actual image path
    description:
      '𝗕𝗮𝗮𝗹𝗶 𝗕𝗶𝗴𝘆𝗮𝗻 is a mobile application powered by machine learning that detects plant diseases, suggests treatments, and supports urban agriculture by providing video tutorials and enabling farmers to purchase recommended products. It also connects users with agro-vet professionals for accurate consultation, promoting trust and effective solutions. Recognized for its innovation, Baali Bigyan was a Top 5 Finalist in the prestigious 𝗜𝗖𝗧 𝗔𝘄𝗮𝗿𝗱 2024 under the 𝗥𝗶𝘀𝗶𝗻𝗴 𝗦𝘁𝗮𝗿 𝗜𝗻𝗻𝗼𝘃𝗮𝘁𝗶𝗼𝗻 category, showcasing its impact on Nepal"s agriculture.',
    githubUrl: 'https://github.com/ToniBirat7/AMS_Deerwalk_Project.git', // Replace with the actual URL
    techStack: [
      'Python',
      'Django',
      'Deep Learning',
      'ResNet50',
      'Computer Vision',
    ],
  },
];

const Project = () => {
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
            entry.target.classList.add('visible');
          } else {
            // Remove the class when the item is not in the viewport
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.1, // Adjust threshold if necessary
      }
    );

    timelineItemsRef.current.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      timelineItemsRef.current.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="project-gallery">
      <h2 id="project">Project Gallery</h2>
      <div className="project-cards">
        {projects.map((project, index) => (
          <div className="project-card" key={index} ref={addToRefs}>
            {project.videoUrl ? (
              <video
                className="project-video"
                src={project.videoUrl}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="project-image"
              />
            )}
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i> Github Repository
              </a>
              <div className="tech-stack">
                {project.techStack.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
