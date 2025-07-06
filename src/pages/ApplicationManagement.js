import React, { useState, useEffect } from 'react';
import './ApplicationManagement.css';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: '', status: '' });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filter.type) queryParams.append('type', filter.type);
      if (filter.status) queryParams.append('status', filter.status);

      const response = await fetch(`http://localhost:5002/api/applications?${queryParams}`);
      const result = await response.json();

      if (result.success) {
        setApplications(result.data);
      } else {
        console.error('Failed to fetch applications:', result.message);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      setActionLoading(true);
      const response = await fetch(`http://localhost:5002/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus,
          reviewNotes: reviewNotes
        })
      });

      const result = await response.json();

      if (result.success) {
        // Refresh applications
        fetchApplications();
        setShowModal(false);
        setSelectedApplication(null);
        setReviewNotes('');
        alert(`Application ${newStatus} successfully!`);
      } else {
        alert('Failed to update application status: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Error updating application status');
    } finally {
      setActionLoading(false);
    }
  };

  const openReviewModal = (application) => {
    setSelectedApplication(application);
    setReviewNotes('');
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      approved: 'status-approved',
      rejected: 'status-rejected',
      withdrawn: 'status-withdrawn'
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getApplicationTypeIcon = (type) => {
    const icons = {
      trainee: '🎓',
      trainer: '👨‍🏫',
      staff: '👥'
    };
    return icons[type] || '📄';
  };

  return (
    <div className="application-management">
      <div className="container">
        <div className="page-header">
          <h1>Application Management</h1>
          <p>Review and manage all submitted applications</p>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Filter by Type:</label>
            <select 
              value={filter.type} 
              onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">All Types</option>
              <option value="trainee">Trainee</option>
              <option value="trainer">Trainer</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select 
              value={filter.status} 
              onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading applications...</div>
        ) : (
          <div className="applications-grid">
            {applications.length === 0 ? (
              <div className="no-applications">
                <p>No applications found matching your criteria.</p>
              </div>
            ) : (
              applications.map(application => (
                <div key={application.id} className="application-card">
                  <div className="application-header">
                    <div className="applicant-info">
                      <span className="application-icon">
                        {getApplicationTypeIcon(application.applicationType)}
                      </span>
                      <div>
                        <h3>{application.firstName} {application.lastName}</h3>
                        <p className="application-type">{application.applicationType}</p>
                      </div>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>

                  <div className="application-details">
                    <div className="detail-item">
                      <strong>Email:</strong> {application.email}
                    </div>
                    <div className="detail-item">
                      <strong>Phone:</strong> {application.phone}
                    </div>
                    {application.position && (
                      <div className="detail-item">
                        <strong>Position:</strong> {application.position}
                      </div>
                    )}
                    {application.programTitle && (
                      <div className="detail-item">
                        <strong>Program:</strong> {application.programTitle}
                      </div>
                    )}
                    <div className="detail-item">
                      <strong>Applied:</strong> {new Date(application.applicationDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="application-actions">
                    <button 
                      className="btn btn-view"
                      onClick={() => openReviewModal(application)}
                    >
                      Review
                    </button>
                    {application.status === 'pending' && (
                      <>
                        <button 
                          className="btn btn-approve"
                          onClick={() => handleStatusUpdate(application.id, 'approved')}
                          disabled={actionLoading}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn btn-reject"
                          onClick={() => handleStatusUpdate(application.id, 'rejected')}
                          disabled={actionLoading}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Review Modal */}
        {showModal && selectedApplication && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Review Application</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
              </div>

              <div className="modal-body">
                <div className="applicant-summary">
                  <h3>{selectedApplication.firstName} {selectedApplication.lastName}</h3>
                  <p>{selectedApplication.applicationType} Application</p>
                  {getStatusBadge(selectedApplication.status)}
                </div>

                <div className="application-info">
                  <div className="info-section">
                    <h4>Personal Information</h4>
                    <p><strong>Email:</strong> {selectedApplication.email}</p>
                    <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                    <p><strong>Date of Birth:</strong> {selectedApplication.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {selectedApplication.gender}</p>
                    <p><strong>Address:</strong> {selectedApplication.address}</p>
                  </div>

                  {selectedApplication.position && (
                    <div className="info-section">
                      <h4>Position Information</h4>
                      <p><strong>Position:</strong> {selectedApplication.position}</p>
                      {selectedApplication.experience_years && (
                        <p><strong>Experience:</strong> {selectedApplication.experience_years} years</p>
                      )}
                    </div>
                  )}

                  {selectedApplication.programTitle && (
                    <div className="info-section">
                      <h4>Program Information</h4>
                      <p><strong>Program:</strong> {selectedApplication.programTitle}</p>
                      {selectedApplication.education && (
                        <p><strong>Education:</strong> {selectedApplication.education}</p>
                      )}
                    </div>
                  )}

                  <div className="info-section">
                    <h4>Emergency Contact</h4>
                    <p><strong>Name:</strong> {selectedApplication.emergencyContactName}</p>
                    <p><strong>Phone:</strong> {selectedApplication.emergencyContactPhone}</p>
                    {selectedApplication.emergencyContactRelationship && (
                      <p><strong>Relationship:</strong> {selectedApplication.emergencyContactRelationship}</p>
                    )}
                  </div>
                </div>

                {selectedApplication.status === 'pending' && (
                  <div className="review-section">
                    <h4>Review Notes</h4>
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add review notes (optional)..."
                      rows="4"
                    />
                  </div>
                )}
              </div>

              {selectedApplication.status === 'pending' && (
                <div className="modal-actions">
                  <button 
                    className="btn btn-approve"
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'approved')}
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Processing...' : 'Approve Application'}
                  </button>
                  <button 
                    className="btn btn-reject"
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Processing...' : 'Reject Application'}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationManagement;
