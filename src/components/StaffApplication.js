import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationForms.css';

const StaffApplication = ({ onBack }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    position: '',
    qualifications: [],
    experience_years: '',
    specializations: [],
    photo: null,
    cv_file: null,
    certificates: [],
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    hasDisability: false,
    disabilityDetails: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const staffPositions = [
    'Administrative Assistant',
    'Accountant',
    'Human Resources Officer',
    'IT Support Specialist',
    'Security Officer',
    'Maintenance Supervisor',
    'Social Worker',
    'Counselor',
    'Librarian',
    'Other'
  ];

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

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
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
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.experience_years) newErrors.experience_years = 'Years of experience is required';
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
        applicationType: 'staff',
        ...formData
      };

      console.log('Submitting staff application:', applicationData);

      const response = await fetch('http://localhost:5002/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      });

      const result = await response.json();

      if (result.success) {
        navigate('/notification', {
          state: {
            type: 'success',
            title: 'Staff Application Submitted Successfully!',
            message: 'Your staff application has been submitted and is under review. You will receive an email notification within 3-5 business days.',
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
      position: '',
      qualifications: [],
      experience_years: '',
      specializations: [],
      photo: null,
      cv_file: null,
      certificates: [],
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
        <h2>Staff Application Form</h2>
        <p>Apply for administrative and support positions</p>
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
          <h3>Position Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="position">Position Applied For *</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={errors.position ? 'error' : ''}
                required
              >
                <option value="">Select Position</option>
                {staffPositions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
              {errors.position && <span className="error-text">{errors.position}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="experience_years">Years of Experience *</label>
              <select
                id="experience_years"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleChange}
                className={errors.experience_years ? 'error' : ''}
                required
              >
                <option value="">Select Experience</option>
                <option value="0">Fresh Graduate</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5+ Years</option>
                <option value="10">10+ Years</option>
              </select>
              {errors.experience_years && <span className="error-text">{errors.experience_years}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="qualifications">Educational Qualifications</label>
            <textarea
              id="qualifications"
              name="qualifications"
              value={formData.qualifications.join(', ')}
              onChange={(e) => handleArrayChange('qualifications', e.target.value)}
              rows="3"
              placeholder="List your educational qualifications (separate with commas)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="specializations">Skills & Competencies</label>
            <textarea
              id="specializations"
              name="specializations"
              value={formData.specializations.join(', ')}
              onChange={(e) => handleArrayChange('specializations', e.target.value)}
              rows="3"
              placeholder="List your skills and competencies (separate with commas)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cv_file">Upload CV/Resume</label>
            <input
              type="file"
              id="cv_file"
              name="cv_file"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              className="file-input"
            />
            <small>Upload your CV or Resume (PDF, DOC, DOCX, max 5MB)</small>
          </div>

          <div className="form-group">
            <label htmlFor="certificates">Certificates & Documents</label>
            <input
              type="file"
              id="certificates"
              name="certificates"
              onChange={handleChange}
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              className="file-input"
            />
            <small>Upload relevant certificates and documents (PDF, JPG, PNG, max 10MB total)</small>
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
              placeholder="e.g., Spouse, Parent, Sibling"
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

export default StaffApplication;
