import React, { useRef, useEffect } from 'react';
import './CareerHighlights.css';

const CareerHighlights = () => {
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
    <div className="career-container" id="experience">
      <p>Career Highlights</p>
      <div className="timeline">
        <div className="timeline-item-flex">
          <div className="timeline-item">
            <div className="timeline-content" ref={addToRefs}>
              <h3>BSc (Hons) Computer Science with AI Student</h3>
              <h4>Birmingham City University | 2023-Present</h4>
              <ul>
                <li>Currently Third Semester Student.</li>
                <li>
                  Spearheaded a team of five developers to create a web
                  application that automated attendance taking using face
                  recognition.
                </li>
                <li>Completed First Year with First Class Honors.</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content" ref={addToRefs}>
              <h3>Backend Developer Intern</h3>
              <h4>Deerwalk Compware Ltd. | Jun 2023- Aug 2023</h4>
              <ul>
                <li>
                  Designed and developed the Attendance Management System, a web
                  application using Django.
                </li>
                <li>
                  Implemented functionality to generate detailed attendance
                  reports in Excel format.
                </li>
                <li>Successfully developed Admin Panel for CRUD operations.</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content" ref={addToRefs}>
              <h3>High School Graduate</h3>
              <h4>Uniglobe SS/College | 2020-2022</h4>
              <ul>
                <li>Graduated with a 3.78/4 GPA.</li>
                <li>
                  Awarded the Student of the Year Award (UGSS Achievers Award
                  2022).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHighlights;
