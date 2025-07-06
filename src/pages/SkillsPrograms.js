import React from 'react';
import { Link } from 'react-router-dom';
import './SkillsPrograms.css';

const SkillsPrograms = () => {
  const programs = [
    {
      id: 1,
      title: 'Computer Training',
      duration: '3 months',
      image: require('../assets/images/computer/computer.jpg'),
      description: 'Comprehensive computer literacy program covering Microsoft Office, internet usage, and basic programming.',
      modules: ['Microsoft Word', 'Microsoft Excel', 'PowerPoint', 'Internet & Email', 'Basic Programming'],
      certification: 'BCFSA Computer Literacy Certificate',
      employment: '90%'
    },
    {
      id: 2,
      title: 'Fashion Design',
      duration: '6 months',
      image: require('../assets/images/fashion/fashion.jpg'),
      description: 'Complete fashion design and tailoring program from pattern making to finished garments.',
      modules: ['Pattern Making', 'Cutting & Sewing', 'Fashion Design', 'Garment Construction', 'Business Skills'],
      certification: 'BCFSA Fashion Design Certificate',
      employment: '85%'
    },
    {
      id: 3,
      title: 'Catering Services',
      duration: '4 months',
      image: require('../assets/images/general/catering.png'),
      description: 'Professional cooking and catering business training for food service industry.',
      modules: ['Cooking Techniques', 'Food Safety', 'Menu Planning', 'Catering Business', 'Customer Service'],
      certification: 'BCFSA Catering Certificate',
      employment: '88%'
    },
    {
      id: 4,
      title: 'Shoe Cobbling',
      duration: '3 months',
      image: require('../assets/images/sheo/shoe cobbling.PNG'),
      description: 'Traditional and modern shoe making and repair techniques.',
      modules: ['Shoe Design', 'Leather Work', 'Shoe Repair', 'Tool Usage', 'Business Management'],
      certification: 'BCFSA Shoe Making Certificate',
      employment: '80%'
    },
    {
      id: 5,
      title: 'Jewelry Making',
      duration: '2 months',
      image: require('../assets/images/earring/ear ring.PNG'),
      description: 'Creative jewelry design and crafting using various materials and techniques.',
      modules: ['Jewelry Design', 'Beading', 'Wire Work', 'Metalwork', 'Marketing'],
      certification: 'BCFSA Jewelry Making Certificate',
      employment: '75%'
    },
    {
      id: 6,
      title: 'Local Weaving',
      duration: '4 months',
      image: require('../assets/images/weaving/local veaving.PNG'),
      description: 'Traditional weaving techniques and textile production methods.',
      modules: ['Loom Setup', 'Weaving Patterns', 'Textile Design', 'Quality Control', 'Product Marketing'],
      certification: 'BCFSA Weaving Certificate',
      employment: '82%'
    },
    {
      id: 7,
      title: 'Knitting',
      duration: '2 months',
      image: require('../assets/images/knitting/knitting.png'),
      description: 'Modern knitting techniques for creating various textile products.',
      modules: ['Knitting Basics', 'Pattern Reading', 'Product Design', 'Quality Finishing', 'Business Skills'],
      certification: 'BCFSA Knitting Certificate',
      employment: '78%'
    },
    {
      id: 8,
      title: 'Kuli-kuli Production',
      duration: '1 month',
      image: require('../assets/images/kulikuli/kulikuli.PNG'),
      description: 'Groundnut processing and kuli-kuli production for food business.',
      modules: ['Groundnut Processing', 'Production Techniques', 'Packaging', 'Quality Control', 'Business Setup'],
      certification: 'BCFSA Food Production Certificate',
      employment: '85%'
    }
  ];

  return (
    <div className="skills-programs-page">
      {/* Hero Section */}
      <section className="skills-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <h1>Our Skills Acquisition Programs</h1>
            <p className="hero-subtitle">Empowering Youth Through Quality Vocational Training</p>
            <div className="hero-stats">
              <div className="stat-item">
                <h3>8</h3>
                <p>Training Programs</p>
              </div>
              <div className="stat-item">
                <h3>1000+</h3>
                <p>Graduates</p>
              </div>
              <div className="stat-item">
                <h3>85%</h3>
                <p>Employment Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="programs-overview">
        <div className="container">
          <div className="section-header">
            <h2>Transform Your Future with Our Programs</h2>
            <p>Choose from our comprehensive range of skills training programs designed to equip you with marketable skills and entrepreneurial knowledge.</p>
          </div>

          <div className="programs-grid">
            {programs.map((program) => (
              <div key={program.id} className="program-card">
                <div className="program-image">
                  <img src={program.image} alt={program.title} />
                  <div className="program-overlay">
                    <span className="duration">{program.duration}</span>
                  </div>
                </div>
                <div className="program-content">
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  
                  <div className="program-modules">
                    <h4>What You'll Learn:</h4>
                    <ul>
                      {program.modules.slice(0, 3).map((module, index) => (
                        <li key={index}>{module}</li>
                      ))}
                      {program.modules.length > 3 && <li>+ {program.modules.length - 3} more modules</li>}
                    </ul>
                  </div>

                  <div className="program-stats">
                    <div className="stat">
                      <strong>Employment Rate:</strong>
                      <span>{program.employment}</span>
                    </div>
                    <div className="stat">
                      <strong>Certification:</strong>
                      <span>Yes</span>
                    </div>
                  </div>

                  <div className="program-actions">
                    <Link to="/registration" className="btn btn-primary">Apply Now</Link>
                    <button className="btn btn-secondary">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BCFSA */}
      <section className="why-choose-bcfsa">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Why Choose BCFSA for Skills Training?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Expert Instructors</h4>
                    <p>Learn from experienced professionals with industry expertise</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <i className="fas fa-tools"></i>
                  <div>
                    <h4>Modern Equipment</h4>
                    <p>Train with up-to-date tools and technology</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <i className="fas fa-certificate"></i>
                  <div>
                    <h4>Recognized Certification</h4>
                    <p>Receive certificates valued by employers</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <i className="fas fa-briefcase"></i>
                  <div>
                    <h4>Job Placement Support</h4>
                    <p>Get assistance finding employment after graduation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="benefits-image">
                <img src={require('../assets/images/general/465A4630.jpg')} alt="BCFSA Training" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="application-process">
        <div className="container">
          <h2>How to Apply</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Program</h3>
              <p>Select the skills training program that interests you</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Submit Application</h3>
              <p>Fill out our online application form with your details</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Interview</h3>
              <p>Attend a brief interview to assess your readiness</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Start Training</h3>
              <p>Begin your journey to acquiring new skills</p>
            </div>
          </div>
          <div className="cta-section">
            <Link to="/registration" className="btn btn-primary btn-lg">Start Your Application</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsPrograms;
