
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
      <NavBar />
      <HeroSection />
      <Profile />
      <CareerHighlights />
      <Research />
      <Project />
      <AwardsAchievements />
      <Contact />
    </>
  );
}

export default App;
