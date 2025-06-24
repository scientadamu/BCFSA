import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSidebar } from '../contexts/SidebarContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { sidebarCollapsed, setSidebarCollapsed } = useSidebar();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // Reset sidebar state when component mounts
    return () => {
      setSidebarCollapsed(false);
    };
  }, [setSidebarCollapsed]);

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Overview', description: 'Dashboard overview and statistics' },
    { id: 'users', icon: '👥', label: 'User Management', description: 'Manage staff and student accounts' },
    { id: 'programs', icon: '📚', label: 'Programs', description: 'Manage training programs' },
    { id: 'students', icon: '🎓', label: 'Students', description: 'Student enrollment and records' },
    { id: 'trainers', icon: '👨‍🏫', label: 'Trainers', description: 'Trainer management and assignments' },
    { id: 'assessments', icon: '📝', label: 'Assessments', description: 'Assessment management and results' },
    { id: 'reports', icon: '📈', label: 'Reports', description: 'Generate and view reports' },
    { id: 'settings', icon: '⚙️', label: 'Settings', description: 'System settings and configuration' }
  ];

  const stats = [
    { title: 'Total Students', value: '1,234', change: '+12%', icon: '🎓', color: '#4caf50' },
    { title: 'Active Programs', value: '8', change: '+2', icon: '📚', color: '#2196f3' },
    { title: 'Trainers', value: '24', change: '+3', icon: '👨‍🏫', color: '#ff9800' },
    { title: 'Completion Rate', value: '87%', change: '+5%', icon: '📊', color: '#9c27b0' }
  ];

  const recentActivities = [
    { type: 'enrollment', message: 'New student enrolled in Computer Training', time: '2 hours ago' },
    { type: 'completion', message: 'John Doe completed Fashion Design program', time: '4 hours ago' },
    { type: 'assessment', message: 'Assessment created for Catering Services', time: '6 hours ago' },
    { type: 'trainer', message: 'New trainer assigned to Knitting program', time: '1 day ago' }
  ];

  const renderOverview = () => (
    <div className="overview-section">
      <div className="welcome-card">
        <h2>Welcome back, {user?.name}!</h2>
        <p>Here's what's happening at BCFSA today.</p>
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
            <button className="action-btn" onClick={() => setActiveSection('assessments')}>
              <span className="action-icon">📝</span>
              Create Assessment
            </button>
            <button className="action-btn" onClick={() => setActiveSection('reports')}>
              <span className="action-icon">📈</span>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'users':
        return (
          <div className="section-content">
            <h2>User Management</h2>
            <p>Create and manage staff accounts. Only administrators can create new accounts.</p>
            <div className="placeholder-content">
              <div className="feature-card">
                <h3>Create Staff Account</h3>
                <p>Add new trainers, administrators, or corp members to the system.</p>
                <button className="btn btn-primary">Create Account</button>
              </div>
            </div>
          </div>
        );
      case 'programs':
        return (
          <div className="section-content">
            <h2>Program Management</h2>
            <p>Manage training programs, schedules, and curriculum.</p>
            <div className="placeholder-content">
              <div className="feature-card">
                <h3>Current Programs</h3>
                <p>Computer Training, Fashion Design, Catering, Shoe Cobbling, Jewelry Making, Local Weaving, Knitting, Kuli-kuli Production</p>
              </div>
            </div>
          </div>
        );
      case 'students':
        return (
          <div className="section-content">
            <h2>Student Management</h2>
            <p>View and manage student enrollments, progress, and records.</p>
            <div className="placeholder-content">
              <div className="feature-card">
                <h3>Student Records</h3>
                <p>Access comprehensive student information and academic progress.</p>
              </div>
            </div>
          </div>
        );
      case 'trainers':
        return (
          <div className="section-content">
            <h2>Trainer Management</h2>
            <p>Manage trainer assignments, schedules, and performance.</p>
            <div className="placeholder-content">
              <div className="feature-card">
                <h3>Trainer Assignments</h3>
                <p>Assign trainers to programs and manage their schedules.</p>
              </div>
            </div>
          </div>
        );
      case 'assessments':
        return (
          <div className="section-content">
            <h2>Assessment Management</h2>
            <p>Create, manage, and review student assessments and evaluations.</p>
            <div className="placeholder-content">
              <div className="feature-card">
                <h3>Assessment Tools</h3>
                <p>Create comprehensive assessments for all training programs.</p>
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="section-content">
            <h2>Reports & Analytics</h2>
            <p>Generate detailed reports on student progress, program effectiveness, and institutional performance.</p>
            <div className="placeholder-content">
              <div className="feature-card">
                <h3>Report Generator</h3>
                <p>Create custom reports for stakeholders and management.</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="section-content">
            <h2>System Settings</h2>
            <p>Configure system settings, preferences, and administrative options.</p>
            <div className="placeholder-content">
              <div className="feature-card">
                <h3>Configuration</h3>
                <p>Manage system-wide settings and preferences.</p>
              </div>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🎓</span>
            {!sidebarCollapsed && <span className="logo-text">BCFSA Admin</span>}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
              title={sidebarCollapsed ? item.label : ''}
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
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
