import React from 'react';
import './AboutGovernor.css';

const AboutGovernor = () => {
  return (
    <div className="about-governor-page">
      {/* Hero Section */}
      <section className="governor-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>His Excellency, Governor Farmer Umaru Bago</h1>
              <p className="hero-subtitle">Executive Governor of Niger State & Patron of BCFSA</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={require('../assets/images/general/farmrBago.jpg')} alt="Governor Farmer Umaru Bago" />
        </div>
      </section>

      {/* Biography Section */}
      <section className="governor-biography">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2>About His Excellency</h2>
              <div className="bio-content">
                <p className="lead">
                  His Excellency, Governor Farmer Umaru Bago is a visionary leader committed to transforming Niger State 
                  through innovative policies and programs that prioritize youth empowerment, skills development, and 
                  sustainable economic growth.
                </p>
                
                <h3>Educational Background</h3>
                <p>
                  Governor Bago holds a distinguished academic background with degrees in Agriculture and Public Administration. 
                  His educational foundation has equipped him with the knowledge and expertise to drive agricultural 
                  transformation and effective governance in Niger State.
                </p>

                <h3>Political Career</h3>
                <p>
                  Before becoming Governor, His Excellency served in various capacities in public service, demonstrating 
                  exceptional leadership and commitment to public welfare. His political journey has been marked by 
                  dedication to grassroots development and youth empowerment initiatives.
                </p>

                <h3>Vision for Niger State</h3>
                <p>
                  Under his leadership, Niger State has witnessed significant improvements in:
                </p>
                <ul>
                  <li>Youth empowerment and skills acquisition programs</li>
                  <li>Agricultural modernization and food security</li>
                  <li>Infrastructure development and rural transformation</li>
                  <li>Education and healthcare delivery</li>
                  <li>Women and children welfare programs</li>
                </ul>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="governor-profile-card">
                <div className="profile-image">
                  <img src={require('../assets/images/general/farmrBago.jpg')} alt="Governor Farmer Umaru Bago" />
                </div>
                <div className="profile-info">
                  <h4>Governor Farmer Umaru Bago</h4>
                  <p className="title">Executive Governor of Niger State</p>
                  <div className="profile-details">
                    <div className="detail-item">
                      <strong>Position:</strong>
                      <span>Executive Governor</span>
                    </div>
                    <div className="detail-item">
                      <strong>State:</strong>
                      <span>Niger State, Nigeria</span>
                    </div>
                    <div className="detail-item">
                      <strong>Party:</strong>
                      <span>All Progressives Congress (APC)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="governor-achievements">
        <div className="container">
          <h2>Key Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Youth Empowerment</h3>
              <p>Established multiple skills acquisition centers across Niger State, including BCFSA, providing training opportunities for thousands of young people.</p>
            </div>
            
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Agricultural Development</h3>
              <p>Implemented modern farming techniques and provided support to farmers, significantly increasing agricultural productivity in the state.</p>
            </div>
            
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-road"></i>
              </div>
              <h3>Infrastructure Development</h3>
              <p>Initiated major road construction and rehabilitation projects, improving connectivity and economic activities across rural and urban areas.</p>
            </div>
            
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Social Welfare</h3>
              <p>Launched comprehensive programs for orphans, widows, and vulnerable groups, including the establishment of orphanage homes and support centers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BCFSA Support Section */}
      <section className="bcfsa-support">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Support for BCFSA</h2>
              <p className="lead">
                As the Patron of Bago Center for Skills Acquisition and Orphanage Home, His Excellency has been 
                instrumental in the establishment and growth of our institution.
              </p>
              <div className="support-highlights">
                <div className="highlight-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Provided initial funding and resources for BCFSA establishment</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Ongoing support for program development and expansion</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Advocacy for skills development and youth empowerment</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Support for orphanage services and child welfare programs</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="support-image">
                <img src={require('../assets/images/general/bcfsaAndMinistryOfLabour.jpg')} alt="Governor supporting BCFSA" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="governor-quote">
        <div className="container">
          <div className="quote-content">
            <blockquote>
              "Our commitment to youth empowerment and skills development is unwavering. Through institutions like BCFSA, 
              we are building a generation of skilled, self-reliant young people who will drive the economic transformation 
              of Niger State and Nigeria as a whole."
            </blockquote>
            <cite>- His Excellency, Governor Farmer Umaru Bago</cite>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="governor-contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Office of the Governor</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Government House, Minna, Niger State, Nigeria</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+234 (0) 66 222 XXX</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>info@nigerstate.gov.ng</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h3>Follow the Governor</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                  <span>Twitter</span>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutGovernor;
