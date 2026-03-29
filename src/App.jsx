
import CareerHighlights from './components/CareerHighlights';
import HeroSection from './components/HeroPage';
import NavBar from './components/NavBar';
import Project from './components/Project.jsx';
import AwardsAchievements from './components/Achievements.jsx';
import Profile from './components/Profile.jsx';
import Research from './components/Research.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Contact from './components/Contact.jsx';

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <NavBar />
      <HeroSection />
      <main id="main-content">
        <Profile />
        <CareerHighlights />
        <Research />
        <Project />
        <AwardsAchievements />
        <Contact />
      </main>
      <footer style={{ textAlign: 'center', padding: '2rem 1rem', color: '#8892b0', fontSize: '0.9rem', borderTop: '1px solid #112240' }}>
        <p>&copy; {new Date().getFullYear()} Birat Gautam. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
