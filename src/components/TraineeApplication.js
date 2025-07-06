import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './ApplicationForms.css';

const TraineeApplication = ({ onBack }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    programId: '',
    education: '',
    experience: '',
    photo: null,
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    hasDisability: false,
    disabilityDetails: ''
  });

  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await apiService.getPrograms({ active: true });
      if (response.success) {
        setPrograms(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch programs:', error);
      setApiError('Failed to load programs. Please refresh the page.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.programId) newErrors.programId = 'Please select a program';
    if (!formData.education.trim()) newErrors.education = 'Education background is required';
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[+]?[0-9\-\s()]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const applicationData = {
        applicationType: 'trainee',
        ...formData
      };

      console.log('Submitting trainee application:', applicationData);

      // Submit application
      const response = await fetch('http://localhost:5002/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      });

      const result = await response.json();

      if (result.success) {
        // Navigate to notification page
        navigate('/notification', {
          state: {
            type: 'success',
            title: 'Application Submitted Successfully!',
            message: 'Your trainee application has been submitted and is under review. You will receive an email notification within 3-5 business days.',
            applicationId: result.data.id
          }
        });
      } else {
        setApiError(result.message || 'Application submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setApiError('Failed to submit application. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      programId: '',
      education: '',
      experience: '',
      photo: null,
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
      hasDisability: false,
      disabilityDetails: ''
    });
    setErrors({});
    setApiError('');
  };

  return (
    <div className="application-form">
      <div className="form-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Application Types
        </button>
        <h2>Trainee Application Form</h2>
        <p>Apply to join our skills training programs</p>
      </div>

      {apiError && (
        <div className="error-banner">
          <p>❌ {apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                required
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                required
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="+234-XXX-XXX-XXXX"
                required
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? 'error' : ''}
                required
              />
              {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'error' : ''}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="error-text">{errors.gender}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
              rows="3"
              required
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="photo">Passport Photograph</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleChange}
              accept="image/*"
              className="file-input"
            />
            <small>Upload a recent passport-sized photograph (JPG, PNG, max 2MB)</small>
          </div>
        </div>

        <div className="form-section">
          <h3>Program Selection</h3>
          <div className="form-group">
            <label htmlFor="programId">Select Program *</label>
            <select
              id="programId"
              name="programId"
              value={formData.programId}
              onChange={handleChange}
              className={errors.programId ? 'error' : ''}
              required
            >
              <option value="">Choose a Program</option>
              {programs.map(program => (
                <option key={program.id} value={program.id}>
                  {program.title} ({program.durationValue} {program.durationUnit})
                </option>
              ))}
            </select>
            {errors.programId && <span className="error-text">{errors.programId}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Background Information</h3>
          <div className="form-group">
            <label htmlFor="education">Educational Background *</label>
            <textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className={errors.education ? 'error' : ''}
              rows="3"
              placeholder="Describe your educational background..."
              required
            />
            {errors.education && <span className="error-text">{errors.education}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="experience">Relevant Experience</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="3"
              placeholder="Describe any relevant work experience or skills..."
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Emergency Contact</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emergencyContactName">Contact Name *</label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className={errors.emergencyContactName ? 'error' : ''}
                required
              />
              {errors.emergencyContactName && <span className="error-text">{errors.emergencyContactName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContactPhone">Contact Phone *</label>
              <input
                type="tel"
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                className={errors.emergencyContactPhone ? 'error' : ''}
                required
              />
              {errors.emergencyContactPhone && <span className="error-text">{errors.emergencyContactPhone}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactRelationship">Relationship</label>
            <input
              type="text"
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              value={formData.emergencyContactRelationship}
              onChange={handleChange}
              placeholder="e.g., Parent, Guardian, Spouse"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="hasDisability"
                checked={formData.hasDisability}
                onChange={handleChange}
              />
              I have a disability that may require special accommodation
            </label>
          </div>

          {formData.hasDisability && (
            <div className="form-group">
              <label htmlFor="disabilityDetails">Disability Details</label>
              <textarea
                id="disabilityDetails"
                name="disabilityDetails"
                value={formData.disabilityDetails}
                onChange={handleChange}
                rows="3"
                placeholder="Please describe any accommodations you may need..."
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleClearForm}
            disabled={isLoading}
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default TraineeApplication;
