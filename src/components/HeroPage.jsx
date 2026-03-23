import './HeroPage.css';
import TypingText from './TypingText';

function HeroSection() {
  // const quote = `
  // ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते । \n
  // पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ \n
  // ॐ शान्तिः शान्तिः शान्तिः ॥`.trim();
  return (
    <>
      <div className="hero-container">
        <p className="name">विराट गौतम</p>
        <p className="quote">
          ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते । <br />
          पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ <br /> ॐ शान्तिः शान्तिः
          शान्तिः ॥
        </p>
        <div className="overlay">
          <div className="content">
            <h1>
              Not Your Average <br />{' '}
              <span className="nepali-word">नेपाली</span> Learner!
            </h1>
            <div style={{ marginTop: '10px', fontSize: '1.2rem', color: '#ccd6f6' }}>
              I am a <TypingText 
                words={['Full Stack Developer', 'AI Enthusiast', 'Tech Explorer']} 
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </div>
          </div>
          <p className="fade-in-up" style={{ animationDelay: '2s' }}>
            I Build Everything From Scratch <br /> Connect Each Single
            Transistors to Make a Byte
          </p>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
