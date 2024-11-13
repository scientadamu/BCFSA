// Media.js
import React from 'react';

const Media = () => {
  return (
    <section id="media" className="media">
      <h2>Our Media</h2>
      <p>Check out some of our highlights, events, and media coverage here.</p>
      <div className="media-gallery">
        <div className="media-item">
          <img src="images/event1.jpg" alt="Event 1" />
          <p>Our recent graduation ceremony!</p>
        </div>
        <div className="media-item">
          <img src="images/event2.jpg" alt="Event 2" />
          <p>Workshop on Digital Marketing</p>
        </div>
        <div className="media-item">
          <video controls>
            <source src="videos/skills-acquisition.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>Overview of our Skills Acquisition Programs</p>
        </div>
        <div className="media-item">
          <img src="images/event3.jpg" alt="Event 3" />
          <p>Hands-on coding workshop</p>
        </div>
        <div className="media-item">
          <video controls>
            <source src="videos/community-event.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>Community outreach event</p>
        </div>
        <div className="media-item">
          <img src="images/event4.jpg" alt="Event 4" />
          <p>Fashion design showcase</p>
        </div>
      </div>
    </section>
  );
};

export default Media;
