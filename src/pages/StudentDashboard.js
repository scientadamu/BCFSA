import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportData, setReportData] = useState({
    trainer: '',
    subject: '',
    description: ''
  });

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'progress', icon: '📈', label: 'My Progress' },
    { id: 'assessments', icon: '📝', label: 'Assessments' },
    { id: 'schedule', icon: '📅', label: 'Schedule' },
    { id: 'report', icon: '🚨', label: 'Report Trainer' }
  ];

  const myProgress = {
    program: 'Computer Training',
    overallProgress: 65,
    modules: [
      { name: 'Microsoft Word', progress: 90, status: 'completed' },
      { name: 'Microsoft Excel', progress: 75, status: 'in-progress' },
      { name: 'PowerPoint', progress: 45, status: 'in-progress' },
      { name: 'Internet & Email', progress: 0, status: 'not-started' }
    ]
  };

  const assessments = [
    { id: 1, title: 'Word Processing Test', score: 85, status: 'completed', date: '2024-01-15' },
    { id: 2, title: 'Excel Basics', score: 78, status: 'completed', date: '2024-01-20' },
    { id: 3, title: 'PowerPoint Presentation', score: null, status: 'pending', date: '2024-01-25' }
  ];

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // Handle report submission
    console.log('Report submitted:', reportData);
    setShowReportForm(false);
    setReportData({ trainer: '', subject: '', description: '' });
    alert('Report submitted successfully. It will be reviewed by the administration.');
  };

  const renderOverview = () => (
    <div className="overview-section">
      <div className="welcome-card">
        <h2>Welcome, {user?.name}!</h2>
        <p>Track your learning progress and manage your studies.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{myProgress.program}</h3>
            <p>Current Program</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{myProgress.overallProgress}%</h3>
            <p>Overall Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{assessments.filter(a => a.status === 'completed').length}</h3>
            <p>Completed Assessments</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="progress-section">
      <h2>My Learning Progress</h2>
      <div className="program-progress">
        <h3>{myProgress.program}</h3>
        <div className="overall-progress">
          <div className="progress-bar large">
            <div 
              className="progress-fill" 
              style={{ width: `${myProgress.overallProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">{myProgress.overallProgress}% Complete</span>
        </div>
      </div>

      <div className="modules-grid">
        {myProgress.modules.map((module, index) => (
          <div key={index} className={`module-card ${module.status}`}>
            <h4>{module.name}</h4>
            <div className="module-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <span>{module.progress}%</span>
            </div>
            <span className={`status ${module.status}`}>
              {module.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssessments = () => (
    <div className="assessments-section">
      <h2>My Assessments</h2>
      <div className="assessments-grid">
        {assessments.map(assessment => (
          <div key={assessment.id} className={`assessment-card ${assessment.status}`}>
            <h3>{assessment.title}</h3>
            <div className="assessment-details">
              <p>Date: {assessment.date}</p>
              <p>Status: <span className={`status ${assessment.status}`}>{assessment.status}</span></p>
              {assessment.score && <p>Score: <span className="score">{assessment.score}%</span></p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportForm = () => (
    <div className="report-section">
      <h2>Report a Trainer</h2>
      <p>Use this form to report any issues or concerns about a trainer. All reports are confidential.</p>
      
      {!showReportForm ? (
        <button 
          className="btn btn-primary"
          onClick={() => setShowReportForm(true)}
        >
          Submit a Report
        </button>
      ) : (
        <form onSubmit={handleReportSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="trainer">Trainer Name</label>
            <input
              type="text"
              id="trainer"
              value={reportData.trainer}
              onChange={(e) => setReportData({...reportData, trainer: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={reportData.subject}
              onChange={(e) => setReportData({...reportData, subject: e.target.value})}
              required
            >
              <option value="">Select a subject</option>
              <option value="inappropriate-behavior">Inappropriate Behavior</option>
              <option value="poor-teaching">Poor Teaching Quality</option>
              <option value="attendance-issues">Attendance Issues</option>
              <option value="discrimination">Discrimination</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={reportData.description}
              onChange={(e) => setReportData({...reportData, description: e.target.value})}
              rows="5"
              required
              placeholder="Please provide detailed information about the issue..."
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Submit Report</button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setShowReportForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'progress':
        return renderProgress();
      case 'assessments':
        return renderAssessments();
      case 'schedule':
        return (
          <div className="section-content">
            <h2>Class Schedule</h2>
            <p>View your upcoming classes and training sessions.</p>
          </div>
        );
      case 'report':
        return renderReportForm();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>Student Portal</h1>
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

export default StudentDashboard;
