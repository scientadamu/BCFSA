import React from 'react';
import './TrainersSection.css';

const TrainersSection = () => {
  const trainers = [
    {
      id: 1,
      name: 'Mr. Lawal Abubakar',
      program: 'Executive Director',
      image: require('../assets/images/general/DirectorBCFSA.jpg'),
      specialization: 'Educational Leadership, Strategic Planning, Youth Development',
      experience: '8+ years',
      description: 'Executive Director overseeing all BCFSA operations and strategic initiatives'
    },
    {
      id: 2,
      name: 'Mr. Nuhu Abubakar',
      program: 'Chief Auditor',
      image: require('../assets/images/general/465A4605.jpg'),
      specialization: 'Financial Management, Compliance, Risk Assessment',
      experience: '6+ years',
      description: 'Chief Auditor ensuring financial transparency and operational compliance'
    },
    {
      id: 3,
      name: 'Mr. Adamu Abubakar',
      program: 'Administrative Secretary',
      image: require('../assets/images/computer/trainers/computerTrainer1.PNG'),
      specialization: 'Administration, Computer Training, Office Management',
      experience: '3+ years',
      description: 'Administrative Secretary and Computer Training Instructor'
    },
    {
      id: 4,
      name: 'Computer Instructor',
      program: 'Computer Training',
      image: require('../assets/images/computer/trainers/computerTrainer2.PNG'),
      specialization: 'Administration, Computer Training, Office Management',
      experience: '3+ years',
      description: 'Administrative Secretary and Computer Training Instructor'
    },
    {
      id: 5,
      name: 'Fashion Design Master',
      program: 'Fashion Design',
      image: require('../assets/images/fashion/trainers/FashionTrainer1.PNG'),
      specialization: 'Pattern Making, Garment Construction, Design',
      experience: '8+ years',
      description: 'Professional fashion designer with extensive industry experience'
    },
    {
      id: 6,
      name: 'Fashion Design Specialist',
      program: 'Fashion Design',
      image: require('../assets/images/fashion/trainers/fashionTrsiner2.PNG'),
      specialization: 'Tailoring, Embroidery, Fashion Business',
      experience: '6+ years',
      description: 'Expert in traditional and modern fashion techniques'
    },
    {
      id: 7,
      name: 'Catering Services Chef',
      program: 'Catering Services',
      image: require('../assets/images/catering/CatererTrainer1.PNG'),
      specialization: 'Professional Cooking, Food Safety, Menu Planning',
      experience: '10+ years',
      description: 'Professional chef with extensive catering experience'
    },
    {
      id: 8,
      name: 'Shoe Cobbling Expert',
      program: 'Shoe Cobbling',
      image: require('../assets/images/sheo/ShoeTrainer1.PNG'),
      specialization: 'Shoe Repair, Leather Work, Craftsmanship',
      experience: '12+ years',
      description: 'Master craftsman in shoe making and repair techniques'
    },
    {
      id: 9,
      name: 'Jewelry Making Artisan',
      program: 'Jewelry Making',
      image: require('../assets/images/earring/ear ring.PNG'),
      specialization: 'Beadwork, Wire Wrapping, Metalworking, Gemstone Setting',
      experience: '7+ years',
      description: 'Expert artisan in traditional and contemporary jewelry making techniques'
    },
    {
      id: 10,
      name: 'Local Weaving Master',
      program: 'Local Weaving',
      image: require('../assets/images/weaving/local veaving.PNG'),
      specialization: 'Traditional Patterns, Loom Operation, Fiber Preparation',
      experience: '15+ years',
      description: 'Master weaver preserving traditional Nigerian textile arts'
    },
    {
      id: 11,
      name: 'Knitting Specialist',
      program: 'Knitting',
      image: require('../assets/images/knitting/knitting.png'),
      specialization: 'Hand Knitting, Machine Knitting, Pattern Design',
      experience: '9+ years',
      description: 'Professional knitting instructor with modern and traditional techniques'
    },
    {
      id: 12,
      name: 'Kuli-kuli Production Expert',
      program: 'Kuli-kuli Production',
      image: require('../assets/images/kulikuli/kulikuli.PNG'),
      specialization: 'Groundnut Processing, Food Safety, Quality Control',
      experience: '11+ years',
      description: 'Expert in traditional food processing and modern production techniques'
    }
  ];

  return (
    <section className="trainers-section">
      <div className="container">
        <div className="section-header">
          <h2>Meet Our Expert Trainers</h2>
          <p>Learn from experienced professionals who are passionate about sharing their knowledge and skills</p>
        </div>

        <div className="trainers-grid">
          {trainers.map(trainer => (
            <div key={trainer.id} className="trainer-card">
              <div className="trainer-image">
                <img src={trainer.image} alt={trainer.name} />
                <div className="trainer-overlay">
                  <div className="trainer-info">
                    <h4>{trainer.program}</h4>
                    <p>{trainer.experience} Experience</p>
                  </div>
                </div>
              </div>
              <div className="trainer-content">
                <h3>{trainer.name}</h3>
                <p className="specialization">{trainer.specialization}</p>
                <p className="description">{trainer.description}</p>
                <div className="trainer-stats">
                  <span className="experience">Experience: {trainer.experience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="trainers-cta">
          <h3>Want to Learn from Our Experts?</h3>
          <p>Join our training programs and get hands-on experience from industry professionals</p>
          <a href="/application?type=trainee" className="btn btn-primary">Register Now</a>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
