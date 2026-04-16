import { useInView } from '../hooks/useInView';
import { skills } from '../data/skills';
import './Profile.css';

const Profile = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      className="profile-container"
      id="profile"
      aria-labelledby="profile-heading"
    >
      <h2 className="philosophy-title" id="profile-heading">
        Read, Reverse, Rebuild <span>&rarr; AI Agents</span>
      </h2>
      <div className="profile-content" ref={ref}>
        <div
          className={`profile-details animate-in ${inView ? 'in-view' : ''}`}
        >
          <img
            src="pp.jpg"
            alt="Birat Gautam, AI/ML Engineer and Full Stack Developer"
            className="profile-image"
            width="200"
            height="200"
            decoding="async"
            fetchPriority="high"
          />
          <div className="about-me">
            <h3>ABOUT ME</h3>
            <h4>I&apos;m Birat Gautam</h4>
            <p>
              Computer Science student at{' '}
              <strong>Birmingham City University</strong> with a focus on AI/ML
              and Backend Engineering. Currently exploring the frontiers of{' '}
              <strong>LLMs and Agentic AI</strong>.
            </p>
            <p>
              My philosophy: Curiosity drives innovation. I spend most of my
              days diving &quot;under the hood&quot; to understand how systems
              work, learning how to explain complex concepts, and building to
              contribute for a better future.
            </p>
            <div className="skill-tags">
              {skills.map((skill, i) => (
                <span
                  key={skill}
                  className={`stagger-item ${inView ? 'in-view' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="buttons">
              <a
                href="https://www.linkedin.com/in/biratgautam7/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn linkedin"
                aria-label="Visit Birat Gautam's LinkedIn profile"
              >
                <i className="fab fa-linkedin" aria-hidden="true"></i> LinkedIn
              </a>
              <a
                href="https://github.com/ToniBirat7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn github"
                aria-label="Visit Birat Gautam's GitHub profile"
              >
                <i className="fab fa-github" aria-hidden="true"></i> Github
              </a>
              <a
                href="Birat_Gautam_2025_Resume.pdf"
                download="Birat_Gautam_2025_Resume.pdf"
                className="btn resume"
                aria-label="Download Birat Gautam's resume"
              >
                <i className="fas fa-file-download" aria-hidden="true"></i>{' '}
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
