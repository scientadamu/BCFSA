// Contact.js
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>
      <p>If you have any questions or want to learn more about our programs, feel free to reach out. You can find us at the address below, and we also have an interactive map for easier navigation.</p>
      <div className="contact-content">
        <div className="contact-card">
          <h3>Find Us On The Map</h3>
          <p>We are located at Block 390, Opposite Sanda College, Talba Housing Estate, Off Minna-Bida Road, Minna, Niger State</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_HERE"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
