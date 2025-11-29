import "./Profile.css";
// import resumePDF from '../assets/Birat_Gautam_2024_Resume.pdf';
import TypingText from "./TypingText"; // Import TypingText component

const Profile = () => {
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "Birat_Gautam_Resume.pdf";
    link.download = "Birat_Gautam_Resume.pdf";
    link.click();
  };

  const codeSnippet = `Birat Gautam // @ToniBirat7
Toni Kroos calm → code precision.

BSc (Hons) CS + AI @ Birmingham City Uni.
Reverse-engineering flip-flops so software breathes.

Shipping: backend, AI, fullstack, DSA.
Belief: each bit is alchemy-curiosity over sanity.

Question: What are you building, why now,
and what remains when the terminal clears?`.trim();

  return (
    <div className="profile-container" id="profile">
      <h2>Your Next Software Engineer</h2>
      <div className="profile-content">
        <div className="terminal-wrapper">
          <div className="mac-top-bar">
            <span className="red-circle"></span>
            <span className="yellow-circle"></span>
            <span className="green-circle"></span>
          </div>
          <div className="code-snippet">
            <TypingText text={codeSnippet} /> {/* Animated typing effect */}
          </div>
        </div>
        <div className="profile-details">
          <img src="pp.jpg" alt="Profile" className="profile-image" />
          <div className="about-me">
            <h3>ABOUT ME</h3>
            <h4>I'm Birat Gautam</h4>
            <p>
              "Coding is my canvas, and technology is my paintbrush. With 2+
              years of experience and a passion for staying on the cutting edge,
              I bring artistry and innovation to every project. From front-end
              finesse to back-end brilliance, I'm your versatile developer ready
              to turn your vision into reality."
            </p>
            <div className="buttons">
              <a
                href="https://www.linkedin.com/in/biratgautam7/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn linkedin"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/ToniBirat7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn github"
              >
                Github
              </a>
              <button onClick={handleResumeDownload} className="btn resume">
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
