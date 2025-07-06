// API service for BCFSA backend
const API_BASE_URL = 'http://localhost:5003/api';

class ApiService {
  // Helper method for making HTTP requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // User Management
  async getUsers() {
    return this.request('/users');
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Program Management
  async getPrograms() {
    return this.request('/programs');
  }

  async createProgram(programData) {
    return this.request('/programs', {
      method: 'POST',
      body: JSON.stringify(programData),
    });
  }

  async updateProgram(programId, programData) {
    return this.request(`/programs/${programId}`, {
      method: 'PUT',
      body: JSON.stringify(programData),
    });
  }

  // Enrollment Management
  async getEnrollments() {
    return this.request('/enrollments');
  }

  async createEnrollment(enrollmentData) {
    return this.request('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  }

  // Student Management
  async getStudents() {
    return this.request('/students');
  }

  async getApplicants() {
    return this.request('/applicants');
  }

  // Trainer Management
  async getTrainers() {
    return this.request('/trainers');
  }

  // Applicant Management
  async getApplicants() {
    return this.request('/applicants');
  }

  async updateApplicant(applicantId, applicantData) {
    return this.request(`/applicants/${applicantId}`, {
      method: 'PUT',
      body: JSON.stringify(applicantData),
    });
  }

  async admitApplicant(applicantId, admissionData) {
    return this.request(`/applicants/${applicantId}/admit`, {
      method: 'POST',
      body: JSON.stringify(admissionData),
    });
  }

  // User methods
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/users${queryString ? `?${queryString}` : ''}`);
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Program methods
  async getPrograms(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/programs${queryString ? `?${queryString}` : ''}`);
  }

  async getProgramById(id) {
    return this.request(`/programs/${id}`);
  }

  async createProgram(programData) {
    return this.request('/programs', {
      method: 'POST',
      body: JSON.stringify(programData),
    });
  }

  async updateProgram(id, programData) {
    return this.request(`/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programData),
    });
  }

  async deleteProgram(id) {
    return this.request(`/programs/${id}`, {
      method: 'DELETE',
    });
  }

  // Enrollment methods
  async getEnrollments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/enrollments${queryString ? `?${queryString}` : ''}`);
  }

  async createEnrollment(enrollmentData) {
    return this.request('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  }

  async updateEnrollment(id, enrollmentData) {
    return this.request(`/enrollments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(enrollmentData),
    });
  }

  // Student registration (creates user and enrollment)
  async registerStudent(registrationData) {
    try {
      // First, create the user account
      const userData = {
        name: `${registrationData.firstName} ${registrationData.lastName}`,
        email: registrationData.email,
        password: 'student123', // Default password - should be changed on first login
        role: 'trainee',
        phone: registrationData.phone,
        address: registrationData.address,
        gender: registrationData.gender,
        dateOfBirth: registrationData.dateOfBirth,
        emergencyContactName: registrationData.emergencyContact,
        emergencyContactPhone: registrationData.emergencyPhone,
        emergencyContactRelationship: registrationData.emergencyRelationship || 'Guardian'
      };

      const userResponse = await this.register(userData);
      
      if (userResponse.success) {
        // If user creation successful, create enrollment
        const enrollmentData = {
          studentId: userResponse.user.id,
          programId: registrationData.programId,
          status: 'pending',
          notes: {
            education: registrationData.education,
            experience: registrationData.experience,
            motivation: registrationData.motivation,
            hasDisability: registrationData.hasDisability,
            disabilityDetails: registrationData.disabilityDetails,
            registrationDate: new Date().toISOString()
          }
        };

        const enrollmentResponse = await this.createEnrollment(enrollmentData);
        
        return {
          success: true,
          message: 'Student registered successfully',
          user: userResponse.user,
          enrollment: enrollmentResponse.data
        };
      }

      return userResponse;
    } catch (error) {
      console.error('Student registration failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch('http://localhost:5001/health');
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', message: error.message };
    }
  }

  // Reports
  async getReports(type = 'overview') {
    return this.request(`/reports?type=${type}`);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
