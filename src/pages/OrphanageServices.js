import React from 'react';
import { Link } from 'react-router-dom';
import './OrphanageServices.css';

const OrphanageServices = () => {
  const services = [
    {
      icon: 'fas fa-home',
      title: 'Safe Housing',
      description: 'Comfortable and secure accommodation for orphaned and vulnerable children'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Quality Education',
      description: 'Access to primary and secondary education with academic support'
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Healthcare',
      description: 'Regular medical checkups, vaccinations, and emergency healthcare'
    },
    {
      icon: 'fas fa-utensils',
      title: 'Nutrition',
      description: 'Balanced meals and proper nutrition for healthy growth and development'
    },
    {
      icon: 'fas fa-users',
      title: 'Counseling',
      description: 'Psychological support and counseling services for emotional wellbeing'
    },
    {
      icon: 'fas fa-gamepad',
      title: 'Recreation',
      description: 'Sports, games, and recreational activities for holistic development'
    }
  ];

  const programs = [
    {
      title: 'Early Childhood Development',
      age: '0-5 years',
      description: 'Specialized care for infants and toddlers with focus on early development milestones.',
      image: require('../assets/images/general/465A4615.jpg')
    },
    {
      title: 'Primary Education Support',
      age: '6-12 years',
      description: 'Educational support and tutoring to ensure academic success in primary school.',
      image: require('../assets/images/general/465A4621.jpg')
    },
    {
      title: 'Teenage Mentorship',
      age: '13-18 years',
      description: 'Guidance and mentorship programs to help teenagers navigate adolescence.',
      image: require('../assets/images/general/465A4625.jpg')
    },
    {
      title: 'Skills Training',
      age: '16+ years',
      description: 'Vocational training to prepare older children for independent living.',
      image: require('../assets/images/general/465A4630.jpg')
    }
  ];

  return (
    <div className="orphanage-services-page">
      {/* Hero Section */}
      <section className="orphanage-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1>Our Orphanage Services</h1>
                <p className="hero-subtitle">Providing Love, Care, and Hope for Vulnerable Children</p>
                <p className="hero-description">
                  At BCFSA, we believe every child deserves a loving home, quality education, and the opportunity 
                  to reach their full potential. Our orphanage services provide comprehensive care for orphaned 
                  and vulnerable children in Niger State.
                </p>
                <div className="hero-buttons">
                  <Link to="/contact" className="btn btn-primary">Support Our Mission</Link>
                  <Link to="/about" className="btn btn-secondary">Learn More</Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="hero-image">
                  <img src={require('../assets/images/general/ProposedOphanageHome.jpg')} alt="BCFSA Orphanage" />
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
            <h2>Comprehensive Care Services</h2>
            <p>We provide holistic care that addresses all aspects of a child's development and wellbeing.</p>
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

      {/* Age-Based Programs */}
      <section className="age-programs">
        <div className="container">
          <div className="section-header">
            <h2>Age-Appropriate Programs</h2>
            <p>Our programs are tailored to meet the specific needs of children at different stages of development.</p>
          </div>

          <div className="programs-grid">
            {programs.map((program, index) => (
              <div key={index} className="program-card">
                <div className="program-image">
                  <img src={program.image} alt={program.title} />
                  <div className="age-badge">{program.age}</div>
                </div>
                <div className="program-content">
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Our Facilities</h2>
              <p className="lead">
                Our proposed orphanage facility is designed to provide a warm, safe, and nurturing environment 
                that feels like home for every child in our care.
              </p>
              <div className="facilities-list">
                <div className="facility-item">
                  <i className="fas fa-bed"></i>
                  <span>Comfortable dormitories with modern amenities</span>
                </div>
                <div className="facility-item">
                  <i className="fas fa-book"></i>
                  <span>Well-equipped library and study areas</span>
                </div>
                <div className="facility-item">
                  <i className="fas fa-running"></i>
                  <span>Sports facilities and playground</span>
                </div>
                <div className="facility-item">
                  <i className="fas fa-hospital"></i>
                  <span>On-site medical clinic</span>
                </div>
                <div className="facility-item">
                  <i className="fas fa-utensils"></i>
                  <span>Modern kitchen and dining facilities</span>
                </div>
                <div className="facility-item">
                  <i className="fas fa-laptop"></i>
                  <span>Computer lab and internet access</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="facilities-image">
                <img src={require('../assets/images/general/ProposedOphanageHome.jpg')} alt="Orphanage Facilities" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Information */}
      <section className="project-info">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>₦2.5 Billion Orphanage Project</h2>
              <p className="lead">
                Our ambitious orphanage project represents a significant investment in the future of Niger State's
                most vulnerable children. This state-of-the-art facility will provide world-class care and education.
              </p>
              <div className="project-features">
                <div className="feature-highlight">
                  <h4>🏗️ Modern Infrastructure</h4>
                  <p>Contemporary buildings designed with children's safety and comfort in mind</p>
                </div>
                <div className="feature-highlight">
                  <h4>🎓 Educational Excellence</h4>
                  <p>On-site schools from nursery to secondary level with qualified teachers</p>
                </div>
                <div className="feature-highlight">
                  <h4>🏥 Healthcare Facilities</h4>
                  <p>Fully equipped medical center with 24/7 healthcare professionals</p>
                </div>
                <div className="feature-highlight">
                  <h4>🌟 Holistic Development</h4>
                  <p>Sports, arts, and recreational facilities for complete child development</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="project-image">
                <img src={require('../assets/images/general/ProposedOphanageHome.jpg')} alt="Proposed Orphanage" />
                <div className="project-badge">
                  <span>₦2.5B Investment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="impact-stats">
        <div className="container">
          <h2>Our Current Impact & Future Goals</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">150+</div>
              <div className="stat-label">Children Currently Served</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Projected Capacity</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">School Enrollment Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Care & Support</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Love & Dedication</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Staff Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Approach */}
      <section className="care-approach">
        <div className="container">
          <div className="section-header">
            <h2>Our Comprehensive Care Approach</h2>
            <p>We believe in nurturing the whole child - mind, body, and spirit - through evidence-based care practices.</p>
          </div>

          <div className="approach-grid">
            <div className="approach-card">
              <div className="approach-icon">🧠</div>
              <h3>Psychological Wellbeing</h3>
              <p>Professional counseling and therapy services to help children process trauma and build resilience.</p>
              <ul>
                <li>Individual therapy sessions</li>
                <li>Group counseling programs</li>
                <li>Trauma-informed care practices</li>
                <li>Mental health monitoring</li>
              </ul>
            </div>
            <div className="approach-card">
              <div className="approach-icon">📚</div>
              <h3>Educational Excellence</h3>
              <p>Quality education tailored to each child's needs and learning style for academic success.</p>
              <ul>
                <li>Personalized learning plans</li>
                <li>Extra tutoring support</li>
                <li>STEM and arts programs</li>
                <li>University preparation</li>
              </ul>
            </div>
            <div className="approach-card">
              <div className="approach-icon">💪</div>
              <h3>Physical Health</h3>
              <p>Comprehensive healthcare ensuring children grow strong and healthy.</p>
              <ul>
                <li>Regular health checkups</li>
                <li>Nutritional programs</li>
                <li>Sports and fitness activities</li>
                <li>Preventive healthcare</li>
              </ul>
            </div>
            <div className="approach-card">
              <div className="approach-icon">🤝</div>
              <h3>Social Development</h3>
              <p>Building social skills and relationships for successful community integration.</p>
              <ul>
                <li>Peer interaction programs</li>
                <li>Community engagement</li>
                <li>Leadership development</li>
                <li>Cultural activities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Meet some of the amazing children whose lives have been transformed through our care.</p>
          </div>

          <div className="stories-grid">
            <div className="story-card">
              <div className="story-content">
                <h4>Ahmed's Journey</h4>
                <p>"I came to BCFSA when I was 8 years old. Now I'm 16 and preparing for university. The staff here became my family and helped me discover my love for science."</p>
                <div className="story-achievement">
                  <strong>Achievement:</strong> Top student in state science competition
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-content">
                <h4>Fatima's Dream</h4>
                <p>"Thanks to BCFSA, I learned to read and write. Now I help teach younger children and dream of becoming a teacher myself."</p>
                <div className="story-achievement">
                  <strong>Achievement:</strong> Literacy mentor for younger children
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-content">
                <h4>Ibrahim's Talent</h4>
                <p>"The art program at BCFSA helped me discover my artistic talents. My paintings have been displayed in local exhibitions."</p>
                <div className="story-achievement">
                  <strong>Achievement:</strong> Young artist recognition award
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section className="how-to-help">
        <div className="container">
          <div className="section-header">
            <h2>How You Can Help</h2>
            <p>There are many ways you can support our mission to care for vulnerable children.</p>
          </div>

          <div className="help-options">
            <div className="help-card">
              <i className="fas fa-heart"></i>
              <h3>Donate</h3>
              <p>Your financial contributions help us provide food, shelter, education, and healthcare.</p>
              <div className="donation-amounts">
                <span>₦5,000/month feeds a child</span>
                <span>₦20,000/month sponsors education</span>
              </div>
              <Link to="/contact" className="btn btn-primary">Donate Now</Link>
            </div>
            <div className="help-card">
              <i className="fas fa-hands-helping"></i>
              <h3>Volunteer</h3>
              <p>Share your time and skills to make a direct impact in the lives of our children.</p>
              <div className="volunteer-roles">
                <span>Teaching & Tutoring</span>
                <span>Healthcare Support</span>
                <span>Recreation Activities</span>
              </div>
              <Link to="/contact" className="btn btn-primary">Volunteer</Link>
            </div>
            <div className="help-card">
              <i className="fas fa-gift"></i>
              <h3>Sponsor a Child</h3>
              <p>Provide ongoing support for a specific child's education and development.</p>
              <div className="sponsorship-benefits">
                <span>Regular updates on progress</span>
                <span>Direct communication</span>
              </div>
              <Link to="/contact" className="btn btn-primary">Sponsor</Link>
            </div>
            <div className="help-card">
              <i className="fas fa-building"></i>
              <h3>Corporate Partnership</h3>
              <p>Partner with us to make a larger impact through corporate social responsibility.</p>
              <div className="partnership-options">
                <span>Facility sponsorship</span>
                <span>Program funding</span>
              </div>
              <Link to="/contact" className="btn btn-primary">Partner</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Every Child Deserves a Chance</h2>
            <p>Join us in our mission to provide love, care, and opportunities for vulnerable children in Niger State.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">Get Involved</Link>
              <Link to="/about" className="btn btn-secondary btn-lg">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrphanageServices;
