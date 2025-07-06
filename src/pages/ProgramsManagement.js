import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProgramsManagement.css';

const ProgramsManagement = () => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [programsPerPage] = useState(8);

  // Mock data for development
  const mockPrograms = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      description: 'Comprehensive full-stack web development training covering HTML, CSS, JavaScript, React, Node.js, and database management.',
      category: 'technology',
      level: 'beginner',
      duration: { value: 6, unit: 'months' },
      image: '/api/placeholder/300/200',
      maxStudents: 30,
      currentEnrollment: 25,
      isActive: true,
      isPublished: true,
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      classTime: '9:00 AM - 5:00 PM',
      classDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      curriculum: [
        { module: 'HTML & CSS Fundamentals', duration: '2 weeks', order: 1 },
        { module: 'JavaScript Basics', duration: '3 weeks', order: 2 },
        { module: 'React Development', duration: '4 weeks', order: 3 },
        { module: 'Backend with Node.js', duration: '4 weeks', order: 4 },
        { module: 'Database Management', duration: '3 weeks', order: 5 },
        { module: 'Project Development', duration: '4 weeks', order: 6 }
      ],
      requirements: ['Basic computer literacy', 'High school diploma', 'Commitment to full-time learning'],
      careerPaths: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Web Designer'],
      fees: { amount: 0, currency: 'NGN', isFree: true },
      trainers: ['John Smith', 'Sarah Johnson'],
      createdBy: 'Admin User',
      createdAt: '2023-12-01'
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      description: 'Learn modern digital marketing strategies including SEO, social media marketing, content creation, and analytics.',
      category: 'creative-arts',
      level: 'intermediate',
      duration: { value: 4, unit: 'months' },
      image: '/api/placeholder/300/200',
      maxStudents: 25,
      currentEnrollment: 20,
      isActive: true,
      isPublished: true,
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      classTime: '2:00 PM - 6:00 PM',
      classDays: ['monday', 'wednesday', 'friday'],
      curriculum: [
        { module: 'Digital Marketing Fundamentals', duration: '2 weeks', order: 1 },
        { module: 'SEO & Content Marketing', duration: '3 weeks', order: 2 },
        { module: 'Social Media Marketing', duration: '3 weeks', order: 3 },
        { module: 'Email Marketing', duration: '2 weeks', order: 4 },
        { module: 'Analytics & Reporting', duration: '2 weeks', order: 5 },
        { module: 'Campaign Management', duration: '4 weeks', order: 6 }
      ],
      requirements: ['Basic internet knowledge', 'Creative mindset', 'Communication skills'],
      careerPaths: ['Digital Marketing Specialist', 'SEO Specialist', 'Social Media Manager', 'Content Creator'],
      fees: { amount: 0, currency: 'NGN', isFree: true },
      trainers: ['Mary Wilson', 'David Brown'],
      createdBy: 'Admin User',
      createdAt: '2023-12-15'
    },
    {
      id: 3,
      title: 'Graphic Design Fundamentals',
      description: 'Master the principles of graphic design using industry-standard tools like Adobe Photoshop, Illustrator, and InDesign.',
      category: 'creative-arts',
      level: 'beginner',
      duration: { value: 3, unit: 'months' },
      image: '/api/placeholder/300/200',
      maxStudents: 20,
      currentEnrollment: 18,
      isActive: true,
      isPublished: true,
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      classTime: '10:00 AM - 2:00 PM',
      classDays: ['tuesday', 'thursday', 'saturday'],
      curriculum: [
        { module: 'Design Principles', duration: '2 weeks', order: 1 },
        { module: 'Adobe Photoshop', duration: '3 weeks', order: 2 },
        { module: 'Adobe Illustrator', duration: '3 weeks', order: 3 },
        { module: 'Adobe InDesign', duration: '2 weeks', order: 4 },
        { module: 'Brand Identity Design', duration: '2 weeks', order: 5 }
      ],
      requirements: ['Creative interest', 'Basic computer skills', 'Portfolio submission'],
      careerPaths: ['Graphic Designer', 'Brand Designer', 'UI/UX Designer', 'Freelance Designer'],
      fees: { amount: 0, currency: 'NGN', isFree: true },
      trainers: ['Lisa Anderson'],
      createdBy: 'Admin User',
      createdAt: '2024-01-10'
    },
    {
      id: 4,
      title: 'Data Analysis with Python',
      description: 'Learn data analysis, visualization, and machine learning using Python, pandas, matplotlib, and scikit-learn.',
      category: 'technology',
      level: 'intermediate',
      duration: { value: 5, unit: 'months' },
      image: '/api/placeholder/300/200',
      maxStudents: 15,
      currentEnrollment: 12,
      isActive: true,
      isPublished: true,
      startDate: '2024-02-15',
      endDate: '2024-07-15',
      classTime: '6:00 PM - 9:00 PM',
      classDays: ['monday', 'wednesday', 'friday'],
      curriculum: [
        { module: 'Python Fundamentals', duration: '3 weeks', order: 1 },
        { module: 'Data Manipulation with Pandas', duration: '3 weeks', order: 2 },
        { module: 'Data Visualization', duration: '3 weeks', order: 3 },
        { module: 'Statistical Analysis', duration: '4 weeks', order: 4 },
        { module: 'Machine Learning Basics', duration: '4 weeks', order: 5 },
        { module: 'Capstone Project', duration: '3 weeks', order: 6 }
      ],
      requirements: ['Basic mathematics', 'Logical thinking', 'Computer proficiency'],
      careerPaths: ['Data Analyst', 'Business Analyst', 'Data Scientist', 'Research Analyst'],
      fees: { amount: 0, currency: 'NGN', isFree: true },
      trainers: ['Michael Chen', 'Emily Davis'],
      createdBy: 'Admin User',
      createdAt: '2024-01-20'
    },
    {
      id: 5,
      title: 'Culinary Arts Basics',
      description: 'Learn fundamental cooking techniques, food safety, menu planning, and kitchen management skills.',
      category: 'culinary',
      level: 'beginner',
      duration: { value: 4, unit: 'months' },
      image: '/api/placeholder/300/200',
      maxStudents: 12,
      currentEnrollment: 10,
      isActive: true,
      isPublished: false,
      startDate: '2024-04-01',
      endDate: '2024-08-01',
      classTime: '8:00 AM - 12:00 PM',
      classDays: ['monday', 'tuesday', 'wednesday', 'thursday'],
      curriculum: [
        { module: 'Kitchen Safety & Hygiene', duration: '1 week', order: 1 },
        { module: 'Basic Cooking Techniques', duration: '4 weeks', order: 2 },
        { module: 'Baking Fundamentals', duration: '3 weeks', order: 3 },
        { module: 'Menu Planning', duration: '2 weeks', order: 4 },
        { module: 'Food Presentation', duration: '2 weeks', order: 5 },
        { module: 'Restaurant Operations', duration: '4 weeks', order: 6 }
      ],
      requirements: ['Physical fitness', 'Interest in cooking', 'Food handler certification'],
      careerPaths: ['Chef', 'Baker', 'Restaurant Manager', 'Catering Specialist'],
      fees: { amount: 0, currency: 'NGN', isFree: true },
      trainers: ['Chef Robert Taylor'],
      createdBy: 'Admin User',
      createdAt: '2024-02-01'
    },
    {
      id: 6,
      title: 'Mobile App Development',
      description: 'Build mobile applications for iOS and Android using React Native and Flutter frameworks.',
      category: 'technology',
      level: 'advanced',
      duration: { value: 8, unit: 'months' },
      image: '/api/placeholder/300/200',
      maxStudents: 20,
      currentEnrollment: 8,
      isActive: true,
      isPublished: true,
      startDate: '2024-03-15',
      endDate: '2024-11-15',
      classTime: '9:00 AM - 1:00 PM',
      classDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      curriculum: [
        { module: 'Mobile Development Fundamentals', duration: '2 weeks', order: 1 },
        { module: 'React Native Basics', duration: '4 weeks', order: 2 },
        { module: 'Flutter Development', duration: '4 weeks', order: 3 },
        { module: 'API Integration', duration: '3 weeks', order: 4 },
        { module: 'Database & Storage', duration: '3 weeks', order: 5 },
        { module: 'App Store Deployment', duration: '2 weeks', order: 6 },
        { module: 'Final Project', duration: '6 weeks', order: 7 }
      ],
      requirements: ['Programming experience', 'JavaScript knowledge', 'Portfolio of projects'],
      careerPaths: ['Mobile App Developer', 'iOS Developer', 'Android Developer', 'Cross-platform Developer'],
      fees: { amount: 0, currency: 'NGN', isFree: true },
      trainers: ['Alex Johnson', 'Nina Patel'],
      createdBy: 'Admin User',
      createdAt: '2024-02-10'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPrograms(mockPrograms);
      setFilteredPrograms(mockPrograms);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = programs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(program => program.category === filterCategory);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      if (filterStatus === 'active') {
        filtered = filtered.filter(program => program.isActive && program.isPublished);
      } else if (filterStatus === 'draft') {
        filtered = filtered.filter(program => !program.isPublished);
      } else if (filterStatus === 'inactive') {
        filtered = filtered.filter(program => !program.isActive);
      }
    }

    setFilteredPrograms(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterCategory, filterStatus, programs]);

  const getStatusBadge = (program) => {
    if (!program.isActive) {
      return <span className="status-badge status-inactive">Inactive</span>;
    } else if (!program.isPublished) {
      return <span className="status-badge status-draft">Draft</span>;
    } else {
      return <span className="status-badge status-active">Active</span>;
    }
  };

  const getEnrollmentStatus = (program) => {
    const percentage = (program.currentEnrollment / program.maxStudents) * 100;
    if (percentage >= 100) {
      return { status: 'full', color: '#dc3545' };
    } else if (percentage >= 80) {
      return { status: 'almost-full', color: '#ffc107' };
    } else {
      return { status: 'available', color: '#28a745' };
    }
  };

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const handleCreateProgram = () => {
    setShowCreateModal(true);
  };

  const handleExportData = () => {
    const csvContent = [
      ['Title', 'Category', 'Level', 'Duration', 'Enrollment', 'Status', 'Start Date'],
      ...filteredPrograms.map(program => [
        program.title,
        program.category,
        program.level,
        `${program.duration.value} ${program.duration.unit}`,
        `${program.currentEnrollment}/${program.maxStudents}`,
        program.isActive && program.isPublished ? 'Active' : program.isPublished ? 'Inactive' : 'Draft',
        program.startDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'programs_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="programs-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="programs-management">
      <div className="programs-header">
        <div className="header-content">
          <h1>Programs Management</h1>
          <p>Manage training programs, curriculum, and enrollment</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-export" onClick={handleExportData}>
            📊 Export Data
          </button>
          {(user?.role === 'admin' || user?.role === 'trainer') && (
            <button className="btn btn-primary" onClick={handleCreateProgram}>
              ➕ Create Program
            </button>
          )}
        </div>
      </div>

      <div className="programs-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search programs by title, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="creative-arts">Creative Arts</option>
            <option value="culinary">Culinary</option>
            <option value="crafts">Crafts</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="programs-summary">
        <div className="summary-card">
          <h3>Total Programs</h3>
          <p className="summary-number">{filteredPrograms.length}</p>
        </div>
        <div className="summary-card">
          <h3>Active</h3>
          <p className="summary-number active">
            {filteredPrograms.filter(p => p.isActive && p.isPublished).length}
          </p>
        </div>
        <div className="summary-card">
          <h3>Draft</h3>
          <p className="summary-number draft">
            {filteredPrograms.filter(p => !p.isPublished).length}
          </p>
        </div>
        <div className="summary-card">
          <h3>Total Enrollment</h3>
          <p className="summary-number enrollment">
            {filteredPrograms.reduce((sum, p) => sum + p.currentEnrollment, 0)}
          </p>
        </div>
      </div>

      <div className="programs-grid">
        {currentPrograms.map(program => {
          const enrollmentStatus = getEnrollmentStatus(program);
          return (
            <div key={program.id} className="program-card">
              <div className="program-image">
                <img src={program.image} alt={program.title} />
                <div className="program-status">
                  {getStatusBadge(program)}
                </div>
              </div>
              
              <div className="program-content">
                <div className="program-header">
                  <h3>{program.title}</h3>
                  <span className="program-category">{program.category}</span>
                </div>
                
                <p className="program-description">
                  {program.description.substring(0, 120)}...
                </p>
                
                <div className="program-details">
                  <div className="detail-item">
                    <span className="label">Duration:</span>
                    <span>{program.duration.value} {program.duration.unit}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Level:</span>
                    <span className="level-badge">{program.level}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Enrollment:</span>
                    <span style={{ color: enrollmentStatus.color }}>
                      {program.currentEnrollment}/{program.maxStudents}
                    </span>
                  </div>
                </div>
                
                <div className="program-actions">
                  <button 
                    className="btn btn-sm btn-view"
                    onClick={() => handleViewDetails(program)}
                  >
                    👁️ View Details
                  </button>
                  {(user?.role === 'admin' || user?.role === 'trainer') && (
                    <button className="btn btn-sm btn-edit">
                      ✏️ Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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

      {showModal && selectedProgram && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content program-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProgram.title}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="program-details-full">
                <div className="detail-section">
                  <h3>Program Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Category:</label>
                      <span>{selectedProgram.category}</span>
                    </div>
                    <div className="detail-item">
                      <label>Level:</label>
                      <span className="level-badge">{selectedProgram.level}</span>
                    </div>
                    <div className="detail-item">
                      <label>Duration:</label>
                      <span>{selectedProgram.duration.value} {selectedProgram.duration.unit}</span>
                    </div>
                    <div className="detail-item">
                      <label>Status:</label>
                      <span>{getStatusBadge(selectedProgram)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Max Students:</label>
                      <span>{selectedProgram.maxStudents}</span>
                    </div>
                    <div className="detail-item">
                      <label>Current Enrollment:</label>
                      <span>{selectedProgram.currentEnrollment}</span>
                    </div>
                    <div className="detail-item">
                      <label>Start Date:</label>
                      <span>{new Date(selectedProgram.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <label>End Date:</label>
                      <span>{new Date(selectedProgram.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Description</h3>
                  <p>{selectedProgram.description}</p>
                </div>

                <div className="detail-section">
                  <h3>Schedule</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Class Time:</label>
                      <span>{selectedProgram.classTime}</span>
                    </div>
                    <div className="detail-item">
                      <label>Class Days:</label>
                      <span>{selectedProgram.classDays.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Curriculum</h3>
                  <div className="curriculum-list">
                    {selectedProgram.curriculum.map((module, index) => (
                      <div key={index} className="curriculum-item">
                        <div className="module-order">{module.order}</div>
                        <div className="module-details">
                          <h4>{module.module}</h4>
                          <span className="module-duration">{module.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Requirements</h3>
                  <ul className="requirements-list">
                    {selectedProgram.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3>Career Paths</h3>
                  <div className="career-paths">
                    {selectedProgram.careerPaths.map((path, index) => (
                      <span key={index} className="career-path-badge">{path}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Trainers</h3>
                  <div className="trainers-list">
                    {selectedProgram.trainers.map((trainer, index) => (
                      <span key={index} className="trainer-badge">{trainer}</span>
                    ))}
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
                <>
                  <button className="btn btn-primary">
                    Edit Program
                  </button>
                  <button className="btn btn-success">
                    Manage Enrollment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsManagement;
