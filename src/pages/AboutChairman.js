import React from 'react';
import './AboutChairman.css';

const AboutChairman = () => {
  return (
    <div className="about-chairman-page">
      {/* Hero Section */}
      <section className="chairman-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>Chairman of BCFSA</h1>
              <p className="hero-subtitle">Leading Excellence in Skills Training & Child Welfare</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={require('../assets/images/general/bcfsaChairman.jpg')} alt="BCFSA Chairman" />
        </div>
      </section>

      {/* Biography Section */}
      <section className="chairman-biography">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2>About Our Chairman</h2>
              <div className="bio-content">
                <p className="lead">
                  The Chairman of Bago Center for Skills Acquisition and Orphanage Home is a distinguished leader 
                  with a passion for youth empowerment, skills development, and child welfare. Under his visionary 
                  leadership, BCFSA has become a beacon of hope and transformation in Niger State.
                </p>
                
                <h3>Leadership Philosophy</h3>
                <p>
                  Our Chairman believes in the transformative power of education and skills training. His leadership 
                  philosophy centers on creating opportunities for the less privileged, empowering youth with 
                  marketable skills, and providing a safe haven for orphaned and vulnerable children.
                </p>

                <h3>Professional Background</h3>
                <p>
                  With extensive experience in education, community development, and social welfare, the Chairman 
                  brings a wealth of knowledge to BCFSA. His background spans across various sectors including 
                  education administration, youth development programs, and child welfare initiatives.
                </p>

                <h3>Vision for BCFSA</h3>
                <p>
                  Under his leadership, BCFSA has achieved remarkable milestones:
                </p>
                <ul>
                  <li>Establishment of 8 comprehensive skills training programs</li>
                  <li>Development of modern training facilities and equipment</li>
                  <li>Creation of partnerships with government and private organizations</li>
                  <li>Implementation of child welfare and orphanage services</li>
                  <li>Launch of women empowerment and gender-based violence prevention programs</li>
                </ul>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="chairman-profile-card">
                <div className="profile-image">
                  <img src={require('../assets/images/general/bcfsaChairman.jpg')} alt="BCFSA Chairman" />
                </div>
                <div className="profile-info">
                  <h4>Chairman, BCFSA</h4>
                  <p className="title">Board Chairman & Chief Executive</p>
                  <div className="profile-details">
                    <div className="detail-item">
                      <strong>Position:</strong>
                      <span>Board Chairman</span>
                    </div>
                    <div className="detail-item">
                      <strong>Organization:</strong>
                      <span>BCFSA</span>
                    </div>
                    <div className="detail-item">
                      <strong>Focus Areas:</strong>
                      <span>Skills Training, Child Welfare</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="chairman-achievements">
        <div className="container">
          <h2>Leadership Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Youth Empowerment</h3>
              <p>Successfully trained over 1,000 young people in various skills, with 85% employment rate among graduates.</p>
            </div>
            
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3>Orphanage Development</h3>
              <p>Established comprehensive care facilities for orphaned children, providing education, healthcare, and emotional support.</p>
            </div>
            
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Strategic Partnerships</h3>
              <p>Forged partnerships with government agencies, NGOs, and private sector organizations to expand BCFSA's impact.</p>
            </div>
            
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Recognition & Awards</h3>
              <p>Received multiple awards for excellence in community service, youth development, and social impact initiatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="programs-overview">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Programs Under His Leadership</h2>
              <p className="lead">
                The Chairman has overseen the development and implementation of comprehensive programs that address 
                various community needs and empower individuals across different demographics.
              </p>
              <div className="program-highlights">
                <div className="highlight-item">
                  <i className="fas fa-laptop"></i>
                  <span>Computer Training & Digital Literacy</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-cut"></i>
                  <span>Fashion Design & Tailoring</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-utensils"></i>
                  <span>Catering & Food Services</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-gem"></i>
                  <span>Jewelry Making & Crafts</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-child"></i>
                  <span>Orphanage & Child Welfare</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-female"></i>
                  <span>Women Empowerment Programs</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="programs-image">
                <img src={require('../assets/images/general/465A4630.jpg')} alt="BCFSA Programs" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="chairman-quote">
        <div className="container">
          <div className="quote-content">
            <blockquote>
              "Our mission at BCFSA is not just to teach skills, but to transform lives. Every young person who walks 
              through our doors leaves with hope, dignity, and the tools to build a better future for themselves and 
              their communities."
            </blockquote>
            <cite>- Chairman, BCFSA</cite>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="chairman-contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Office of the Chairman</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>BCFSA Complex, Bago, Niger State, Nigeria</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+234 (0) 80X XXX XXXX</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>chairman@bcfsa.org.ng</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h3>Connect with BCFSA</h3>
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
                  <i className="fab fa-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutChairman;
