import React, { useEffect, useState } from 'react';
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
    <nav className={`navbar ${isVisible ? 'visible' : ''}`}>
      <ul>
        <li onClick={() => handleScrollTo('root')}>Home</li>
        <li onClick={() => handleScrollTo('experience')}>Experience</li>
        <li onClick={() => handleScrollTo('profile')}>Profile</li>
        <li onClick={() => handleScrollTo('project')}>Projects</li>
        <li onClick={() => handleScrollTo('awards')}>Achievements</li>
        <li onClick={() => handleScrollTo('contact')}>Contact</li>
        <li>
          <a href="https://www.linkedin.com/pulse/demystifying-working-react-from-jsx-pixels-birat-gautam-4rqif/?trackingId=GiS%2B8t1YROKpAk9200dkig%3D%3D">
            Blog
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
