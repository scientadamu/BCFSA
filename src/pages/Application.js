import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TraineeApplication from '../components/TraineeApplication';
import TrainerApplication from '../components/TrainerApplication';
import StaffApplication from '../components/StaffApplication';
import './Application.css';

const Application = () => {
  const [selectedType, setSelectedType] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if there's a type parameter in the URL
    const typeParam = searchParams.get('type');
    if (typeParam && ['trainee', 'trainer', 'staff'].includes(typeParam)) {
      setSelectedType(typeParam);
    }
  }, [searchParams]);

  const applicationTypes = [
    {
      type: 'trainee',
      title: 'Trainee Application',
      description: 'Apply to join our skills training programs',
      icon: '🎓',
      color: '#4caf50'
    },
    {
      type: 'trainer',
      title: 'Trainer Application',
      description: 'Join our team as a professional trainer',
      icon: '👨‍🏫',
      color: '#2196f3'
    },
    {
      type: 'staff',
      title: 'Staff Application',
      description: 'Apply for administrative and support positions',
      icon: '👥',
      color: '#ff9800'
    }
  ];

  const renderApplicationForm = () => {
    switch (selectedType) {
      case 'trainee':
        return <TraineeApplication onBack={() => setSelectedType('')} />;
      case 'trainer':
        return <TrainerApplication onBack={() => setSelectedType('')} />;
      case 'staff':
        return <StaffApplication onBack={() => setSelectedType('')} />;
      default:
        return null;
    }
  };

  return (
    <div className="application-page">
      <div className="container">
        {!selectedType ? (
          <>
            <div className="application-header">
              <h1>Submit Your Application</h1>
              <p>Choose the type of application you want to submit to BCFSA</p>
            </div>

            <div className="application-types">
              {applicationTypes.map((app) => (
                <div
                  key={app.type}
                  className="application-type-card"
                  onClick={() => setSelectedType(app.type)}
                  style={{ borderColor: app.color }}
                >
                  <div className="card-icon" style={{ color: app.color }}>
                    {app.icon}
                  </div>
                  <h3>{app.title}</h3>
                  <p>{app.description}</p>
                  <button 
                    className="apply-btn"
                    style={{ backgroundColor: app.color }}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            <div className="application-info">
              <div className="info-section">
                <h3>Application Process</h3>
                <div className="process-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Submit Application</h4>
                      <p>Fill out the appropriate application form with your details</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Review Process</h4>
                      <p>Our team will review your application within 3-5 business days</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Notification</h4>
                      <p>You'll receive an email notification about your application status</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Next Steps</h4>
                      <p>If approved, you'll receive further instructions to proceed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="requirements-section">
                <h3>General Requirements</h3>
                <div className="requirements-grid">
                  <div className="requirement-item">
                    <h4>📋 Valid Identification</h4>
                    <p>National ID, Driver's License, or International Passport</p>
                  </div>
                  <div className="requirement-item">
                    <h4>📧 Email Address</h4>
                    <p>Active email for communication and notifications</p>
                  </div>
                  <div className="requirement-item">
                    <h4>📱 Phone Number</h4>
                    <p>Valid phone number for contact purposes</p>
                  </div>
                  <div className="requirement-item">
                    <h4>📸 Passport Photo</h4>
                    <p>Recent passport-sized photograph</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="application-form-container">
            {renderApplicationForm()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
