import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Notification.css';

const Notification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get notification data from navigation state
  const notificationData = location.state || {
    type: 'info',
    title: 'Notification',
    message: 'No notification data available.',
    applicationId: null
  };

  const { type, title, message, applicationId } = notificationData;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'warning':
        return 'notification-warning';
      default:
        return 'notification-info';
    }
  };

  return (
    <div className="notification-page">
      <div className="container">
        <div className={`notification-card ${getTypeClass()}`}>
          <div className="notification-icon">
            {getIcon()}
          </div>
          
          <div className="notification-content">
            <h1>{title}</h1>
            <p>{message}</p>
            
            {applicationId && (
              <div className="application-details">
                <p><strong>Application ID:</strong> #{applicationId}</p>
                <p><small>Please keep this ID for your records</small></p>
              </div>
            )}
          </div>

          <div className="notification-actions">
            {type === 'success' && (
              <>
                <Link to="/application" className="btn btn-primary">
                  Submit Another Application
                </Link>
                <Link to="/" className="btn btn-secondary">
                  Back to Home
                </Link>
              </>
            )}
            
            {type === 'error' && (
              <>
                <button 
                  onClick={() => navigate(-1)} 
                  className="btn btn-primary"
                >
                  Try Again
                </button>
                <Link to="/" className="btn btn-secondary">
                  Back to Home
                </Link>
              </>
            )}

            {(type === 'info' || type === 'warning') && (
              <>
                <Link to="/" className="btn btn-primary">
                  Back to Home
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Contact Support
                </Link>
              </>
            )}
          </div>
        </div>

        {type === 'success' && (
          <div className="next-steps">
            <h3>What happens next?</h3>
            <div className="steps-timeline">
              <div className="step completed">
                <div className="step-marker">✓</div>
                <div className="step-content">
                  <h4>Application Submitted</h4>
                  <p>Your application has been successfully received</p>
                </div>
              </div>
              
              <div className="step pending">
                <div className="step-marker">2</div>
                <div className="step-content">
                  <h4>Review Process</h4>
                  <p>Our team will review your application (3-5 business days)</p>
                </div>
              </div>
              
              <div className="step pending">
                <div className="step-marker">3</div>
                <div className="step-content">
                  <h4>Decision Notification</h4>
                  <p>You'll receive an email with the decision</p>
                </div>
              </div>
              
              <div className="step pending">
                <div className="step-marker">4</div>
                <div className="step-content">
                  <h4>Next Steps</h4>
                  <p>If approved, you'll receive enrollment instructions</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="contact-info">
          <h3>Need Help?</h3>
          <div className="contact-methods">
            <div className="contact-method">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>info@bcfsa.org</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Phone</strong>
                <p>+234-800-BCFSA-01</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Address</strong>
                <p>Bago Center For Skills Acquisition<br />Niger State, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
