import React from 'react';
import './TrainersSection.css';

const TrainersSection = () => {
  const trainers = [
    {
      id: 1,
      name: 'Computer Training Instructor',
      program: 'Computer Training',
      image: require('../assets/images/computer/trainers/computerTrainer1.PNG'),
      specialization: 'Microsoft Office, Programming, Internet Skills',
      experience: '5+ years',
      description: 'Expert in computer literacy and modern software applications'
    },
    {
      id: 2,
      name: 'Senior Computer Trainer',
      program: 'Computer Training',
      image: require('../assets/images/computer/trainers/computerTrainer2.PNG'),
      specialization: 'Hardware, Software, Troubleshooting',
      experience: '7+ years',
      description: 'Specialized in computer hardware and software maintenance'
    },
    {
      id: 3,
      name: 'Fashion Design Master',
      program: 'Fashion Design',
      image: require('../assets/images/fashion/trainers/FashionTrainer1.PNG'),
      specialization: 'Pattern Making, Garment Construction, Design',
      experience: '8+ years',
      description: 'Professional fashion designer with extensive industry experience'
    },
    {
      id: 4,
      name: 'Fashion Design Specialist',
      program: 'Fashion Design',
      image: require('../assets/images/fashion/trainers/fashionTrsiner2.PNG'),
      specialization: 'Tailoring, Embroidery, Fashion Business',
      experience: '6+ years',
      description: 'Expert in traditional and modern fashion techniques'
    },
    {
      id: 5,
      name: 'Catering Services Chef',
      program: 'Catering Services',
      image: require('../assets/images/catering/CatererTrainer1.PNG'),
      specialization: 'Professional Cooking, Food Safety, Menu Planning',
      experience: '10+ years',
      description: 'Professional chef with extensive catering experience'
    },
    {
      id: 6,
      name: 'Shoe Cobbling Expert',
      program: 'Shoe Cobbling',
      image: require('../assets/images/sheo/ShoeTrainer1.PNG'),
      specialization: 'Shoe Repair, Leather Work, Craftsmanship',
      experience: '12+ years',
      description: 'Master craftsman in shoe making and repair techniques'
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
          <a href="/registration" className="btn btn-primary">Register Now</a>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
