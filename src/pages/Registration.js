import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    program: '',
    programId: '',
    education: '',
    experience: '',
    motivation: '',
    emergencyContact: '',
    emergencyPhone: '',
    hasDisability: '',
    disabilityDetails: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [programs, setPrograms] = useState([]);
  const [apiError, setApiError] = useState('');

  // Fetch programs from backend on component mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await apiService.getPrograms({ active: true });
        if (response.success) {
          setPrograms(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch programs:', error);
        setApiError('Failed to load programs. Please refresh the page.');
        // Fallback to hardcoded programs if API fails
        setPrograms([
          { id: 1, title: 'Computer Training' },
          { id: 2, title: 'Fashion Design' },
          { id: 3, title: 'Catering Services' },
          { id: 4, title: 'Shoe Cobbling' },
          { id: 5, title: 'Jewelry Making' },
          { id: 6, title: 'Local Weaving' },
          { id: 7, title: 'Graphic Design' },
          { id: 8, title: 'Digital Marketing' },
          { id: 9, title: 'Knitting' },
          { id: 10, title: 'Kuli-kuli Production' },
          { id: 11, title: 'Web Development' },
          { id: 12, title: 'Mobile App Development' }
        ]);
      }
    };

    fetchPrograms();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.program) newErrors.program = 'Program selection is required';
    if (!formData.education) newErrors.education = 'Education level is required';
    if (!formData.motivation.trim()) newErrors.motivation = 'Motivation is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Age validation
    if (formData.age && (formData.age < 16 || formData.age > 35)) {
      newErrors.age = 'Age must be between 16 and 35';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Calculate date of birth from age
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - parseInt(formData.age);
        const dateOfBirth = `${birthYear}-01-01`; // Default to January 1st

        // Find the selected program
        const selectedProgram = programs.find(p =>
          p.title === formData.program ||
          p.id === parseInt(formData.program) ||
          p.id === formData.program
        );

        const registrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth,
          gender: formData.gender,
          address: formData.address,
          programId: selectedProgram ? selectedProgram.id : parseInt(formData.program),
          education: formData.education,
          experience: formData.experience,
          motivation: formData.motivation,
          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone,
          hasDisability: formData.hasDisability,
          disabilityDetails: formData.disabilityDetails
        };

        console.log('Submitting registration data:', registrationData);
        console.log('Selected program:', selectedProgram);

        // Test backend connection first
        try {
          const healthCheck = await fetch('http://localhost:5003/api/health');
          if (!healthCheck.ok) {
            throw new Error('Backend server is not responding');
          }
          console.log('✅ Backend server is running');
        } catch (error) {
          throw new Error('Cannot connect to server. Please make sure the backend is running.');
        }

        // Create applicant record (not user account)
        const applicantData = {
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          email: registrationData.email,
          phone: registrationData.phone,
          dateOfBirth: registrationData.dateOfBirth,
          gender: registrationData.gender,
          address: registrationData.address,
          education: registrationData.education,
          experience: registrationData.experience,
          motivation: registrationData.motivation,
          program: selectedProgram ? selectedProgram.title : formData.program,
          emergencyContactName: registrationData.emergencyContact,
          emergencyContactPhone: registrationData.emergencyPhone,
          hasDisability: formData.hasDisability === 'yes',
          disabilityDetails: formData.disabilityDetails,
          status: 'pending'
        };

        console.log('Sending applicant registration:', applicantData);

        const response = await fetch('http://localhost:5003/api/applicants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(applicantData)
        });

        const result = await response.json();
        console.log('Application response:', result);

        if (result.success) {
          setIsSubmitted(true);
          console.log('Application submitted successfully:', result);
        } else {
          setApiError(result.message || 'Application submission failed. Please try again.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        setApiError(error.message || 'Registration failed. Please check your connection and try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      address: '',
      program: '',
      education: '',
      experience: '',
      motivation: '',
      emergencyContact: '',
      emergencyPhone: '',
      hasDisability: '',
      disabilityDetails: ''
    });
    setErrors({});
    setApiError('');
  };

  if (isSubmitted) {
    return (
      <div className="registration-page">
        <div className="container">
          <div className="success-message">
            <h2>Application Submitted Successfully!</h2>
            <p>Thank you for applying to BCFSA. Your application has been received and will be reviewed by our admissions team. We will contact you soon with updates about your application status.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  age: '',
                  gender: '',
                  address: '',
                  program: '',
                  education: '',
                  experience: '',
                  motivation: '',
                  emergencyContact: '',
                  emergencyPhone: '',
                  hasDisability: '',
                  disabilityDetails: ''
                });
              }}
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">
      <div className="container">
        <div className="registration-header">
          <h1>Program Registration</h1>
          <p>Join our free skill development programs and build your future</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          {apiError && (
            <div className="error-banner">
              <p>❌ {apiError}</p>
            </div>
          )}

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
                  required
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="16"
                  max="35"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
                className={errors.address ? 'error' : ''}
              ></textarea>
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Emergency Contact Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact Name *</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                  className={errors.emergencyContact ? 'error' : ''}
                />
                {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="emergencyPhone">Emergency Contact Phone *</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required
                  className={errors.emergencyPhone ? 'error' : ''}
                />
                {errors.emergencyPhone && <span className="error-message">{errors.emergencyPhone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hasDisability">Do you have any disability or special needs?</label>
              <select
                id="hasDisability"
                name="hasDisability"
                value={formData.hasDisability}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            {formData.hasDisability === 'yes' && (
              <div className="form-group">
                <label htmlFor="disabilityDetails">Please provide details about your disability or special needs</label>
                <textarea
                  id="disabilityDetails"
                  name="disabilityDetails"
                  value={formData.disabilityDetails}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Please describe any accommodations you may need"
                ></textarea>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Program Selection</h3>
            <div className="form-group">
              <label htmlFor="program">Preferred Program *</label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={(e) => {
                  const selectedProgram = programs.find(p => p.id === parseInt(e.target.value));
                  setFormData({
                    ...formData,
                    program: e.target.value,
                    programId: selectedProgram ? selectedProgram.id : ''
                  });
                  if (errors.program) {
                    setErrors({ ...errors, program: '' });
                  }
                }}
                required
                className={errors.program ? 'error' : ''}
              >
                <option value="">Select a Program</option>
                {programs.map(program => (
                  <option key={program.id || program} value={program.id || program}>
                    {program.title || program}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="education">Highest Education Level *</label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
              >
                <option value="">Select Education Level</option>
                <option value="primary">Primary School</option>
                <option value="secondary">Secondary School</option>
                <option value="tertiary">Tertiary Institution</option>
                <option value="none">No Formal Education</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Previous Experience (if any)</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="3"
                placeholder="Describe any relevant experience or skills you have"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Why do you want to join this program? *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Tell us about your goals and motivation"
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Registration'}
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
    </div>
  );
};

export default Registration;
