import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import './Footer.css';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';

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

  // Handle footer link clicks to scroll to top
  const handleFooterLinkClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={footerClasses}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={require('../assets/images/general/BcscLogo.png')} alt="BCFSA Logo" className="footer-logo-image" />
              <h3>Bago Center For Skills Acquisition & Orphanage Home</h3>
            </div>
            <p>
              A leading non-governmental organization dedicated to empowering youth through
              comprehensive skill development programs and providing compassionate care for orphaned
              and vulnerable children. We are committed to building a skilled workforce while ensuring
              every child has access to education, healthcare, and opportunities to thrive.
            </p>
            <p>
              <strong>Established:</strong> 2019<br />
              <strong>Registration:</strong> CAC/IT/NO 12345<br />
              <strong>Location:</strong> Bago, Niger State, Nigeria
            </p>
            <div className="social-links">
              <a href="https://facebook.com/bcfsa" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="social-link facebook" title="Follow us on Facebook">
                <FaFacebookF />
                <span className="social-tooltip">Facebook</span>
              </a>
              <a href="https://twitter.com/bcfsa" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="social-link twitter" title="Follow us on Twitter">
                <FaTwitter />
                <span className="social-tooltip">Twitter</span>
              </a>
              <a href="https://instagram.com/bcfsa" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="social-link instagram" title="Follow us on Instagram">
                <FaInstagram />
                <span className="social-tooltip">Instagram</span>
              </a>
              <a href="https://linkedin.com/company/bcfsa" target="_blank" rel="noopener noreferrer" aria-label="Connect with us on LinkedIn" className="social-link linkedin" title="Connect with us on LinkedIn">
                <FaLinkedinIn />
                <span className="social-tooltip">LinkedIn</span>
              </a>
              <a href="https://youtube.com/bcfsa" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="social-link youtube" title="Subscribe to our YouTube channel">
                <FaYoutube />
                <span className="social-tooltip">YouTube</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/" onClick={handleFooterLinkClick}>Home</Link></li>
              <li><Link to="/about" onClick={handleFooterLinkClick}>About Us</Link></li>
              <li><Link to="/programs" onClick={handleFooterLinkClick}>Programs</Link></li>
              <li><Link to="/projects" onClick={handleFooterLinkClick}>Projects</Link></li>
              <li><Link to="/application" onClick={handleFooterLinkClick}>Application</Link></li>
              <li><Link to="/contact" onClick={handleFooterLinkClick}>Contact</Link></li>
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
              <p>📍 Bago Center For Skills Acquisition & Orphanage Home<br />
                 &nbsp;&nbsp;&nbsp;&nbsp;Bago Local Government Area<br />
                 &nbsp;&nbsp;&nbsp;&nbsp;Niger State, Nigeria</p>
              <p>📞 Phone: +234 814 297 0188</p>
              <p>📱 Mobile: +234 803 069 1394</p>
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
