import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSidebar } from '../contexts/SidebarContext';
import apiService from '../services/api';
import {
  FaTachometerAlt,
  FaUsers,
  FaGraduationCap,
  FaClipboardList,
  FaUserEdit,
  FaChalkboardTeacher,
  FaFileAlt,
  FaHome,
  FaChartLine,
  FaCog,
  FaBars,
  FaPlus,
  FaEdit,
  FaEye,
  FaToggleOn,
  FaToggleOff,
  FaUserPlus,
  FaSearch
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { sidebarCollapsed, setSidebarCollapsed } = useSidebar();
  const [activeSection, setActiveSection] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    recentActivities: [],
    users: [],
    programs: [],
    enrollments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User Management State
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userFilterRole, setUserFilterRole] = useState('all');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'trainer',
    phone: '',
    password: 'bcfsa123'
  });

  // Program Management State
  const [showCreateProgramForm, setShowCreateProgramForm] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: '',
    description: '',
    duration: '',
    capacity: '',
    status: 'active'
  });

  // Student Records State
  const [students, setStudents] = useState([]);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [studentFilterProgram, setStudentFilterProgram] = useState('all');

  // Applicant Management State
  const [applicants, setApplicants] = useState([]);
  const [applicantSearchTerm, setApplicantSearchTerm] = useState('');
  const [applicantFilterStatus, setApplicantFilterStatus] = useState('all');
  const [showEditApplicantForm, setShowEditApplicantForm] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showAdmitModal, setShowAdmitModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchStudents();
    fetchApplicants();
  }, []);

  useEffect(() => {
    // Reset sidebar state when component mounts
    return () => {
      setSidebarCollapsed(false);
    };
  }, [setSidebarCollapsed]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from multiple endpoints
      const [usersResponse, programsResponse, enrollmentsResponse] = await Promise.all([
        apiService.getUsers().catch(() => ({ data: [] })),
        apiService.getPrograms().catch(() => ({ data: [] })),
        apiService.getEnrollments().catch(() => ({ data: [] }))
      ]);

      // Calculate statistics from real data
      const users = usersResponse.data || [];
      const programs = programsResponse.data || [];
      const enrollments = enrollmentsResponse.data || [];

      const stats = [
        { 
          title: 'Total Students', 
          value: users.filter(u => u.role === 'trainee').length.toString(), 
          change: '+12%', 
          icon: '🎓', 
          color: '#4caf50' 
        },
        { 
          title: 'Active Programs', 
          value: programs.filter(p => p.status === 'active').length.toString(), 
          change: '+4', 
          icon: '📚', 
          color: '#2196f3' 
        },
        { 
          title: 'Trainers', 
          value: users.filter(u => u.role === 'trainer').length.toString(), 
          change: '+3', 
          icon: '👨‍🏫', 
          color: '#ff9800' 
        },
        { 
          title: 'Total Enrollments', 
          value: enrollments.length.toString(), 
          change: '+8', 
          icon: '📝', 
          color: '#e91e63' 
        },
        { 
          title: 'Completion Rate', 
          value: '87%', 
          change: '+5%', 
          icon: '📊', 
          color: '#9c27b0' 
        },
        { 
          title: 'Total Users', 
          value: users.length.toString(), 
          change: '+15%', 
          icon: '👥', 
          color: '#00bcd4' 
        }
      ];

      const recentActivities = [
        { type: 'enrollment', message: 'New student enrolled in Computer Training', time: '2 hours ago' },
        { type: 'user', message: 'New user account created', time: '3 hours ago' },
        { type: 'program', message: 'Fashion Design program updated', time: '4 hours ago' },
        { type: 'system', message: 'Database backup completed successfully', time: '5 hours ago' },
        { type: 'enrollment', message: 'Student completed Kuli-kuli Production', time: '6 hours ago' },
        { type: 'trainer', message: 'New trainer assigned to Knitting program', time: '1 day ago' }
      ];

      setDashboardData({
        stats,
        recentActivities,
        users,
        programs,
        enrollments
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await apiService.getStudents();
      setStudents(response.data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Use mock data if API fails
      setStudents([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          program: 'Computer Training',
          status: 'active',
          progress: 75,
          admissionNumber: 'BCFSA/25/001',
          admissionDate: '2025-01-15'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          program: 'Fashion Design',
          status: 'active',
          progress: 60,
          admissionNumber: 'BCFSA/25/002',
          admissionDate: '2025-01-16'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike@example.com',
          program: 'Catering',
          status: 'completed',
          progress: 100,
          admissionNumber: 'BCFSA/25/003',
          admissionDate: '2025-01-17'
        }
      ]);
    }
  };

  const fetchApplicants = async () => {
    try {
      console.log('🔄 Fetching applicants from database...');
      const response = await apiService.getApplicants();
      console.log('📋 Applicants response:', response);

      if (response.success) {
        setApplicants(response.data || []);
        console.log(`✅ Loaded ${response.data.length} applicants from database`);
      } else {
        console.error('❌ Failed to fetch applicants:', response.message);
        setApplicants([]);
      }
    } catch (error) {
      console.error('❌ Error fetching applicants:', error);
      // Try direct API call as fallback
      try {
        const directResponse = await fetch('http://localhost:5003/api/applicants');
        const directData = await directResponse.json();
        if (directData.success) {
          setApplicants(directData.data || []);
          console.log(`✅ Loaded ${directData.data.length} applicants via direct API`);
        } else {
          setApplicants([]);
        }
      } catch (directError) {
        console.error('❌ Direct API call also failed:', directError);
        setApplicants([]);
      }
    }
  };

  // Generate unique admission number
  const generateAdmissionNumber = () => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const existingNumbers = students
      .map(student => student.admissionNumber)
      .filter(num => num && num.includes(`BCFSA/${currentYear}/`))
      .map(num => parseInt(num.split('/')[2]))
      .filter(num => !isNaN(num));

    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    return `BCFSA/${currentYear}/${nextNumber.toString().padStart(3, '0')}`;
  };

  // Admit applicant function
  const admitApplicant = async (applicant) => {
    try {
      const admissionNumber = generateAdmissionNumber();
      console.log('🎓 Admitting applicant:', applicant.id, 'with admission number:', admissionNumber);

      // Update applicant status to admitted
      try {
        const directResponse = await fetch(`http://localhost:5003/api/applicants/${applicant.id}/admit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ admissionNumber })
        });

        const response = await directResponse.json();

        if (response.success) {
          // Update local state
          setApplicants(prev => prev.map(app =>
            app.id === applicant.id ? {
              ...app,
              status: 'admitted',
              admissionNumber,
              admittedAt: new Date().toISOString()
            } : app
          ));

          // Create student record from applicant data
          const newStudent = {
            id: Date.now(), // Temporary ID
            name: `${applicant.firstName} ${applicant.lastName}`,
            email: applicant.email,
            phone: applicant.phone,
            program: applicant.program,
            admissionNumber,
            admissionDate: new Date().toISOString().split('T')[0],
            status: 'active',
            progress: 0,
            dateOfBirth: applicant.dateOfBirth,
            gender: applicant.gender,
            address: applicant.address
          };

          setStudents(prev => [...prev, newStudent]);

          alert(`Applicant admitted successfully! Admission Number: ${admissionNumber}`);
          setShowAdmitModal(false);
          setSelectedApplicant(null);
          console.log('✅ Applicant admitted successfully');
        } else {
          alert('Error admitting applicant: ' + response.message);
          console.error('❌ Admission failed:', response.message);
        }
      } catch (apiError) {
        console.error('❌ API error during admission:', apiError);
        alert('Error admitting applicant: ' + apiError.message);
      }
    } catch (error) {
      console.error('❌ General error during admission:', error);
      alert('Error admitting applicant: ' + error.message);
    }
  };

  // Update applicant function
  const updateApplicant = async (applicantData) => {
    try {
      console.log('🔄 Updating applicant:', selectedApplicant.id, applicantData);

      // Try API service first
      let response;
      try {
        response = await apiService.updateApplicant(selectedApplicant.id, applicantData);
      } catch (apiError) {
        console.log('API service failed, trying direct call...');
        // Fallback to direct API call
        const directResponse = await fetch(`http://localhost:5003/api/applicants/${selectedApplicant.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(applicantData)
        });
        response = await directResponse.json();
      }

      if (response.success) {
        setApplicants(prev => prev.map(app =>
          app.id === selectedApplicant.id ? { ...app, ...applicantData } : app
        ));
        setShowEditApplicantForm(false);
        setSelectedApplicant(null);
        alert('Applicant updated successfully!');
        console.log('✅ Applicant updated successfully');
      } else {
        alert('Error updating applicant: ' + response.message);
        console.error('❌ Update failed:', response.message);
      }
    } catch (error) {
      alert('Error updating applicant: ' + error.message);
      console.error('❌ Update error:', error);
    }
  };

  const menuItems = [
    { id: 'overview', icon: <FaTachometerAlt />, label: 'Overview', description: 'Dashboard overview and statistics' },
    { id: 'users', icon: <FaUsers />, label: 'User Management', description: 'Manage staff and student accounts' },
    { id: 'programs', icon: <FaGraduationCap />, label: 'Programs', description: 'Manage training programs' },
    { id: 'students', icon: <FaClipboardList />, label: 'Student Records', description: 'View and manage all student records' },
    { id: 'applicants', icon: <FaUserEdit />, label: 'Applicants', description: 'View registered applicants and applications' },
    { id: 'enrollments', icon: <FaFileAlt />, label: 'Enrollments', description: 'Manage program enrollments and status' },
    { id: 'trainers', icon: <FaChalkboardTeacher />, label: 'Trainers', description: 'Trainer management and assignments' },
    { id: 'orphanage', icon: <FaHome />, label: 'Orphanage Records', description: 'Manage orphanage home records' },
    { id: 'reports', icon: <FaChartLine />, label: 'Reports', description: 'Generate and view comprehensive reports' },
    { id: 'settings', icon: <FaCog />, label: 'Settings', description: 'System settings and configuration' }
  ];

  // Use real data from state
  const stats = dashboardData.stats;
  const recentActivities = dashboardData.recentActivities;

  const renderOverview = () => {
    if (loading) {
      return (
        <div className="overview-section">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="overview-section">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Error Loading Dashboard</h3>
            <p>{error}</p>
            <button onClick={fetchDashboardData} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="overview-section">
        <div className="welcome-card">
          <h2>Welcome back, {user?.name}!</h2>
          <p>Here's what's happening at BCFSA today.</p>
          <button onClick={fetchDashboardData} className="refresh-btn">
            🔄 Refresh Data
          </button>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
              <div className="stat-icon" style={{ backgroundColor: stat.color + '20' }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <span className="stat-change" style={{ color: stat.color }}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="recent-activities">
            <h3>Recent Activities</h3>
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'enrollment' && '📝'}
                    {activity.type === 'completion' && '🎉'}
                    {activity.type === 'assessment' && '📊'}
                    {activity.type === 'trainer' && '👨‍🏫'}
                    {activity.type === 'user' && '👤'}
                    {activity.type === 'program' && '📚'}
                    {activity.type === 'system' && '⚙️'}
                  </div>
                  <div className="activity-content">
                    <p>{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn" onClick={() => setActiveSection('users')}>
                <span className="action-icon">👤</span>
                Create User Account
              </button>
              <button className="action-btn" onClick={() => setActiveSection('programs')}>
                <span className="action-icon">📚</span>
                Add New Program
              </button>
              <button className="action-btn" onClick={() => setActiveSection('students')}>
                <span className="action-icon">🎓</span>
                View Students
              </button>
              <button className="action-btn" onClick={() => setActiveSection('reports')}>
                <span className="action-icon">📊</span>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderApplicantManagement = () => {
    const filteredApplicants = applicants.filter(applicant => {
      const matchesSearch = `${applicant.firstName} ${applicant.lastName}`.toLowerCase().includes(applicantSearchTerm.toLowerCase()) ||
                           applicant.email.toLowerCase().includes(applicantSearchTerm.toLowerCase());
      const matchesStatus = applicantFilterStatus === 'all' || applicant.status === applicantFilterStatus;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="section-content">
        <div className="section-header">
          <h2><FaUserEdit /> Applicant Management</h2>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <FaFileAlt /> Export Applicants
            </button>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search applicants..."
              value={applicantSearchTerm}
              onChange={(e) => setApplicantSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={applicantFilterStatus}
            onChange={(e) => setApplicantFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="admitted">Admitted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="applicants-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map(applicant => (
                <tr key={applicant.id}>
                  <td>{`${applicant.firstName} ${applicant.lastName}`}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.program}</td>
                  <td>{new Date(applicant.applicationDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${applicant.status}`}>
                      {applicant.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => {
                          setSelectedApplicant(applicant);
                          setShowEditApplicantForm(true);
                        }}
                        className="btn-icon edit"
                        title="Edit Applicant"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedApplicant(applicant);
                          setShowAdmitModal(true);
                        }}
                        className="btn-icon admit"
                        title="Admit Applicant"
                        disabled={applicant.status === 'admitted'}
                      >
                        <FaUserPlus />
                      </button>
                      <button className="btn-icon view" title="View Details">
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Applicant Modal */}
        {showEditApplicantForm && selectedApplicant && (
          <div className="modal-overlay">
            <div className="modal-content large-modal">
              <div className="modal-header">
                <h3>Edit Applicant - {selectedApplicant.firstName} {selectedApplicant.lastName}</h3>
                <button onClick={() => {
                  setShowEditApplicantForm(false);
                  setSelectedApplicant(null);
                }} className="close-btn">×</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const applicantData = {
                  firstName: formData.get('firstName'),
                  lastName: formData.get('lastName'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  program: formData.get('program'),
                  status: formData.get('status'),
                  dateOfBirth: formData.get('dateOfBirth'),
                  gender: formData.get('gender'),
                  address: formData.get('address'),
                  education: formData.get('education'),
                  experience: formData.get('experience'),
                  motivation: formData.get('motivation')
                };
                updateApplicant(applicantData);
              }} className="applicant-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      defaultValue={selectedApplicant.firstName}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      defaultValue={selectedApplicant.lastName}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={selectedApplicant.email}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={selectedApplicant.phone}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Program</label>
                    <select name="program" defaultValue={selectedApplicant.program} required>
                      <option value="Computer Training">Computer Training</option>
                      <option value="Fashion Design">Fashion Design</option>
                      <option value="Catering">Catering</option>
                      <option value="Shoe Cobbling">Shoe Cobbling</option>
                      <option value="Jewelry Making">Jewelry Making</option>
                      <option value="Local Weaving">Local Weaving</option>
                      <option value="Knitting">Knitting</option>
                      <option value="Kuli-kuli Production">Kuli-kuli Production</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" defaultValue={selectedApplicant.status} required>
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="admitted">Admitted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => {
                    setShowEditApplicantForm(false);
                    setSelectedApplicant(null);
                  }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Applicant
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Admit Applicant Modal */}
        {showAdmitModal && selectedApplicant && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Admit Applicant</h3>
                <button onClick={() => {
                  setShowAdmitModal(false);
                  setSelectedApplicant(null);
                }} className="close-btn">×</button>
              </div>
              <div className="admit-confirmation">
                <div className="applicant-details">
                  <h4>{selectedApplicant.firstName} {selectedApplicant.lastName}</h4>
                  <p><strong>Email:</strong> {selectedApplicant.email}</p>
                  <p><strong>Program:</strong> {selectedApplicant.program}</p>
                  <p><strong>Application Date:</strong> {new Date(selectedApplicant.applicationDate).toLocaleDateString()}</p>
                </div>
                <div className="admission-info">
                  <p><strong>Admission Number:</strong> {generateAdmissionNumber()}</p>
                  <p><strong>Admission Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
                <p className="confirmation-text">
                  Are you sure you want to admit this applicant? This will create a student account and assign an admission number.
                </p>
                <div className="form-actions">
                  <button onClick={() => {
                    setShowAdmitModal(false);
                    setSelectedApplicant(null);
                  }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={() => admitApplicant(selectedApplicant)} className="btn btn-success">
                    Admit Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStudentRecords = () => {
    const filteredStudents = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
                           (student.admissionNumber && student.admissionNumber.toLowerCase().includes(studentSearchTerm.toLowerCase()));
      const matchesProgram = studentFilterProgram === 'all' || student.program === studentFilterProgram;
      return matchesSearch && matchesProgram;
    });

    if (loading) {
      return (
        <div className="section-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading student records...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="section-content">
        <div className="section-header">
          <h2><FaClipboardList /> Student Records</h2>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <FaFileAlt /> Export Records
            </button>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search students by name, email, or admission number..."
              value={studentSearchTerm}
              onChange={(e) => setStudentSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={studentFilterProgram}
            onChange={(e) => setStudentFilterProgram(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Programs</option>
            <option value="Computer Training">Computer Training</option>
            <option value="Fashion Design">Fashion Design</option>
            <option value="Catering">Catering</option>
            <option value="Shoe Cobbling">Shoe Cobbling</option>
            <option value="Jewelry Making">Jewelry Making</option>
            <option value="Local Weaving">Local Weaving</option>
            <option value="Knitting">Knitting</option>
            <option value="Kuli-kuli Production">Kuli-kuli Production</option>
          </select>
        </div>

        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>Admission No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>Admission Date</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td className="admission-number">{student.admissionNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.program}</td>
                  <td>{student.admissionDate ? new Date(student.admissionDate).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{student.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${student.status}`}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon view" title="View Details">
                        <FaEye />
                      </button>
                      <button className="btn-icon edit" title="Edit Student">
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="empty-state">
            <h3>No Students Found</h3>
            <p>No students match your current search criteria.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon"><FaGraduationCap /></span>
            {!sidebarCollapsed && <span className="logo-text">BCFSA Admin</span>}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <div className="nav-content">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-description">{item.description}</span>
                </div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h1>{menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}</h1>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <div className="user-info">
              <img src={user?.avatar || '/api/placeholder/40/40'} alt={user?.name} />
              <span>{user?.name}</span>
            </div>
          </div>
        </div>

        <div className="content-body">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'applicants' && renderApplicantManagement()}
          {activeSection === 'students' && renderStudentRecords()}
          {(activeSection !== 'overview' && activeSection !== 'applicants' && activeSection !== 'students') && (
            <div className="section-content">
              <h2>Coming Soon</h2>
              <p>This section is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
