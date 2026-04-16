import { Routes, Route } from 'react-router-dom';
import CareerHighlights from './components/CareerHighlights';
import HeroSection from './components/HeroPage';
import NavBar from './components/NavBar';
import Project from './components/Project.jsx';
import AwardsAchievements from './components/Achievements.jsx';
import Profile from './components/Profile.jsx';
import Research from './components/Research.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Contact from './components/Contact.jsx';
import BlogHome from './components/blog/BlogHome.jsx';
import BlogPost from './components/blog/BlogPost.jsx';

function Portfolio() {
  return (
    <>
      <ScrollProgress />
      <NavBar />
      <HeroSection />
      <Profile />
      <CareerHighlights />
      <Research />
      <Project />
      <AwardsAchievements />
      <Contact />
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Birat Gautam. All rights reserved.</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog" element={<BlogHome />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}

export default App;
