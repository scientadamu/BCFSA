import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './StudentsRecords.css';

const StudentsRecords = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  // Mock data for development
  const mockStudents = [
    {
      id: 1,
      studentId: 'BCFSA20240001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+234 801 234 5678',
      program: 'Web Development',
      status: 'active',
      enrollmentDate: '2024-01-15',
      progress: 75,
      avatar: '/api/placeholder/40/40',
      address: '123 Main St, Lagos',
      dateOfBirth: '1995-05-20',
      gender: 'male',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+234 802 345 6789',
        relationship: 'Sister'
      },
      academicRecord: {
        totalModules: 12,
        completedModules: 9,
        currentModule: 'React Advanced Concepts',
        overallGrade: 'A',
        attendance: 92
      }
    },
    {
      id: 2,
      studentId: 'BCFSA20240002',
      name: 'Mary Johnson',
      email: 'mary.johnson@email.com',
      phone: '+234 803 456 7890',
      program: 'Digital Marketing',
      status: 'completed',
      enrollmentDate: '2024-01-10',
      progress: 100,
      avatar: '/api/placeholder/40/40',
      address: '456 Oak Ave, Abuja',
      dateOfBirth: '1992-08-15',
      gender: 'female',
      emergencyContact: {
        name: 'Robert Johnson',
        phone: '+234 804 567 8901',
        relationship: 'Father'
      },
      academicRecord: {
        totalModules: 10,
        completedModules: 10,
        currentModule: 'Completed',
        overallGrade: 'A+',
        attendance: 98
      }
    },
    {
      id: 3,
      studentId: 'BCFSA20240003',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+234 805 678 9012',
      program: 'Graphic Design',
      status: 'suspended',
      enrollmentDate: '2024-02-01',
      progress: 45,
      avatar: '/api/placeholder/40/40',
      address: '789 Pine St, Port Harcourt',
      dateOfBirth: '1998-12-03',
      gender: 'male',
      emergencyContact: {
        name: 'Sarah Wilson',
        phone: '+234 806 789 0123',
        relationship: 'Mother'
      },
      academicRecord: {
        totalModules: 8,
        completedModules: 3,
        currentModule: 'Color Theory',
        overallGrade: 'B',
        attendance: 65
      }
    },
    {
      id: 4,
      studentId: 'BCFSA20240004',
      name: 'Sarah Brown',
      email: 'sarah.brown@email.com',
      phone: '+234 807 890 1234',
      program: 'Data Analysis',
      status: 'active',
      enrollmentDate: '2024-02-15',
      progress: 60,
      avatar: '/api/placeholder/40/40',
      address: '321 Elm St, Kano',
      dateOfBirth: '1996-03-10',
      gender: 'female',
      emergencyContact: {
        name: 'Michael Brown',
        phone: '+234 808 901 2345',
        relationship: 'Husband'
      },
      academicRecord: {
        totalModules: 15,
        completedModules: 9,
        currentModule: 'Statistical Analysis',
        overallGrade: 'B+',
        attendance: 88
      }
    },
    {
      id: 5,
      studentId: 'BCFSA20240005',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+234 809 012 3456',
      program: 'Mobile App Development',
      status: 'active',
      enrollmentDate: '2024-03-01',
      progress: 30,
      avatar: '/api/placeholder/40/40',
      address: '654 Cedar Ave, Kaduna',
      dateOfBirth: '1994-07-25',
      gender: 'male',
      emergencyContact: {
        name: 'Fatima Hassan',
        phone: '+234 810 123 4567',
        relationship: 'Wife'
      },
      academicRecord: {
        totalModules: 14,
        completedModules: 4,
        currentModule: 'Flutter Basics',
        overallGrade: 'B',
        attendance: 85
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = students;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm)
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => student.status === filterStatus);
    }

    // Filter by program
    if (filterProgram !== 'all') {
      filtered = filtered.filter(student => student.program === filterProgram);
    }

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterProgram, students]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-active',
      completed: 'status-completed',
      suspended: 'status-suspended',
      dropped: 'status-dropped'
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getProgressBar = (progress) => {
    const getProgressColor = (progress) => {
      if (progress >= 80) return '#4CAF50';
      if (progress >= 60) return '#FF9800';
      if (progress >= 40) return '#FFC107';
      return '#F44336';
    };

    return (
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ 
            width: `${progress}%`,
            backgroundColor: getProgressColor(progress)
          }}
        ></div>
        <span className="progress-text">{progress}%</span>
      </div>
    );
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleExportData = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Email', 'Phone', 'Program', 'Status', 'Progress', 'Enrollment Date'],
      ...filteredStudents.map(student => [
        student.studentId,
        student.name,
        student.email,
        student.phone,
        student.program,
        student.status,
        `${student.progress}%`,
        student.enrollmentDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_records.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="students-records">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading student records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="students-records">
      <div className="records-header">
        <div className="header-content">
          <h1>Student Records</h1>
          <p>Manage and view all student information and academic records</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-export" onClick={handleExportData}>
            📊 Export Data
          </button>
          {(user?.role === 'admin' || user?.role === 'trainer') && (
            <button className="btn btn-primary">
              ➕ Add Student
            </button>
          )}
        </div>
      </div>

      <div className="records-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email, student ID, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="suspended">Suspended</option>
            <option value="dropped">Dropped</option>
          </select>

          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Programs</option>
            <option value="Web Development">Web Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Mobile App Development">Mobile App Development</option>
          </select>
        </div>
      </div>

      <div className="records-summary">
        <div className="summary-card">
          <h3>Total Students</h3>
          <p className="summary-number">{filteredStudents.length}</p>
        </div>
        <div className="summary-card">
          <h3>Active</h3>
          <p className="summary-number active">
            {filteredStudents.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="summary-card">
          <h3>Completed</h3>
          <p className="summary-number completed">
            {filteredStudents.filter(s => s.status === 'completed').length}
          </p>
        </div>
        <div className="summary-card">
          <h3>Suspended</h3>
          <p className="summary-number suspended">
            {filteredStudents.filter(s => s.status === 'suspended').length}
          </p>
        </div>
      </div>

      <div className="records-table-container">
        <table className="records-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Contact</th>
              <th>Program</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Enrollment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map(student => (
              <tr key={student.id}>
                <td>
                  <div className="student-info">
                    <img 
                      src={student.avatar} 
                      alt={student.name}
                      className="student-avatar"
                    />
                    <div>
                      <div className="student-name">{student.name}</div>
                      <div className="student-id">{student.studentId}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div>{student.email}</div>
                    <div className="phone">{student.phone}</div>
                  </div>
                </td>
                <td>{student.program}</td>
                <td>{getStatusBadge(student.status)}</td>
                <td>{getProgressBar(student.progress)}</td>
                <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-view"
                      onClick={() => handleViewDetails(student)}
                    >
                      👁️ View
                    </button>
                    {(user?.role === 'admin' || user?.role === 'trainer') && (
                      <button className="btn btn-sm btn-edit">
                        ✏️ Edit
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      {showModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Student Details</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="student-details">
                <div className="detail-section">
                  <h3>Personal Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Full Name:</label>
                      <span>{selectedStudent.name}</span>
                    </div>
                    <div className="detail-item">
                      <label>Student ID:</label>
                      <span>{selectedStudent.studentId}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{selectedStudent.email}</span>
                    </div>
                    <div className="detail-item">
                      <label>Phone:</label>
                      <span>{selectedStudent.phone}</span>
                    </div>
                    <div className="detail-item">
                      <label>Date of Birth:</label>
                      <span>{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <label>Gender:</label>
                      <span>{selectedStudent.gender}</span>
                    </div>
                    <div className="detail-item">
                      <label>Address:</label>
                      <span>{selectedStudent.address}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Emergency Contact</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Name:</label>
                      <span>{selectedStudent.emergencyContact.name}</span>
                    </div>
                    <div className="detail-item">
                      <label>Phone:</label>
                      <span>{selectedStudent.emergencyContact.phone}</span>
                    </div>
                    <div className="detail-item">
                      <label>Relationship:</label>
                      <span>{selectedStudent.emergencyContact.relationship}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Academic Record</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Program:</label>
                      <span>{selectedStudent.program}</span>
                    </div>
                    <div className="detail-item">
                      <label>Enrollment Date:</label>
                      <span>{new Date(selectedStudent.enrollmentDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <label>Status:</label>
                      <span>{getStatusBadge(selectedStudent.status)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Overall Progress:</label>
                      <span>{getProgressBar(selectedStudent.progress)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Current Module:</label>
                      <span>{selectedStudent.academicRecord.currentModule}</span>
                    </div>
                    <div className="detail-item">
                      <label>Completed Modules:</label>
                      <span>{selectedStudent.academicRecord.completedModules}/{selectedStudent.academicRecord.totalModules}</span>
                    </div>
                    <div className="detail-item">
                      <label>Overall Grade:</label>
                      <span className="grade">{selectedStudent.academicRecord.overallGrade}</span>
                    </div>
                    <div className="detail-item">
                      <label>Attendance:</label>
                      <span>{selectedStudent.academicRecord.attendance}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {(user?.role === 'admin' || user?.role === 'trainer') && (
                <button className="btn btn-primary">
                  Edit Student
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsRecords;
