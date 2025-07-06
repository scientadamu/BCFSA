import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 'gender-violence',
      title: 'Gender-Based Violence Prevention & Support',
      description: 'Comprehensive support services, advocacy programs, and empowerment initiatives to combat gender-based violence in our communities.',
      image: require('../assets/images/general/genderBaseViolence.jpg'),
      features: [
        '24/7 Crisis Support Hotline',
        'Professional Counseling Services',
        'Legal Assistance & Advocacy',
        'Safe Housing & Shelter',
        'Economic Empowerment Programs',
        'Community Awareness Campaigns'
      ],
      beneficiaries: '500+ Women & Children Supported',
      link: '/gender-violence-services',
      color: '#e74c3c'
    },
    {
      id: 'women-support',
      title: 'Divorcees & Widows Matchmaking Support',
      description: 'Specialized matchmaking and support services for divorced women and widows, helping them find compatible partners while providing comprehensive emotional and social support.',
      image: require('../assets/images/general/marriage.jpg'),
      features: [
        'Professional Matchmaking Services',
        'Partner Compatibility Assessment',
        'Emotional Support & Counseling',
        'Pre-Marriage Guidance & Preparation',
        'Community Events & Social Gatherings',
        'Confidential Partner Introduction'
      ],
      beneficiaries: '650+ Women Connected',
      link: '/women-support',
      color: '#e91e63'
    },
    {
      id: 'orphanage',
      title: 'Orphanage & Child Care Services',
      description: 'Comprehensive care and support for orphaned and vulnerable children, providing education, healthcare, and nurturing environment.',
      image: require('../assets/images/general/ProposedOphanageHome.jpg'),
      features: [
        'Safe Housing & Accommodation',
        'Quality Education Programs',
        'Healthcare & Nutrition',
        'Psychological Support',
        'Life Skills Development',
        'Recreational Activities'
      ],
      beneficiaries: '150+ Children in Care',
      link: '/orphanage-services',
      color: '#8e44ad'
    }
  ];

  return (
    <div className="services-page">
      <div className="container">
        {/* Hero Section */}
        <div className="services-hero">
          <h1>Our Support Services</h1>
          <p className="hero-subtitle">Comprehensive Support for Vulnerable Communities</p>
          <p className="hero-description">
            At BCFSA, we provide essential support services that address the critical needs of vulnerable 
            populations in Niger State. Our services go beyond training to offer comprehensive care, 
            protection, and empowerment for those who need it most.
          </p>
        </div>

        {/* Services Overview */}
        <div className="services-overview">
          <h2>Our Core Support Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card" style={{'--service-color': service.color}}>
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-overlay">
                    <Link to={service.link} className="service-link">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  
                  <div className="service-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="service-impact">
                    <div className="impact-badge">
                      <strong>{service.beneficiaries}</strong>
                    </div>
                  </div>
                  
                  <div className="service-actions">
                    <Link to={service.link} className="btn btn-primary">
                      Access Service
                    </Link>
                    <Link to="/contact" className="btn btn-secondary">
                      Get Support
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <div className="emergency-support">
          <div className="emergency-content">
            <h2>🚨 Need Immediate Help?</h2>
            <p>If you or someone you know is in crisis or needs immediate support, don't hesitate to reach out.</p>
            <div className="emergency-contacts">
              <div className="emergency-item">
                <h3>24/7 Crisis Hotline</h3>
                <a href="tel:+2348123456789" className="emergency-number">+234 812 345 6789</a>
              </div>
              <div className="emergency-item">
                <h3>WhatsApp Support</h3>
                <a href="https://wa.me/2349087654321" className="emergency-number">+234 908 765 4321</a>
              </div>
              <div className="emergency-item">
                <h3>Email Support</h3>
                <a href="mailto:help@bcfsa.org" className="emergency-number">help@bcfsa.org</a>
              </div>
            </div>
          </div>
        </div>

        {/* How We Help */}
        <div className="how-we-help">
          <h2>How We Provide Support</h2>
          <div className="help-process">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Initial Contact</h3>
              <p>Reach out through any of our contact channels for immediate response and support.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Assessment</h3>
              <p>We assess your specific needs and circumstances to provide the most appropriate support.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Support Plan</h3>
              <p>We develop a personalized support plan tailored to your unique situation and goals.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Ongoing Care</h3>
              <p>We provide continuous support and follow-up to ensure your long-term wellbeing and success.</p>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="services-impact">
          <h2>Our Collective Impact</h2>
          <div className="impact-stats">
            <div className="stat-item">
              <div className="stat-number">1,300+</div>
              <div className="stat-label">Lives Transformed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Core Services</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Confidential Care</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="services-cta">
          <h2>Ready to Get Support?</h2>
          <p>Don't wait - help is available now. Reach out to us through any of our services.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary btn-lg">Contact Us Now</Link>
            <a href="tel:+2348123456789" className="btn btn-secondary btn-lg">Call Emergency Line</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
