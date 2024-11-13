import React from 'react';

const Sections = () => {
  return (
    <section id="sections" className="sections">
      <h2>Our Sections</h2>
      <div className="section-list">
        <div className="section-item">
          <h3>Training</h3>
          <p>We offer comprehensive training programs led by industry experts. Our training modules are designed to equip individuals with the practical skills they need for success in their chosen fields.</p>
          <a href="#read-more" className="btn">Read More</a>
        </div>
        <div className="section-item">
          <h3>Community</h3>
          <p>Join a vibrant community of learners and professionals. Our community supports collaboration, mentorship, and continuous learning opportunities.</p>
          <a href="#read-more" className="btn">Read More</a>
        </div>
        <div className="section-item">
          <h3>Partnerships</h3>
          <p>We collaborate with local and international organizations to bring valuable opportunities to our learners. These partnerships create pathways to employment, internships, and more.</p>
          <a href="#read-more" className="btn">Read More</a>
        </div>
      </div>
    </section>
  );
};

export default Sections;
