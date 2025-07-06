import React from 'react';
import { Link } from 'react-router-dom';
import './WomenSupport.css';

const WomenSupport = () => {
  const services = [
    {
      icon: 'fas fa-heart',
      title: 'Professional Matchmaking',
      description: 'Expert matchmaking services to connect divorcees and widows with compatible partners'
    },
    {
      icon: 'fas fa-users',
      title: 'Partner Compatibility Assessment',
      description: 'Comprehensive assessment to ensure compatibility and shared values between potential partners'
    },
    {
      icon: 'fas fa-comments',
      title: 'Relationship Counseling',
      description: 'Pre-marriage counseling and guidance to build strong, healthy relationships'
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Social Events & Meetups',
      description: 'Organized social gatherings and events for natural interaction and connection'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Confidential & Safe Process',
      description: 'Secure, confidential matchmaking process with thorough background verification'
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Ongoing Support',
      description: 'Continuous support throughout the courtship and marriage preparation process'
    }
  ];

  const programs = [
    {
      title: 'Widow Matchmaking Program',
      description: 'Specialized matchmaking services for widows ready to find love again, with emotional support and guidance throughout the process.',
      image: require('../assets/images/general/marriage.jpg'),
      beneficiaries: '300+ widows connected',
      duration: 'Ongoing'
    },
    {
      title: 'Divorcee Partner Connection',
      description: 'Professional matchmaking for divorced women, focusing on compatibility assessment and building healthy relationships.',
      image: require('../assets/images/general/465A4625.jpg'),
      beneficiaries: '150+ successful matches',
      duration: 'Personalized'
    },
    {
      title: 'Relationship Preparation Program',
      description: 'Comprehensive preparation for remarriage including counseling, communication skills, and family integration support.',
      image: require('../assets/images/general/465A4621.jpg'),
      beneficiaries: '200+ couples prepared',
      duration: '3-6 months'
    }
  ];

  const successStories = [
    {
      name: 'Fatima A.',
      story: 'After losing my husband 3 years ago, I thought I would never find love again. BCFSA\'s matchmaking service connected me with a wonderful man who understands my journey. We\'re now happily married and building a beautiful blended family.',
      program: 'Widow Matchmaking Program'
    },
    {
      name: 'Aisha M.',
      story: 'Following my divorce, I was hesitant about relationships. The counselors at BCFSA helped me heal and guided me through their matchmaking process. I found my soulmate and we\'ve been married for 2 years now.',
      program: 'Divorcee Partner Connection'
    },
    {
      name: 'Hauwa S.',
      story: 'The relationship preparation program was invaluable. It helped me and my partner understand each other better and prepare for blending our families. Our marriage is stronger because of the foundation BCFSA helped us build.',
      program: 'Relationship Preparation Program'
    }
  ];

  return (
    <div className="women-support-page">
      {/* Hero Section */}
      <section className="women-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1>Finding Love Again: Divorcees & Widows Matchmaking</h1>
                <p className="hero-subtitle">Connection • Compatibility • Companionship</p>
                <p className="hero-description">
                  BCFSA provides professional matchmaking services specifically for divorced women and widows,
                  helping them find compatible life partners. Our confidential and supportive approach ensures
                  a safe environment for building meaningful relationships and finding love again.
                </p>
                <div className="hero-buttons">
                  <Link to="/registration" className="btn btn-primary">Start Your Journey</Link>
                  <Link to="/contact" className="btn btn-secondary">Learn More</Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="hero-image">
                  <img src={require('../assets/images/general/marriage.jpg')} alt="Women Support" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <div className="section-header">
            <h2>Our Matchmaking Services</h2>
            <p>Professional matchmaking services designed to help divorcees and widows find compatible life partners.</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Matchmaking Programs</h2>
            <p>Specialized programs designed for different stages of the matchmaking and relationship journey.</p>
          </div>

          <div className="programs-grid">
            {programs.map((program, index) => (
              <div key={index} className="program-card">
                <div className="program-image">
                  <img src={program.image} alt={program.title} />
                  <div className="duration-badge">{program.duration}</div>
                </div>
                <div className="program-content">
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <div className="program-stats">
                    <div className="stat">
                      <i className="fas fa-users"></i>
                      <span>{program.beneficiaries}</span>
                    </div>
                  </div>
                  <Link to="/registration" className="btn btn-primary">Apply Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Real stories of transformation and empowerment from women in our programs.</p>
          </div>

          <div className="stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-content">
                  <blockquote>"{story.story}"</blockquote>
                  <div className="story-author">
                    <strong>{story.name}</strong>
                    <span>{story.program}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Process */}
      <section className="support-process">
        <div className="container">
          <h2>Our Matchmaking Process</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Registration & Profile</h3>
              <p>Complete registration with detailed profile creation and personal preferences assessment</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Compatibility Matching</h3>
              <p>Professional assessment and careful matching based on values, interests, and life goals</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Introduction & Meetings</h3>
              <p>Facilitated introductions and guided meetings in safe, comfortable environments</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Relationship Support</h3>
              <p>Ongoing counseling and support throughout courtship and marriage preparation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Empowerment Approach */}
      <section className="empowerment-approach">
        <div className="container">
          <div className="section-header">
            <h2>Our Professional Matchmaking Approach</h2>
            <p>We provide a comprehensive, supportive approach to help divorced women and widows find compatible life partners through professional matchmaking services.</p>
          </div>

          <div className="approach-timeline">
            <div className="timeline-item">
              <div className="timeline-icon">📝</div>
              <div className="timeline-content">
                <h3>Registration & Profile Creation</h3>
                <p>Comprehensive registration process with detailed profile creation to understand preferences, values, and relationship goals.</p>
                <ul>
                  <li>Personal background assessment</li>
                  <li>Relationship preferences and goals</li>
                  <li>Values and lifestyle compatibility</li>
                  <li>Background verification process</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🔍</div>
              <div className="timeline-content">
                <h3>Professional Matching</h3>
                <p>Expert matchmakers use advanced compatibility assessment to identify potential partners who share similar values and life goals.</p>
                <ul>
                  <li>Compatibility analysis and assessment</li>
                  <li>Personality and lifestyle matching</li>
                  <li>Family background consideration</li>
                  <li>Professional and educational compatibility</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">💬</div>
              <div className="timeline-content">
                <h3>Guided Introductions</h3>
                <p>Facilitated introductions and meetings in comfortable, safe environments with ongoing support and guidance.</p>
                <ul>
                  <li>Structured introduction meetings</li>
                  <li>Chaperoned initial interactions</li>
                  <li>Communication guidance and support</li>
                  <li>Relationship development coaching</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">💍</div>
              <div className="timeline-content">
                <h3>Marriage Preparation</h3>
                <p>Comprehensive pre-marriage counseling and preparation to ensure strong foundation for successful marriages.</p>
                <ul>
                  <li>Pre-marriage counseling sessions</li>
                  <li>Family integration support</li>
                  <li>Communication and conflict resolution</li>
                  <li>Wedding planning assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="impact-stats">
        <div className="container">
          <h2>Our Impact & Achievements</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">650+</div>
              <div className="stat-label">Women Registered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">85%</div>
              <div className="stat-label">Successful Matches</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">400+</div>
              <div className="stat-label">Happy Marriages</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Children in Blended Families</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Average Months to Match</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Marriage Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Network */}
      <section className="support-network">
        <div className="container">
          <div className="section-header">
            <h2>Building Strong Support Networks</h2>
            <p>We believe in the power of community and mutual support among women facing similar challenges.</p>
          </div>

          <div className="network-features">
            <div className="network-card">
              <div className="network-icon">👥</div>
              <h3>Peer Support Groups</h3>
              <p>Regular meetings where women share experiences, challenges, and victories in a safe, supportive environment.</p>
              <div className="network-benefits">
                <span>Weekly group sessions</span>
                <span>Experienced facilitators</span>
                <span>Confidential environment</span>
              </div>
            </div>
            <div className="network-card">
              <div className="network-icon">🤝</div>
              <h3>Mentorship Program</h3>
              <p>Pairing new participants with successful program graduates who provide guidance and encouragement.</p>
              <div className="network-benefits">
                <span>One-on-one mentoring</span>
                <span>Success story sharing</span>
                <span>Ongoing support</span>
              </div>
            </div>
            <div className="network-card">
              <div className="network-icon">💼</div>
              <h3>Business Network</h3>
              <p>Connecting women entrepreneurs for collaboration, resource sharing, and mutual business support.</p>
              <div className="network-benefits">
                <span>Business partnerships</span>
                <span>Resource sharing</span>
                <span>Market opportunities</span>
              </div>
            </div>
            <div className="network-card">
              <div className="network-icon">🎉</div>
              <h3>Community Events</h3>
              <p>Regular social events, workshops, and celebrations that strengthen bonds and build lasting friendships.</p>
              <div className="network-benefits">
                <span>Monthly gatherings</span>
                <span>Skill-sharing workshops</span>
                <span>Cultural celebrations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Training Programs */}
      <section className="skills-training">
        <div className="container">
          <div className="section-header">
            <h2>Comprehensive Skills Training</h2>
            <p>Practical skills training programs designed to provide immediate income opportunities and long-term career growth.</p>
          </div>

          <div className="skills-categories">
            <div className="skill-category">
              <h3>🧵 Traditional Crafts</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <strong>Tailoring & Fashion Design</strong>
                  <p>Complete training in garment making, pattern design, and fashion entrepreneurship</p>
                </div>
                <div className="skill-item">
                  <strong>Textile & Weaving</strong>
                  <p>Traditional and modern textile production techniques</p>
                </div>
                <div className="skill-item">
                  <strong>Embroidery & Decoration</strong>
                  <p>Artistic embroidery and fabric decoration skills</p>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>🍳 Culinary Arts</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <strong>Catering & Event Planning</strong>
                  <p>Professional catering services and event management</p>
                </div>
                <div className="skill-item">
                  <strong>Baking & Pastry</strong>
                  <p>Commercial baking and pastry production</p>
                </div>
                <div className="skill-item">
                  <strong>Food Processing</strong>
                  <p>Food preservation and packaging techniques</p>
                </div>
              </div>
            </div>
            <div className="skill-category">
              <h3>💻 Digital Skills</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <strong>Computer Literacy</strong>
                  <p>Basic computer skills and office applications</p>
                </div>
                <div className="skill-item">
                  <strong>Digital Marketing</strong>
                  <p>Online business promotion and social media marketing</p>
                </div>
                <div className="skill-item">
                  <strong>E-commerce</strong>
                  <p>Online selling and digital payment systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="how-to-join">
        <div className="container">
          <div className="section-header">
            <h2>How to Join Our Programs</h2>
            <p>Getting started is easy. We're here to support you every step of the way.</p>
          </div>

          <div className="join-options">
            <div className="join-card">
              <i className="fas fa-phone"></i>
              <h3>Call Us</h3>
              <p>Speak with our support team to discuss your needs and available programs.</p>
              <div className="contact-info">
                <strong>+234-800-WOMEN-1</strong>
              </div>
            </div>
            <div className="join-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Visit Us</h3>
              <p>Come to our center for a personal consultation and program enrollment.</p>
              <Link to="/contact" className="btn btn-primary">Get Directions</Link>
            </div>
            <div className="join-card">
              <i className="fas fa-laptop"></i>
              <h3>Apply Online</h3>
              <p>Fill out our online application form to get started with our programs.</p>
              <Link to="/registration" className="btn btn-primary">Apply Now</Link>
            </div>
            <div className="join-card">
              <i className="fas fa-comments"></i>
              <h3>WhatsApp Support</h3>
              <p>Get quick answers and support through our WhatsApp helpline.</p>
              <div className="contact-info">
                <strong>+234-900-HELP-NOW</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>You Are Not Alone</h2>
            <p>Join our community of strong, empowered women who support each other through life's challenges and celebrate each other's successes.</p>
            <div className="cta-buttons">
              <Link to="/registration" className="btn btn-primary btn-lg">Join Our Community</Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomenSupport;
