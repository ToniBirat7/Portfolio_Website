import { useEffect, useState } from 'react';
import './HeroPage.css';
import TypingText from './TypingText';

function HeroSection() {
  const [scrollFade, setScrollFade] = useState({ opacity: 1, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const opacity = Math.max(1 - scrolled / (window.innerHeight * 0.6), 0);
      const y = scrolled * 0.15;
      setScrollFade({ opacity, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="hero-container">
        <p className="name">विराट गौतम</p>
        <p className="quote">
          ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते । <br />
          पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ <br /> ॐ शान्तिः शान्तिः
          शान्तिः ॥
        </p>
        <div
          className="overlay"
          style={{
            opacity: scrollFade.opacity,
            transform: `translateY(${scrollFade.y}px)`,
          }}
        >
          <div className="content">
            <h1>
              Not Your Average <br />{' '}
              <span className="nepali-word">नेपाली</span> Learner!
            </h1>
            <div style={{ marginTop: '10px', fontSize: '1.2rem', color: '#ccd6f6' }}>
              Currently, <TypingText
                words={['Replanning', 'Adopting', 'Stacking Bricks']}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </div>
          </div>
          <p className="fade-in-up tagline" style={{ animationDelay: '2s' }}>
            {"Learn to explain".split("").map((char, i) => (
              <span key={`l1-${i}`} className="hover-char" style={{ '--index': i }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <br />
            {"You can't learn the unlearned, unheard".split("").map((char, i) => (
              <span key={`l2-${i}`} className="hover-char" style={{ '--index': i + 15 }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <br />
            {"from someone who hasn't".split("").map((char, i) => (
              <span key={`l3-${i}`} className="hover-char" style={{ '--index': i + 50 }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <br />
            {"unlearned, unheard.".split("").map((char, i) => (
              <span key={`l4-${i}`} className="hover-char" style={{ '--index': i + 75 }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </header>
    </>
  );
}

export default HeroSection;
