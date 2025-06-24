import React from 'react';
import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import ProgramsSection from '../components/ProgramsSection';
import TrainersSection from '../components/TrainersSection';
import SponsorsSection from '../components/SponsorsSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSlider />
      <AboutSection />
      <ProgramsSection />
      <TrainersSection />
      <SponsorsSection />
    </div>
  );
};

export default Home;
