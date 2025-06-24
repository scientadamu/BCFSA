import React from 'react';
import { Link } from 'react-router-dom';
import './ProgramsSection.css';

const ProgramsSection = () => {
  const programs = [
    {
      id: 1,
      title: 'Computer Training',
      description: 'Learn essential computer skills including Microsoft Office, internet usage, and basic programming.',
      image: require('../assets/images/computer/computer.jpg'),
      duration: '3 months',
      level: 'Beginner to Intermediate'
    },
    {
      id: 2,
      title: 'Fashion Design',
      description: 'Master the art of fashion design, pattern making, and garment construction.',
      image: require('../assets/images/fashion/fashion.jpg'),
      duration: '6 months',
      level: 'Beginner to Advanced'
    },
    {
      id: 3,
      title: 'Catering Services',
      description: 'Professional cooking, food preparation, and catering business management.',
      image: require('../assets/images/general/catering.png'),
      duration: '4 months',
      level: 'Beginner to Professional'
    },
    {
      id: 4,
      title: 'Shoe Cobbling',
      description: 'Learn shoe repair, maintenance, and basic shoe making techniques.',
      image: require('../assets/images/sheo/shoe cobbling.PNG'),
      duration: '2 months',
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'Jewelry Making',
      description: 'Create beautiful jewelry pieces and learn business skills for jewelry trade.',
      image: require('../assets/images/earring/ear ring.PNG'),
      duration: '3 months',
      level: 'Beginner to Intermediate'
    },
    {
      id: 6,
      title: 'Local Weaving',
      description: 'Traditional weaving techniques and modern applications for textile production.',
      image: require('../assets/images/weaving/local veaving.PNG'),
      duration: '4 months',
      level: 'Beginner to Advanced'
    },
    {
      id: 7,
      title: 'Knitting',
      description: 'Learn modern knitting techniques to create fashionable clothing and accessories.',
      image: require('../assets/images/knitting/knitting.png'),
      duration: '3 months',
      level: 'Beginner to Intermediate'
    },
    {
      id: 8,
      title: 'Kuli-kuli Production',
      description: 'Master the art of kuli-kuli production for entrepreneurship and food processing.',
      image: require('../assets/images/kulikuli/kulikuli.PNG'),
      duration: '2 months',
      level: 'Beginner'
    }
  ];

  return (
    <section className="programs-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Training Programs</h2>
          <p>Choose from our comprehensive range of skill development programs designed to prepare you for the job market</p>
        </div>
        
        <div className="programs-grid">
          {programs.map(program => (
            <div key={program.id} className="program-card">
              <div className="program-image">
                <img src={program.image} alt={program.title} />
                <div className="program-overlay">
                  <Link to="/registration" className="btn btn-primary">Register Now</Link>
                </div>
              </div>
              <div className="program-content">
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className="program-details">
                  <span className="duration">Duration: {program.duration}</span>
                  <span className="level">Level: {program.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="programs-footer">
          <Link to="/programs" className="btn btn-secondary">View All Programs</Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
