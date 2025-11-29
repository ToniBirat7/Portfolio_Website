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

  const codeSnippet =
    `Birat Gautam, known online as @ToniBirat7, carrying the calm precision of Toni Kroos into the world of code.

Currently pursuing BSc (Hons) Computer Science with AI at Birmingham City University.

Drawn toward understanding computers from the transistor and flip-flop level upward—not just using machines but decoding their heartbeat.

Learning and building in Backend Engineering, AI, Fullstack Development, and DSA.

Believes that every transistor, every bit, is a tiny act of creation—sanity optional, curiosity required.

Sees code as more than logic: a subtle frequency that shapes reality when tuned just right.

Motivated by the idea that starting from nothing is where true creation begins.

Lives with the question: What are you building, why are you building it, and what remains when the terminal clears?`.trim();

  return (
    <div className="profile-container" id="profile">
      <h2>Your Next Software Engineer</h2>
      <div className="profile-content">
        <div className="code-window"></div>
        <div className="code-snippet">
          <div className="mac-top-bar">
            <span className="red-circle"></span>
            <span className="yellow-circle"></span>
            <span className="green-circle"></span>
          </div>
          <TypingText text={codeSnippet} /> {/* Animated typing effect */}
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
