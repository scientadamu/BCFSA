import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './TrainerDashboard.css';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'students', icon: '🎓', label: 'My Students' },
    { id: 'assessments', icon: '📝', label: 'Assessments' },
    { id: 'schedule', icon: '📅', label: 'Schedule' },
    { id: 'reports', icon: '📈', label: 'Reports' }
  ];

  const myStudents = [
    { id: 1, name: 'John Doe', program: 'Computer Training', progress: 75 },
    { id: 2, name: 'Jane Smith', program: 'Computer Training', progress: 60 },
    { id: 3, name: 'Mike Johnson', program: 'Computer Training', progress: 90 },
    { id: 4, name: 'Sarah Wilson', program: 'Computer Training', progress: 45 }
  ];

  const renderOverview = () => (
    <div className="overview-section">
      <div className="welcome-card">
        <h2>Welcome, {user?.name}!</h2>
        <p>Manage your students and track their progress.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>24</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>8</h3>
            <p>Pending Assessments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>78%</h3>
            <p>Average Progress</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="students-section">
      <h2>My Students</h2>
      <div className="students-grid">
        {myStudents.map(student => (
          <div key={student.id} className="student-card">
            <div className="student-info">
              <h3>{student.name}</h3>
              <p>{student.program}</p>
            </div>
            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>
              <span>{student.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssessments = () => (
    <div className="assessments-section">
      <h2>Assessment Management</h2>
      <div className="assessment-tools">
        <button className="btn btn-primary">Create New Assessment</button>
        <button className="btn btn-secondary">View Submitted Assessments</button>
      </div>
      <div className="placeholder-content">
        <p>Assessment creation and management tools will be available here.</p>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'students':
        return renderStudents();
      case 'assessments':
        return renderAssessments();
      case 'schedule':
        return (
          <div className="section-content">
            <h2>Class Schedule</h2>
            <p>View and manage your teaching schedule.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="section-content">
            <h2>Student Reports</h2>
            <p>Generate and view student progress reports.</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="trainer-dashboard">
      <div className="dashboard-header">
        <h1>Trainer Dashboard</h1>
        <div className="user-info">
          <img src={user?.avatar || '/api/placeholder/40/40'} alt={user?.name} />
          <span>{user?.name}</span>
        </div>
      </div>

      <div className="dashboard-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default TrainerDashboard;
