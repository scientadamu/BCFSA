// Committees.js
import React from 'react';

const Committees = () => {
  return (
    <section id="committees" className="committees">
      <h2>Our Committees</h2>
      <div className="committee-list">
        <div className="committee-item">
          <h3>Training Committee</h3>
          <p>The Training Committee oversees the design and delivery of our training programs, ensuring quality education and skill development.</p>
          <a href="#read-more" className="btn">Read More</a>
        </div>
        <div className="committee-item">
          <h3>Board of Trustees</h3>
          <p>The Board of Trustees provides strategic direction and governance for the center, ensuring that our mission and objectives are achieved.</p>
          <a href="#read-more" className="btn">Read More</a>
        </div>
        <div className="committee-item">
          <h3>Management Team</h3>
          <p>The Management Team ensures the day-to-day operations of the center run smoothly, from administration to student support.</p>
          <a href="#read-more" className="btn">Read More</a>
        </div>
      </div>
    </section>
  );
};

export default Committees;
