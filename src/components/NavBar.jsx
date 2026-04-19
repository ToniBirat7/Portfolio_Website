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
  const [activeSection, setActiveSection] = useState('root');
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const nav = document.querySelector('.navbar');
      const navHeight = nav?.offsetHeight || 70;
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY - navHeight - 12;

      window.scrollTo({
        top: Math.max(sectionTop, 0),
        behavior: 'smooth',
      });

      if (window.history?.replaceState) {
        window.history.replaceState(null, '', `#${id}`);
      }
    }
  };

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

  useEffect(() => {
    const updateVisibility = () => {
      const profileSection = document.getElementById('profile');
      if (!profileSection) {
        setIsVisible(false);
        return;
      }

      const nav = document.querySelector('.navbar');
      const navHeight = nav?.offsetHeight || 70;
      const revealOffset = profileSection.offsetTop - navHeight;
      setIsVisible(window.scrollY >= Math.max(revealOffset, 0));
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <nav
      className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
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
