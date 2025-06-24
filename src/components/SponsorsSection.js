import React from 'react';
import './SponsorsSection.css';

const SponsorsSection = () => {
  const sponsors = [
    {
      id: 1,
      name: 'Ministry of Labour',
      type: 'Government Partner',
      image: require('../assets/images/general/ministry of labour.PNG'),
      description: 'Supporting youth employment and skills development initiatives',
      level: 'primary'
    },
    {
      id: 2,
      name: 'Controller, Ministry of Labour',
      type: 'Government Official',
      image: require('../assets/images/general/Controler, Ministry of Labour.PNG'),
      description: 'Overseeing program implementation and quality assurance',
      level: 'primary'
    },
    {
      id: 3,
      name: 'Emir of Agaie',
      type: 'Traditional Authority',
      image: require('../assets/images/general/emre of Agaie.jpg'),
      description: 'Providing traditional leadership support and community endorsement',
      level: 'secondary'
    }
  ];

  const partnerships = [
    {
      title: 'Government Partnerships',
      description: 'Working closely with government agencies to align our programs with national development goals',
      icon: '🏛️'
    },
    {
      title: 'Community Support',
      description: 'Strong backing from traditional rulers and community leaders for sustainable impact',
      icon: '🤝'
    },
    {
      title: 'Industry Collaboration',
      description: 'Partnerships with local businesses to ensure job placement for our graduates',
      icon: '🏭'
    },
    {
      title: 'International Support',
      description: 'Collaboration with international organizations for best practices and funding',
      icon: '🌍'
    }
  ];

  return (
    <section className="sponsors-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Partners & Supporters</h2>
          <p>We are grateful for the support of our partners who make our mission possible</p>
        </div>

        <div className="sponsors-grid">
          {sponsors.map(sponsor => (
            <div key={sponsor.id} className={`sponsor-card ${sponsor.level}`}>
              <div className="sponsor-image">
                <img src={sponsor.image} alt={sponsor.name} />
              </div>
              <div className="sponsor-content">
                <h3>{sponsor.name}</h3>
                <span className="sponsor-type">{sponsor.type}</span>
                <p>{sponsor.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="partnerships-section">
          <h3>Partnership Areas</h3>
          <div className="partnerships-grid">
            {partnerships.map((partnership, index) => (
              <div key={index} className="partnership-card">
                <div className="partnership-icon">{partnership.icon}</div>
                <h4>{partnership.title}</h4>
                <p>{partnership.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sponsor-cta">
          <h3>Become a Partner</h3>
          <p>Join us in empowering youth and building a skilled workforce for the future</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Partner With Us</a>
            <a href="/contact" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
