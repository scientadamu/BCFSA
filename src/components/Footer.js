import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const { sidebarCollapsed } = useSidebar();

  // Check if we're on a dashboard page
  const isDashboard = ['/admin', '/trainer', '/student', '/corp'].includes(location.pathname);
  const isAdminDashboard = location.pathname === '/admin';

  // Determine footer classes
  let footerClasses = 'footer';
  if (isDashboard) {
    footerClasses += ' dashboard-footer';
    if (isAdminDashboard && sidebarCollapsed) {
      footerClasses += ' collapsed';
    }
  }

  return (
    <footer className={footerClasses}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={require('../assets/images/general/BcscLogo.png')} alt="BCFSA Logo" className="footer-logo-image" />
              <h3>Bago Center For Skills Acquisition</h3>
            </div>
            <p>
              A leading non-governmental organization dedicated to empowering youth through
              comprehensive skill development programs. We are committed to building a skilled
              workforce that drives economic growth and reduces unemployment in Niger State and beyond.
            </p>
            <p>
              <strong>Established:</strong> 2019<br />
              <strong>Registration:</strong> CAC/IT/NO 12345<br />
              <strong>Location:</strong> Bago, Niger State, Nigeria
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/registration">Registration</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Programs</h4>
            <ul>
              <li><a href="#computer">Computer Training</a></li>
              <li><a href="#fashion">Fashion Design</a></li>
              <li><a href="#catering">Catering Services</a></li>
              <li><a href="#shoe">Shoe Cobbling</a></li>
              <li><a href="#jewelry">Jewelry Making</a></li>
              <li><a href="#weaving">Local Weaving</a></li>
              <li><a href="#knitting">Knitting</a></li>
              <li><a href="#kulikuli">Kuli-kuli Production</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Information</h4>
            <div className="contact-info">
              <p>📍 Bago Center For Skills Acquisition<br />
                 &nbsp;&nbsp;&nbsp;&nbsp;Bago Local Government Area<br />
                 &nbsp;&nbsp;&nbsp;&nbsp;Niger State, Nigeria</p>
              <p>📞 Phone: +234 XXX XXX XXXX</p>
              <p>📱 Mobile: +234 XXX XXX XXXX</p>
              <p>✉️ Email: info@bcfsa.org</p>
              <p>🌐 Website: www.bcfsa.org</p>
              <p>🕒 Office Hours:<br />
                 &nbsp;&nbsp;&nbsp;&nbsp;Monday - Friday: 8:00 AM - 5:00 PM<br />
                 &nbsp;&nbsp;&nbsp;&nbsp;Saturday: 9:00 AM - 2:00 PM<br />
                 &nbsp;&nbsp;&nbsp;&nbsp;Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Bago Center For Skills Acquisition (BCFSA). All rights reserved. | Registered NGO in Nigeria</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms & Conditions</a>
              <a href="#disclaimer">Disclaimer</a>
              <a href="#accessibility">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
