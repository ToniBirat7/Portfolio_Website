import React from 'react';
import './Profile.css';
import resumePDF from '../assets/Birat_Gautam_2024_Resume.pdf';
import TypingText from './TypingText'; // Import TypingText component

const Profile = () => {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Birat_Gautam_Resume.pdf';
    link.click();
  };

  const codeSnippet = `॥ श्रीशिव ध्यानम् ॥ \n
ॐ डिं डिं डिंकत डिम्ब डिम्ब डमरु, पाणौ सदा यस्य वै। 
फुं फुं फुंकत सर्पजाल हृदयं, घं घं च घण्टा रवम् ॥ 
वं वं वंकत वम्ब वम्ब वहनं, कारुण्य पुण्यात् परम् ॥ 
भं भं भंकत भम्ब भम्ब नयनं, ध्यायेत् शिवम् शंकरम्॥ 

यावत् तोय धरा धरा धर धरा, धारा धरा भूधरा॥ 
यावत् चारु सुचारु चारू चमरं, चामीकरं चामरं॥ 
यावत् रावण राम राम रमणं, रामायणे श्रुयताम्॥ 
तावत् भोग विभोग भोगमतुलम् यो गायते नित्यस:॥ 

यस्याग्रे द्राट द्राट द्रुट द्रुट ममलं, टंट टंट टंटटम् ॥ 
तैलं तैलं तु तैलं खुखु खुखु खुखुमं, खंख खंख सखंखम्॥ 
डंस डंस डुडंस डुहि चकितं, भूपकं भूय नालम्॥ 
ध्यायस्ते विप्रगाहे सवसति सवलः पातु वः चंद्रचूडः॥ 

गात्रं भस्मसितं सितं च हसितं हस्ते कपालं सितम्॥ 
खट्वांग च सितं सितश्च भृषभः, कर्णेसिते कुण्डले॥ 
गंगाफनेसिता जटापशु पतेश्चनद्रः सितो मूर्धनि॥ 
सोऽयं सर्वसितो ददातु विभवं, पापक्षयं सर्वदा॥ 

॥ इति शिव ध्यानम् ॥
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
          <img
            src="../src/assets/NewPP.jpg" // Replace with your image URL
            alt="Profile"
            className="profile-image"
          />
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
