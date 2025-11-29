import React from "react";
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

  const codeSnippet = `It's me Birat Gautam, a.k.a @ToniBirat7 in duality.
⚽ Yes, Toni inspired by the calm, composed, and disciplined midfielder Toni Kroos. If code were football, I'd be playing deep building from the back, dictating the flow.

What am I doing?

Pursuing BSc (Hons) Computer Science with AI @ Birmingham City University.
Want to understand the working of a computer from scratch—yes, I'm literally talking flip-flops and transistors.
Currently learning Backend Engineering, AI, Fullstack Development, and DSA.
"Fix each transistor to create a bit."

Sounds insane, right? That's the point. Sanity doesn't innovate.

I'm not here just to use computers. I want to understand them, design them, breathe life into them bit by bit.

You see code, it is not just logic; it's an unseen frequency that tunes into reality.
Life? It's not just about 0s and 1s; it's about balance, depth, and knowing your true self.

I love exploring things from scratch because starting from nothing is the closest you can get to creation.

Are You Still Reading?
So... ask yourself:

What are you building?
Why are you building it?
And when the terminal clears, what remains?

Happy Coding.
`.trim();

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
          <img src="pp.png" alt="Profile" className="profile-image" />
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
