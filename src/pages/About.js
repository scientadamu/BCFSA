import React from 'react';
import MediaGallery from '../components/MediaGallery';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <h1>About Bago Center For Skills Acquisition</h1>
          <p>Empowering youth through comprehensive skill development programs</p>
        </div>

        <div className="about-content">
          <section className="mission-section">
            <div className="content-grid">
              <div className="text-content">
                <h2>Our Mission</h2>
                <p>
                  To provide free, quality skill development training to youth in our community, 
                  empowering them with marketable skills that lead to sustainable employment and 
                  entrepreneurship opportunities.
                </p>
              </div>
              <div className="image-content">
                <img src={require('../assets/images/general/465A4605.jpg')} alt="Our Mission" />
              </div>
            </div>
          </section>

          <section className="vision-section">
            <div className="content-grid reverse">
              <div className="text-content">
                <h2>Our Vision</h2>
                <p>
                  To be the leading skills acquisition center in Niger State, creating a skilled 
                  workforce that drives economic growth and reduces youth unemployment in our region.
                </p>
              </div>
              <div className="image-content">
                <img src={require('../assets/images/general/465A4608.jpg')} alt="Our Vision" />
              </div>
            </div>
          </section>

          <section className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Excellence</h3>
                <p>We strive for the highest quality in all our training programs and services.</p>
              </div>
              <div className="value-card">
                <h3>Accessibility</h3>
                <p>We ensure our programs are free and accessible to all youth regardless of background.</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>We continuously update our curriculum to meet modern industry demands.</p>
              </div>
              <div className="value-card">
                <h3>Community</h3>
                <p>We are committed to the development and growth of our local community.</p>
              </div>
            </div>
          </section>

          <section className="leadership-section">
            <h2>Our Leadership</h2>
            <div className="leadership-grid">
              <div className="leader-card">
                <img src={require('../assets/images/general/chairman.webp')} alt="Chairman" />
                <h3>Chairman</h3>
                <p>Leading the organization with vision and dedication to youth empowerment.</p>
              </div>
              <div className="leader-card">
                <img src={require('../assets/images/general/Sec BCFSA.PNG')} alt="Secretary" />
                <h3>Secretary</h3>
                <p>Coordinating programs and ensuring smooth operations across all departments.</p>
              </div>
              <div className="leader-card">
                <img src={require('../assets/images/general/ministry of labour.PNG')} alt="Ministry Representative" />
                <h3>Ministry Representative</h3>
                <p>Liaison with government agencies and policy implementation.</p>
              </div>
            </div>
          </section>

          <section className="impact-section">
            <h2>Our Impact</h2>
            <div className="impact-stats">
              <div className="stat-card">
                <h3>500+</h3>
                <p>Youth Trained</p>
              </div>
              <div className="stat-card">
                <h3>85%</h3>
                <p>Employment Rate</p>
              </div>
              <div className="stat-card">
                <h3>10+</h3>
                <p>Skill Programs</p>
              </div>
              <div className="stat-card">
                <h3>5+</h3>
                <p>Years of Service</p>
              </div>
            </div>
          </section>

          <MediaGallery />
        </div>
      </div>
    </div>
  );
};

export default About;
