import React from 'react';
import { Link } from 'react-router-dom';
import './FightGBV.css';

const FightGBV = () => {
  const services = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Protection Services',
      description: 'Safe houses and emergency shelter for survivors of gender-based violence'
    },
    {
      icon: 'fas fa-user-md',
      title: 'Medical Support',
      description: 'Immediate medical care and ongoing health support for survivors'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Legal Aid',
      description: 'Free legal consultation and representation for survivors seeking justice'
    },
    {
      icon: 'fas fa-comments',
      title: 'Counseling',
      description: 'Professional psychological support and trauma counseling services'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Education & Training',
      description: 'Skills training and educational opportunities for economic empowerment'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Advocacy',
      description: 'Community awareness campaigns and policy advocacy for prevention'
    }
  ];

  const programs = [
    {
      title: 'Survivor Support Program',
      description: 'Comprehensive support services for survivors including counseling, legal aid, and rehabilitation.',
      image: require('../assets/images/general/genderBaseViolence.jpg'),
      beneficiaries: '200+ women supported'
    },
    {
      title: 'Community Awareness Campaign',
      description: 'Educational programs in schools and communities to prevent gender-based violence.',
      image: require('../assets/images/general/genderBaseViolence2.jpg'),
      beneficiaries: '5,000+ people reached'
    },
    {
      title: 'Economic Empowerment',
      description: 'Skills training and microfinance programs to help survivors achieve financial independence.',
      image: require('../assets/images/general/465A4630.jpg'),
      beneficiaries: '150+ women trained'
    }
  ];

  return (
    <div className="fight-gbv-page">
      {/* Hero Section */}
      <section className="gbv-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1>Fight Against Gender-Based Violence</h1>
                <p className="hero-subtitle">Protecting Women & Children, Building Safer Communities</p>
                <p className="hero-description">
                  BCFSA is committed to combating gender-based violence through comprehensive support services, 
                  community education, and advocacy. We stand with survivors and work tirelessly to create 
                  a society free from violence and discrimination.
                </p>
                <div className="hero-buttons">
                  <Link to="/contact" className="btn btn-primary">Get Help Now</Link>
                  <Link to="/contact" className="btn btn-secondary">Report Violence</Link>
                </div>
                <div className="emergency-contact">
                  <i className="fas fa-phone"></i>
                  <span>Emergency Hotline: <strong>080-HELP-NOW</strong></span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="hero-image">
                  <img src={require('../assets/images/general/genderBaseViolence.jpg')} alt="Fight Against GBV" />
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
            <p>We provide comprehensive support to survivors and work to prevent gender-based violence in our communities.</p>
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
            <p>Comprehensive programs designed to support survivors and prevent gender-based violence.</p>
          </div>

          <div className="programs-grid">
            {programs.map((program, index) => (
              <div key={index} className="program-card">
                <div className="program-image">
                  <img src={program.image} alt={program.title} />
                </div>
                <div className="program-content">
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <div className="program-impact">
                    <i className="fas fa-users"></i>
                    <span>{program.beneficiaries}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="warning-signs">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>Recognize the Warning Signs</h2>
              <p className="lead">
                It's important to recognize the signs of gender-based violence to help protect yourself and others.
              </p>
              <div className="signs-list">
                <div className="sign-item">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>Physical injuries that can't be explained</span>
                </div>
                <div className="sign-item">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>Isolation from friends and family</span>
                </div>
                <div className="sign-item">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>Extreme jealousy or controlling behavior</span>
                </div>
                <div className="sign-item">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>Fear of partner or family member</span>
                </div>
                <div className="sign-item">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>Sudden changes in behavior or personality</span>
                </div>
                <div className="sign-item">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>Limited access to money or resources</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="warning-image">
                <img src={require('../assets/images/general/genderBaseViolence2.jpg')} alt="Warning Signs" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="impact-stats">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Survivors Supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">People Educated</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Communities Reached</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Help */}
      <section className="get-help">
        <div className="container">
          <div className="section-header">
            <h2>How to Get Help</h2>
            <p>If you or someone you know is experiencing gender-based violence, help is available.</p>
          </div>

          <div className="help-options">
            <div className="help-card urgent">
              <i className="fas fa-phone-alt"></i>
              <h3>Emergency</h3>
              <p>If you are in immediate danger, call our emergency hotline.</p>
              <div className="contact-info">
                <strong>080-HELP-NOW</strong>
              </div>
            </div>
            <div className="help-card">
              <i className="fas fa-comments"></i>
              <h3>Counseling</h3>
              <p>Free confidential counseling services available.</p>
              <Link to="/contact" className="btn btn-primary">Schedule Session</Link>
            </div>
            <div className="help-card">
              <i className="fas fa-balance-scale"></i>
              <h3>Legal Support</h3>
              <p>Free legal consultation and representation.</p>
              <Link to="/contact" className="btn btn-primary">Get Legal Help</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="prevention-tips">
        <div className="container">
          <h2>Prevention & Safety Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Personal Safety</h3>
              <ul>
                <li>Trust your instincts</li>
                <li>Have a safety plan</li>
                <li>Keep important documents safe</li>
                <li>Maintain support networks</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>Community Action</h3>
              <ul>
                <li>Speak out against violence</li>
                <li>Support survivors</li>
                <li>Educate others</li>
                <li>Advocate for policy change</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>For Supporters</h3>
              <ul>
                <li>Listen without judgment</li>
                <li>Believe survivors</li>
                <li>Respect their decisions</li>
                <li>Connect them to resources</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Together We Can End Gender-Based Violence</h2>
            <p>Join our mission to create safe communities where everyone can live free from violence and fear.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">Get Involved</Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">Donate</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FightGBV;
