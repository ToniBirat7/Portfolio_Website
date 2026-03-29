import "./Profile.css";

const Profile = () => {
  return (
    <section className="profile-container" id="profile" aria-labelledby="profile-heading">
      <h2 className="philosophy-title" id="profile-heading">
        Read, Reverse, Rebuild <span>&rarr; AI Agents</span>
      </h2>
      <div className="profile-content">
        <div className="profile-details">
          <img src="pp.jpg" alt="Birat Gautam, AI/ML Engineer and Full Stack Developer" className="profile-image" width="200" height="200" />
          <div className="about-me">
            <h3>ABOUT ME</h3>
            <h4>I&apos;m Birat Gautam</h4>
            <p>
              Computer Science student at <strong>Birmingham City University</strong> with a focus on AI/ML and Backend Engineering. Currently exploring the frontiers of <strong>LLMs and Agentic AI</strong>. 
            </p>
            <p>
              My philosophy: Curiosity drives innovation. I spend most of my days diving &quot;under the hood&quot; to understand how systems work, learning how to explain complex concepts, and building to contribute for a better future.
            </p>
            <div className="skill-tags">
              <span>Python</span>
              <span>PyTorch</span>
              <span>LLM Fine-Tuning</span>
              <span>RAG</span>
              <span>Agentic AI</span>
              <span>LangChain</span>
              <span>FastAPI</span>
              <span>Django</span>
              <span>Docker</span>
              <span>Redis</span>
              <span>PostgreSQL</span>
              <span>Vector Databases</span>
              <span>Git</span>
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
                <i className="fas fa-file-download" aria-hidden="true"></i> Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
