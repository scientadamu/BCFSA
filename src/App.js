import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
// import About from '.components/About';
import Skills from './components/Skills';
import Sections from './components/Sections';
import Committees from './components/Committees';
import Sponsors from './components/Sponsors';
import Media from './components/Media';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleMenu = () => {
    setIsNavOpen(prevState => !prevState);
  };

  return (
    <div className="App">
      <Header isNavOpen={isNavOpen} toggleMenu={toggleMenu} />
      <Hero />
      <a href="#" id="scrollBtn" className="btn scroll-btn">↓</a>
      <a href="index.html" className="btn go-back-btn">Go Back</a>
      {/* <About /> */}
      <Skills />
      <Sections />
      <Committees />
      <Sponsors />
      <Media />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
