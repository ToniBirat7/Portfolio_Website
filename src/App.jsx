import React, { useRef } from 'react';
import CareerHighlights from './components/CareerHighlights';
import HeaderComponent from './components/HeaderComp.jsx';
import Project from './components/Project.jsx';
import AwardsAchievements from './components/Achievements.jsx';
import Profile from './components/Profile.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Contact from './components/Contact.jsx';

function App() {
  return (
    <>
      <HeaderComponent />
      <Profile />
      <CareerHighlights />
      <Project />
      <AwardsAchievements />
      <Contact />
    </>
  );
}

export default App;
