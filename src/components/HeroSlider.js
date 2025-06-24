import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: require('../assets/images/general/bago@bCFSA.jpg'),
      title: 'Welcome to Bago Center For Skills Acquisition',
      subtitle: 'Empowering Youth Through Free Basic Training',
      description: 'Join us in building a skilled workforce for tomorrow'
    },
    {
      image: require('../assets/images/general/image1.jpg'),
      title: 'Quality Training Programs',
      subtitle: 'Learn from Expert Trainers',
      description: 'Comprehensive skill development in various fields'
    },
    {
      image: require('../assets/images/general/image2.jpg'),
      title: 'Modern Facilities',
      subtitle: 'State-of-the-art Equipment',
      description: 'Learn with the latest tools and technology'
    },
    {
      image: require('../assets/images/general/image3.jpg'),
      title: 'Career Opportunities',
      subtitle: 'Build Your Future',
      description: 'Graduate with marketable skills and job readiness'
    },
    {
      image: require('../assets/images/general/image4.jpg'),
      title: 'Community Impact',
      subtitle: 'Making a Difference',
      description: 'Contributing to community development through skills'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <h2>{slide.subtitle}</h2>
              <p>{slide.description}</p>
              <div className="slide-buttons">
                <Link to="/programs" className="btn btn-primary">View Programs</Link>
                <Link to="/registration" className="btn btn-secondary">Register Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button className="prev-btn" onClick={prevSlide}>&#8249;</button>
        <button className="next-btn" onClick={nextSlide}>&#8250;</button>
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
