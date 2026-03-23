import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container" id="profile">
      <h2>Your Next Software Engineer</h2>
      <div className="profile-content">
        <div className="profile-details">
          <img src="pp.jpg" alt="Profile" className="profile-image" />
          <div className="about-me">
            <h3>ABOUT ME</h3>
            <h4>I&apos;m Birat Gautam</h4>
            <p>
              Coding is my canvas, and technology is my paintbrush. With 2+
              years of experience and a passion for staying on the cutting edge,
              I bring artistry and innovation to every project. From front-end
              finesse to back-end brilliance, I&apos;m your versatile developer ready
              to turn your vision into reality.
            </p>
            <div className="skill-tags">
              <span>Python</span>
              <span>Django</span>
              <span>React.js</span>
              <span>Next.js</span>
              <span>Node.js</span>
              <span>FastAPI</span>
              <span>TensorFlow</span>
              <span>Docker</span>
              <span>PostgreSQL</span>
              <span>Redis</span>
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
