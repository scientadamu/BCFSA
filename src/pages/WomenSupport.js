import React from 'react';
import { Link } from 'react-router-dom';
import './WomenSupport.css';

const WomenSupport = () => {
  const services = [
    {
      icon: 'fas fa-heart',
      title: 'Emotional Support',
      description: 'Counseling and peer support groups for healing and emotional wellbeing'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Skills Training',
      description: 'Vocational training programs to develop marketable skills and independence'
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Economic Empowerment',
      description: 'Microfinance, business training, and entrepreneurship support'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Building',
      description: 'Creating supportive networks and communities for mutual support'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Legal Support',
      description: 'Legal advice and assistance for rights protection and advocacy'
    },
    {
      icon: 'fas fa-child',
      title: 'Childcare Support',
      description: 'Childcare services and parenting support for single mothers'
    }
  ];

  const programs = [
    {
      title: 'Widow Empowerment Program',
      description: 'Comprehensive support for widows including counseling, skills training, and economic empowerment.',
      image: require('../assets/images/general/marriage.jpg'),
      beneficiaries: '300+ widows supported',
      duration: '6 months'
    },
    {
      title: 'Divorcee Rehabilitation',
      description: 'Helping divorced women rebuild their lives through education, training, and emotional support.',
      image: require('../assets/images/general/465A4625.jpg'),
      beneficiaries: '150+ women helped',
      duration: '4 months'
    },
    {
      title: 'Single Mother Support',
      description: 'Specialized programs for single mothers including childcare, training, and financial assistance.',
      image: require('../assets/images/general/465A4621.jpg'),
      beneficiaries: '200+ mothers assisted',
      duration: 'Ongoing'
    }
  ];

  const successStories = [
    {
      name: 'Fatima A.',
      story: 'After losing my husband, I felt lost and hopeless. BCFSA helped me learn tailoring skills and start my own business. Now I can support my children and feel confident about our future.',
      program: 'Widow Empowerment Program'
    },
    {
      name: 'Aisha M.',
      story: 'The divorce left me with nothing. Through BCFSA\'s support, I learned computer skills and now work as a data entry clerk. I\'ve regained my independence and self-worth.',
      program: 'Divorcee Rehabilitation'
    },
    {
      name: 'Hauwa S.',
      story: 'As a single mother, I struggled to provide for my children. The microfinance program helped me start a small business, and now my children can go to school.',
      program: 'Single Mother Support'
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
                <h1>Uniting Divorcees and Widows</h1>
                <p className="hero-subtitle">Support • Empowerment • Community</p>
                <p className="hero-description">
                  BCFSA provides comprehensive support for divorced women and widows, helping them rebuild their 
                  lives with dignity, independence, and hope. Through our programs, we create a supportive 
                  community where women can heal, learn, and thrive.
                </p>
                <div className="hero-buttons">
                  <Link to="/registration" className="btn btn-primary">Join Our Program</Link>
                  <Link to="/contact" className="btn btn-secondary">Get Support</Link>
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
            <h2>Our Support Services</h2>
            <p>Comprehensive services designed to help women rebuild their lives and achieve independence.</p>
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
            <h2>Our Programs</h2>
            <p>Tailored programs addressing the specific needs of different groups of women.</p>
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
          <h2>How We Support You</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Initial Assessment</h3>
              <p>We assess your needs and circumstances to create a personalized support plan</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Counseling & Support</h3>
              <p>Professional counseling and peer support to help with emotional healing</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Skills Training</h3>
              <p>Vocational training in marketable skills for economic independence</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Economic Empowerment</h3>
              <p>Business training, microfinance, and ongoing support for sustainability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Empowerment Approach */}
      <section className="empowerment-approach">
        <div className="container">
          <div className="section-header">
            <h2>Our Holistic Empowerment Approach</h2>
            <p>We address the multifaceted challenges faced by divorced women and widows through comprehensive support systems.</p>
          </div>

          <div className="approach-timeline">
            <div className="timeline-item">
              <div className="timeline-icon">🤝</div>
              <div className="timeline-content">
                <h3>Initial Support & Assessment</h3>
                <p>Immediate emotional support and comprehensive needs assessment to understand each woman's unique situation and challenges.</p>
                <ul>
                  <li>Crisis counseling and emotional support</li>
                  <li>Needs assessment and goal setting</li>
                  <li>Legal rights education</li>
                  <li>Emergency assistance if needed</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">💪</div>
              <div className="timeline-content">
                <h3>Healing & Rebuilding</h3>
                <p>Focused on emotional healing, building self-confidence, and developing new life skills for independence.</p>
                <ul>
                  <li>Individual and group therapy sessions</li>
                  <li>Self-esteem and confidence building</li>
                  <li>Peer support groups</li>
                  <li>Life skills training</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🎓</div>
              <div className="timeline-content">
                <h3>Skills Development</h3>
                <p>Comprehensive vocational training and education to develop marketable skills for economic independence.</p>
                <ul>
                  <li>Vocational skills training</li>
                  <li>Digital literacy programs</li>
                  <li>Business and entrepreneurship training</li>
                  <li>Financial literacy education</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🚀</div>
              <div className="timeline-content">
                <h3>Economic Empowerment</h3>
                <p>Supporting women to achieve financial independence through business development and employment opportunities.</p>
                <ul>
                  <li>Microfinance and loan programs</li>
                  <li>Business mentorship and support</li>
                  <li>Job placement assistance</li>
                  <li>Ongoing business coaching</li>
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
              <div className="stat-label">Women Empowered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">85%</div>
              <div className="stat-label">Achieved Independence</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Children Benefited</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Businesses Started</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">₦25M+</div>
              <div className="stat-label">Loans Disbursed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Loan Repayment Rate</div>
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
