import { useEffect, useState } from 'react';
import './Nav.css';

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isVisible ? 'visible' : ''}`} aria-label="Main navigation">
      <ul>
        <li><a href="#root" onClick={(e) => { e.preventDefault(); handleScrollTo('root'); }}>Home</a></li>
        <li><a href="#experience" onClick={(e) => { e.preventDefault(); handleScrollTo('experience'); }}>Experience</a></li>
        <li><a href="#profile" onClick={(e) => { e.preventDefault(); handleScrollTo('profile'); }}>Profile</a></li>
        <li><a href="#project" onClick={(e) => { e.preventDefault(); handleScrollTo('project'); }}>Projects</a></li>
        <li><a href="#awards" onClick={(e) => { e.preventDefault(); handleScrollTo('awards'); }}>Achievements</a></li>
        <li><a href="#research" onClick={(e) => { e.preventDefault(); handleScrollTo('research'); }}>Research</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }}>Contact</a></li>
        <li>
          <a href="https://www.linkedin.com/pulse/demystifying-working-react-from-jsx-pixels-birat-gautam-4rqif/?trackingId=GiS%2B8t1YROKpAk9200dkig%3D%3D" target="_blank" rel="noopener noreferrer">
            Blog
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
