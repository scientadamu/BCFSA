import React from 'react';
import { Link } from 'react-router-dom';
import './GenderViolenceServices.css';

const GenderViolenceServices = () => {
  return (
    <div className="gender-violence-page">
      <div className="container">
        {/* Hero Section */}
        <div className="gbv-hero">
          <div className="hero-content">
            <h1>Fight Against Gender-Based Violence</h1>
            <p className="hero-subtitle">Protecting Women & Children Through Advocacy, Support & Empowerment</p>
            <p className="hero-description">
              BCFSA is committed to combating gender-based violence through comprehensive support services, 
              advocacy programs, and empowerment initiatives that create safe spaces for survivors and 
              promote gender equality in our communities.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">Get Help Now</Link>
              <Link to="/application?type=trainee" className="btn btn-secondary btn-lg">Join Our Programs</Link>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="emergency-section">
          <div className="emergency-card">
            <h2>🚨 Emergency Support</h2>
            <p>If you or someone you know is in immediate danger, please contact:</p>
            <div className="emergency-contacts">
              <div className="contact-item">
                <strong>24/7 Helpline:</strong> <a href="tel:+2348123456789">+234 812 345 6789</a>
              </div>
              <div className="contact-item">
                <strong>Police Emergency:</strong> <a href="tel:199">199</a>
              </div>
              <div className="contact-item">
                <strong>BCFSA Support:</strong> <a href="tel:+2347098765432">+234 709 876 5432</a>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section">
          <h2>Our Support Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3>Crisis Intervention</h3>
              <p>Immediate support and safety planning for survivors of gender-based violence.</p>
              <ul>
                <li>24/7 crisis hotline</li>
                <li>Emergency shelter referrals</li>
                <li>Safety planning assistance</li>
                <li>Crisis counseling</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">💬</div>
              <h3>Counseling & Therapy</h3>
              <p>Professional psychological support to help survivors heal and rebuild their lives.</p>
              <ul>
                <li>Individual counseling</li>
                <li>Group therapy sessions</li>
                <li>Trauma-informed care</li>
                <li>Family counseling</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">⚖️</div>
              <h3>Legal Support</h3>
              <p>Legal assistance and advocacy to help survivors navigate the justice system.</p>
              <ul>
                <li>Legal consultation</li>
                <li>Court accompaniment</li>
                <li>Restraining order assistance</li>
                <li>Rights education</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Economic Empowerment</h3>
              <p>Skills training and economic opportunities to promote financial independence.</p>
              <ul>
                <li>Vocational training</li>
                <li>Microfinance programs</li>
                <li>Business development</li>
                <li>Job placement assistance</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Safe Housing</h3>
              <p>Temporary and transitional housing options for survivors and their children.</p>
              <ul>
                <li>Emergency shelter</li>
                <li>Transitional housing</li>
                <li>Housing assistance</li>
                <li>Relocation support</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">👥</div>
              <h3>Community Outreach</h3>
              <p>Education and awareness programs to prevent gender-based violence.</p>
              <ul>
                <li>Community workshops</li>
                <li>School programs</li>
                <li>Awareness campaigns</li>
                <li>Advocacy initiatives</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Programs Section */}
        <div className="programs-section">
          <h2>Our Prevention & Support Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <img src={require('../assets/images/general/marriage.jpg')} alt="Women Empowerment" />
              <div className="program-content">
                <h3>Women Empowerment Initiative</h3>
                <p>Comprehensive program focusing on economic empowerment, leadership development, and skills training for women.</p>
                <div className="program-features">
                  <span>6-month program</span>
                  <span>Skills training</span>
                  <span>Leadership development</span>
                </div>
              </div>
            </div>
            <div className="program-card">
              <img src={require('../assets/images/general/465A4630.jpg')} alt="Youth Advocacy" />
              <div className="program-content">
                <h3>Youth Advocacy Program</h3>
                <p>Engaging young people as advocates for gender equality and violence prevention in their communities.</p>
                <div className="program-features">
                  <span>Peer education</span>
                  <span>Community outreach</span>
                  <span>Leadership training</span>
                </div>
              </div>
            </div>
            <div className="program-card">
              <img src={require('../assets/images/general/ProposedOphanageHome.jpg')} alt="Family Support" />
              <div className="program-content">
                <h3>Family Support Services</h3>
                <p>Holistic support for families affected by gender-based violence, including children and extended family members.</p>
                <div className="program-features">
                  <span>Family counseling</span>
                  <span>Child support</span>
                  <span>Parenting programs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Signs Section */}
        <div className="warning-section">
          <h2>Recognizing Warning Signs</h2>
          <div className="warning-content">
            <div className="warning-text">
              <h3>Signs of Gender-Based Violence</h3>
              <div className="warning-categories">
                <div className="warning-category">
                  <h4>Physical Signs</h4>
                  <ul>
                    <li>Unexplained injuries or bruises</li>
                    <li>Frequent "accidents" or injuries</li>
                    <li>Wearing clothing to hide injuries</li>
                    <li>Frequent medical visits</li>
                  </ul>
                </div>
                <div className="warning-category">
                  <h4>Behavioral Signs</h4>
                  <ul>
                    <li>Withdrawal from friends and family</li>
                    <li>Changes in personality or behavior</li>
                    <li>Excessive fear or anxiety</li>
                    <li>Substance abuse</li>
                  </ul>
                </div>
                <div className="warning-category">
                  <h4>Emotional Signs</h4>
                  <ul>
                    <li>Depression or anxiety</li>
                    <li>Low self-esteem</li>
                    <li>Suicidal thoughts</li>
                    <li>Post-traumatic stress</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="warning-image">
              <img src={require('../assets/images/general/genderBaseViolence.jpg')} alt="Support and Care" />
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="impact-stats">
          <h2>Our Impact in Fighting GBV</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Women Supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Children Protected</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Legal Cases Supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Community Members Educated</div>
            </div>
          </div>
        </div>

        {/* Get Help Section */}
        <div className="get-help">
          <h2>How to Get Help</h2>
          <div className="help-options">
            <div className="help-option">
              <h3>📞 Call Our Hotline</h3>
              <p>24/7 confidential support line</p>
              <a href="tel:+2348123456789" className="btn btn-primary">Call Now</a>
            </div>
            <div className="help-option">
              <h3>💬 Online Chat</h3>
              <p>Secure online counseling and support</p>
              <Link to="/contact" className="btn btn-primary">Start Chat</Link>
            </div>
            <div className="help-option">
              <h3>🏢 Visit Our Center</h3>
              <p>In-person support and services</p>
              <Link to="/contact" className="btn btn-primary">Get Directions</Link>
            </div>
            <div className="help-option">
              <h3>📧 Email Support</h3>
              <p>Confidential email assistance</p>
              <a href="mailto:help@bcfsa.org" className="btn btn-primary">Send Email</a>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="safety-tips">
          <h2>Safety Planning Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>🏠 At Home</h3>
              <ul>
                <li>Identify safe rooms with exits</li>
                <li>Keep important documents ready</li>
                <li>Have emergency contacts memorized</li>
                <li>Plan escape routes</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>📱 Technology Safety</h3>
              <ul>
                <li>Use private browsing mode</li>
                <li>Clear browser history</li>
                <li>Use safe devices for help-seeking</li>
                <li>Be aware of location tracking</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>👥 Support Network</h3>
              <ul>
                <li>Identify trusted friends/family</li>
                <li>Share safety plan with trusted person</li>
                <li>Establish code words</li>
                <li>Know community resources</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h2>Join the Fight Against Gender-Based Violence</h2>
          <p>Together, we can create a world free from gender-based violence. Get involved today.</p>
          <div className="cta-buttons">
            <Link to="/application?type=volunteer" className="btn btn-primary btn-lg">Volunteer With Us</Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderViolenceServices;
