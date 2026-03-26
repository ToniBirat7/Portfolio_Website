import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container" id="profile">
      <h2 className="philosophy-title">
        Read, Reverse, Rebuild <span>&rarr; AI Agents</span>
      </h2>
      <div className="profile-content">
        <div className="profile-details">
          <img src="pp.jpg" alt="Profile" className="profile-image" />
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
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a
                href="https://github.com/ToniBirat7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn github"
              >
                <i className="fab fa-github"></i> Github
              </a>
              <a 
                href="Birat_Gautam_2025_Resume.pdf" 
                download="Birat_Gautam_2025_Resume.pdf" 
                className="btn resume"
              >
                <i className="fas fa-file-download"></i> Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
