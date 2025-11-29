import './HeroPage.css';

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
          </div>
          <p>
            I Build Everything From Scratch <br /> Connect Each Single
            Transistors to Make a Byte
          </p>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
