// Sponsors.js
import React from 'react';

const Sponsors = () => {
  return (
    <section id="sponsors" className="sponsors">
      <h2>Our Sponsors</h2>
      <p>We are grateful for the generous support of our sponsors who help us provide top-notch training and educational resources. Their contributions make our mission possible.</p>
      <div className="sponsor-cards">
        {/* Sponsor Card 1 */}
        <div className="sponsor-card large-sponsor">
          <img src="images/bago.jpeg" alt="Sponsor 1" className="sponsor-img" />
          <h3>Farmer Umaru Bago</h3>
          <p>Farmer Umaru Bago is committed to empowering communities through impactful education and training support.</p>
          <a href="#read-more" className="btn">Read More</a>
        </div>

        {/* Sponsor 2 and Sponsor 3 in the same row */}
        <div className="sponsor-row">
          <div className="sponsor-card sponsor2">
            <img src="images/emre of Agaie.jpg" alt="Sponsor 2" className="sponsor-img" />
            <h3>HRH. Alhaji Yusuf Nuhu</h3>
            <p>He is also the Chairman/CEO of Nuhu Farms Limited located in Agaie. Alhaji Nuhu is married with children.</p>
            <a href="#read-more" className="btn">Read More</a>
          </div>
          <div className="sponsor-card sponsor3">
            <img src="images/chairman.webp" alt="Sponsor 3" className="sponsor-img" />
            <h3>Abubakar Ilemona Ibrahim</h3>
            <p>The leadership acumen of honourable Ibrahim Halilu Sayuti has been described as prowess and God-fearing in Agaie local government area of Niger state.</p>
            <a href="#read-more" className="btn">Read More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
