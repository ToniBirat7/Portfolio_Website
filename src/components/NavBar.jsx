import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const sections = [
  'root',
  'profile',
  'experience',
  'research',
  'project',
  'awards',
  'contact',
];

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('root');

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
      setIsVisible(window.scrollY >= window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`navbar ${isVisible ? 'visible' : ''}`}
      aria-label="Main navigation"
    >
      <ul>
        {[
          { id: 'root', label: 'Home' },
          { id: 'experience', label: 'Experience' },
          { id: 'profile', label: 'Profile' },
          { id: 'project', label: 'Projects' },
          { id: 'awards', label: 'Achievements' },
          { id: 'research', label: 'Research' },
          { id: 'contact', label: 'Contact' },
        ].map(({ id, label }) => (
          <li key={id} className={activeSection === id ? 'active' : ''}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo(id);
              }}
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
