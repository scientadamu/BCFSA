import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './CorpDashboard.css';

const CorpDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [clearanceMonth, setClearanceMonth] = useState('');

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'clearance', icon: '📄', label: 'Monthly Clearance' },
    { id: 'activities', icon: '📅', label: 'Activities' },
    { id: 'reports', icon: '📝', label: 'Reports' }
  ];

  const clearanceData = {
    currentMonth: 'January 2024',
    status: 'Pending',
    daysPresent: 20,
    totalDays: 22,
    activities: [
      'Assisted in Computer Training classes',
      'Helped with student registration',
      'Participated in community outreach',
      'Supported administrative tasks'
    ]
  };

  const handlePrintClearance = () => {
    if (!clearanceMonth) {
      alert('Please select a month for clearance');
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const clearanceContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>NYSC Monthly Clearance - ${clearanceMonth}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #0056b3; }
          .clearance-form { max-width: 600px; margin: 0 auto; }
          .form-row { display: flex; justify-content: space-between; margin: 10px 0; }
          .form-row label { font-weight: bold; }
          .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
          .signature-box { text-align: center; width: 200px; }
          .signature-line { border-bottom: 1px solid #000; margin-bottom: 5px; height: 40px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BAGO CENTER FOR SKILLS ACQUISITION (BCFSA)</div>
          <h2>NYSC MONTHLY CLEARANCE CERTIFICATE</h2>
        </div>
        
        <div class="clearance-form">
          <div class="form-row">
            <label>Corp Member Name:</label>
            <span>${user?.name || 'N/A'}</span>
          </div>
          <div class="form-row">
            <label>State Code:</label>
            <span>NR/XX/XXXX</span>
          </div>
          <div class="form-row">
            <label>Month/Year:</label>
            <span>${clearanceMonth}</span>
          </div>
          <div class="form-row">
            <label>Days Present:</label>
            <span>${clearanceData.daysPresent}</span>
          </div>
          <div class="form-row">
            <label>Total Working Days:</label>
            <span>${clearanceData.totalDays}</span>
          </div>
          <div class="form-row">
            <label>Attendance Percentage:</label>
            <span>${Math.round((clearanceData.daysPresent / clearanceData.totalDays) * 100)}%</span>
          </div>
          
          <h3>Activities Performed:</h3>
          <ul>
            ${clearanceData.activities.map(activity => `<li>${activity}</li>`).join('')}
          </ul>
          
          <div class="signature-section">
            <div class="signature-box">
              <div class="signature-line"></div>
              <p>Corp Member Signature</p>
            </div>
            <div class="signature-box">
              <div class="signature-line"></div>
              <p>Supervisor Signature</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p><strong>Official Stamp</strong></p>
            <div style="border: 2px solid #000; width: 150px; height: 100px; margin: 0 auto;"></div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(clearanceContent);
    printWindow.document.close();
    printWindow.print();
  };

  const renderOverview = () => (
    <div className="overview-section">
      <div className="welcome-card">
        <h2>Welcome, {user?.name}!</h2>
        <p>NYSC Corp Member Portal - Manage your service activities and clearance.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{clearanceData.currentMonth}</h3>
            <p>Current Month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{clearanceData.daysPresent}/{clearanceData.totalDays}</h3>
            <p>Days Present</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{Math.round((clearanceData.daysPresent / clearanceData.totalDays) * 100)}%</h3>
            <p>Attendance Rate</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn"
            onClick={() => setActiveSection('clearance')}
          >
            <span className="action-icon">📄</span>
            Print Monthly Clearance
          </button>
          <button 
            className="action-btn"
            onClick={() => setActiveSection('activities')}
          >
            <span className="action-icon">📅</span>
            View Activities
          </button>
        </div>
      </div>
    </div>
  );

  const renderClearance = () => (
    <div className="clearance-section">
      <h2>Monthly Clearance</h2>
      <p>Generate and print your monthly clearance certificate for NYSC records.</p>

      <div className="clearance-form">
        <div className="form-group">
          <label htmlFor="clearanceMonth">Select Month:</label>
          <select
            id="clearanceMonth"
            value={clearanceMonth}
            onChange={(e) => setClearanceMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            <option value="January 2024">January 2024</option>
            <option value="February 2024">February 2024</option>
            <option value="March 2024">March 2024</option>
            <option value="April 2024">April 2024</option>
            <option value="May 2024">May 2024</option>
            <option value="June 2024">June 2024</option>
          </select>
        </div>

        <div className="clearance-preview">
          <h3>Clearance Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <label>Corp Member:</label>
              <span>{user?.name}</span>
            </div>
            <div className="summary-item">
              <label>Month:</label>
              <span>{clearanceMonth || 'Not selected'}</span>
            </div>
            <div className="summary-item">
              <label>Days Present:</label>
              <span>{clearanceData.daysPresent}</span>
            </div>
            <div className="summary-item">
              <label>Total Days:</label>
              <span>{clearanceData.totalDays}</span>
            </div>
            <div className="summary-item">
              <label>Attendance:</label>
              <span>{Math.round((clearanceData.daysPresent / clearanceData.totalDays) * 100)}%</span>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary print-btn"
          onClick={handlePrintClearance}
          disabled={!clearanceMonth}
        >
          🖨️ Print Clearance Certificate
        </button>
      </div>
    </div>
  );

  const renderActivities = () => (
    <div className="activities-section">
      <h2>Monthly Activities</h2>
      <div className="activities-list">
        {clearanceData.activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <span className="activity-icon">✓</span>
            <span className="activity-text">{activity}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'clearance':
        return renderClearance();
      case 'activities':
        return renderActivities();
      case 'reports':
        return (
          <div className="section-content">
            <h2>Monthly Reports</h2>
            <p>Submit and view your monthly activity reports.</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="corp-dashboard">
      <div className="dashboard-header">
        <h1>NYSC Corp Member Portal</h1>
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

export default CorpDashboard;
