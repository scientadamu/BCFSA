import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Bago Center For Skills Acquisition</h2>
            <p>
              Bago Center for Skills Acquisition (BCFSA) is a leading NGO dedicated to empowering 
              youth through comprehensive skill development programs. We provide free basic training 
              in various fields to help young people build sustainable careers and contribute to 
              community development.
            </p>
            <p>
              Our mission is to bridge the skills gap in our community by offering quality training 
              programs that are accessible to all youth, regardless of their economic background. 
              We believe that every young person deserves the opportunity to develop marketable skills 
              and achieve their full potential.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h3>300+</h3>
                <p>Graduates</p>
              </div>
              <div className="stat">
                <h3>10+</h3>
                <p>Programs</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>95%</h3>
                <p>Success Rate</p>
              </div>
            </div>
            <Link to="/about" className="btn btn-primary">Learn More</Link>
          </div>
          <div className="about-image">
            <img 
              src={require('../assets/images/general/465A4602.jpg')} 
              alt="BCFSA Training Session" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
