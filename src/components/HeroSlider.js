import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
  {
    image: require('../assets/images/general/farmrBago.jpg'),
    title: 'His Excellency, Governor Farmer Umaru Bago',
    subtitle: 'Visionary Leader & Patron of BCFSA',
    description: 'Championing youth empowerment and skills development across Niger State',
    category: 'leadership',
    link: '/about#governor'
  },
  {
    image: require('../assets/images/general/bcfsaChairman.jpg'),
    title: 'Chairman of BCFSA',
    subtitle: 'Leading Excellence in Skills Training',
    description: 'Dedicated to transforming lives through quality education and training',
    category: 'leadership',
    link: '/about#chairman',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  {
    image: require('../assets/images/general/465A4630.jpg'),
    title: 'Our Skills Acquisition Programs',
    subtitle: 'Empowering Youth Through Quality Training',
    description: 'Comprehensive vocational training in 8 different skills to build sustainable careers',
    category: 'skills',
    link: '/skills-programs'
  },
  {
    image: require('../assets/images/general/ProposedOphanageHome.jpg'),
    title: 'Our Orphanage Services',
    subtitle: 'Caring for Vulnerable Children',
    description: 'Providing love, care, education and hope for orphaned and vulnerable children',
    category: 'orphanage',
    link: '/orphanage-services'
  },
  {
    image: require('../assets/images/general/genderBaseViolence.jpg'),
    title: 'Fight Against Gender-Based Violence',
    subtitle: 'Protecting Women & Children',
    description: 'Advocacy, support services and empowerment programs to combat gender-based violence',
    category: 'gbv',
    link: '/fight-gbv'
  },
  {
    image: require('../assets/images/general/marriage.jpg'),
    title: 'Uniting Divorcees and Widows',
    subtitle: 'Support • Empowerment • Community',
    description: 'Providing emotional support, skills training and economic empowerment for women in need',
    category: 'women-support',
    link: '/women-support'
  }
];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 7000); // Increased from 5000ms to 7000ms (7 seconds)

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
                {slide.category === 'leadership' && (
                  <>
                    <Link to={slide.link} className="btn btn-primary">About Our Leadership</Link>
                    <Link to="/contact" className="btn btn-secondary">Contact</Link>
                  </>
                )}
                {slide.category === 'skills' && (
                  <>
                    <Link to={slide.link} className="btn btn-primary">View Programs</Link>
                    <Link to="/application?type=trainee" className="btn btn-secondary">Register Now</Link>
                  </>
                )}
                {slide.category === 'orphanage' && (
                  <>
                    <Link to={slide.link} className="btn btn-primary">Our Services</Link>
                    <Link to="/contact" className="btn btn-secondary">Support Us</Link>
                  </>
                )}
                {slide.category === 'gbv' && (
                  <>
                    <Link to={slide.link} className="btn btn-primary">Learn More</Link>
                    <Link to="/contact" className="btn btn-secondary">Get Help</Link>
                  </>
                )}
                {slide.category === 'women-support' && (
                  <>
                    <Link to={slide.link} className="btn btn-primary">Join Our Community</Link>
                    <Link to="/application?type=trainee" className="btn btn-secondary">Apply for Training</Link>
                  </>
                )}
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
