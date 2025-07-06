import React, { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'BCFSA Orphanage Home',
      subtitle: 'A Safe Haven for Vulnerable Children',
      description: 'Our flagship project aims to provide a modern, comprehensive care facility for orphaned and vulnerable children in Niger State. This state-of-the-art facility will combine residential care with educational and skills training opportunities.',
      status: 'Proposed',
      category: 'Child Care',
      image: '/api/placeholder/600/400',
      gallery: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ],
      features: [
        'Modern residential quarters for 200+ children',
        'Fully equipped classrooms and learning centers',
        'Medical clinic and health facilities',
        'Recreational and sports facilities',
        'Skills training workshops',
        'Agricultural training farm',
        'Library and computer center',
        'Counseling and therapy rooms'
      ],
      objectives: [
        'Provide safe, nurturing environment for orphaned children',
        'Ensure quality education and skills development',
        'Prepare children for independent living',
        'Integrate with community development programs',
        'Create sustainable support systems'
      ],
      timeline: [
        { phase: 'Planning & Design', duration: '6 months', status: 'In Progress' },
        { phase: 'Funding & Approvals', duration: '4 months', status: 'Pending' },
        { phase: 'Construction Phase 1', duration: '12 months', status: 'Planned' },
        { phase: 'Construction Phase 2', duration: '8 months', status: 'Planned' },
        { phase: 'Commissioning', duration: '2 months', status: 'Planned' }
      ],
      budget: {
        total: '₦2.5 Billion',
        raised: '₦150 Million',
        percentage: 6
      }
    },
    {
      id: 2,
      title: 'Skills Training Center Expansion',
      subtitle: 'Expanding Our Training Capacity',
      description: 'Expansion of our existing training facilities to accommodate more students and introduce new programs in emerging technologies and modern crafts.',
      status: 'Ongoing',
      category: 'Education',
      image: '/api/placeholder/600/400',
      gallery: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ],
      features: [
        'Additional 10 modern classrooms',
        'Advanced computer laboratory',
        'Digital marketing studio',
        'Modern culinary training kitchen',
        'Automotive workshop',
        'Fashion design studio'
      ],
      objectives: [
        'Increase training capacity by 300%',
        'Introduce new technology programs',
        'Enhance practical training facilities',
        'Improve student-to-trainer ratio'
      ],
      timeline: [
        { phase: 'Design & Planning', duration: '3 months', status: 'Completed' },
        { phase: 'Construction', duration: '8 months', status: 'In Progress' },
        { phase: 'Equipment Installation', duration: '2 months', status: 'Planned' },
        { phase: 'Testing & Commissioning', duration: '1 month', status: 'Planned' }
      ],
      budget: {
        total: '₦800 Million',
        raised: '₦600 Million',
        percentage: 75
      }
    },
    {
      id: 3,
      title: 'Community Outreach Program',
      subtitle: 'Bringing Skills to Rural Communities',
      description: 'Mobile training units and community centers to extend our reach to rural areas across Niger State, ensuring no one is left behind in skills development.',
      status: 'Planning',
      category: 'Community Development',
      image: '/api/placeholder/600/400',
      gallery: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ],
      features: [
        'Mobile training units',
        'Community learning centers',
        'Local trainer development',
        'Rural entrepreneurship support',
        'Agricultural skills training'
      ],
      objectives: [
        'Reach 50 rural communities',
        'Train 5,000 rural youth annually',
        'Establish 20 community centers',
        'Create local employment opportunities'
      ],
      timeline: [
        { phase: 'Community Assessment', duration: '4 months', status: 'In Progress' },
        { phase: 'Resource Mobilization', duration: '6 months', status: 'Planned' },
        { phase: 'Implementation Phase 1', duration: '12 months', status: 'Planned' },
        { phase: 'Evaluation & Expansion', duration: '6 months', status: 'Planned' }
      ],
      budget: {
        total: '₦1.2 Billion',
        raised: '₦200 Million',
        percentage: 17
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return '#28a745';
      case 'in progress': return '#007bff';
      case 'ongoing': return '#007bff';
      case 'planned': return '#6c757d';
      case 'pending': return '#ffc107';
      case 'proposed': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  return (
    <div className="projects-page">
      <div className="projects-hero">
        <div className="hero-content">
          <h1>Our Projects</h1>
          <p>Building a Better Future Through Strategic Initiatives</p>
          <div className="hero-stats">
            <div className="stat">
              <h3>3</h3>
              <p>Active Projects</p>
            </div>
            <div className="stat">
              <h3>₦4.5B</h3>
              <p>Total Investment</p>
            </div>
            <div className="stat">
              <h3>10,000+</h3>
              <p>Lives Impacted</p>
            </div>
          </div>
        </div>
      </div>

      <div className="projects-container">
        <div className="projects-sidebar">
          <h3>Project Categories</h3>
          <div className="project-tabs">
            {projects.map((project, index) => (
              <button
                key={project.id}
                className={`project-tab ${activeProject === index ? 'active' : ''}`}
                onClick={() => setActiveProject(index)}
              >
                <div className="tab-content">
                  <h4>{project.title}</h4>
                  <span className="tab-category">{project.category}</span>
                  <span 
                    className="tab-status"
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="project-details">
          {projects[activeProject] && (
            <div className="project-content">
              <div className="project-header">
                <div className="project-title-section">
                  <h2>{projects[activeProject].title}</h2>
                  <h3>{projects[activeProject].subtitle}</h3>
                  <div className="project-meta">
                    <span className="category-badge">{projects[activeProject].category}</span>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(projects[activeProject].status) }}
                    >
                      {projects[activeProject].status}
                    </span>
                  </div>
                </div>
                <div className="project-image">
                  <img src={projects[activeProject].image} alt={projects[activeProject].title} />
                </div>
              </div>

              <div className="project-description">
                <p>{projects[activeProject].description}</p>
              </div>

              <div className="project-sections">
                <div className="section">
                  <h4>Key Features</h4>
                  <ul className="features-list">
                    {projects[activeProject].features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h4>Project Objectives</h4>
                  <ul className="objectives-list">
                    {projects[activeProject].objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h4>Project Timeline</h4>
                  <div className="timeline">
                    {projects[activeProject].timeline.map((phase, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker">
                          <div 
                            className="marker-dot"
                            style={{ backgroundColor: getStatusColor(phase.status) }}
                          ></div>
                        </div>
                        <div className="timeline-content">
                          <h5>{phase.phase}</h5>
                          <p>Duration: {phase.duration}</p>
                          <span 
                            className="phase-status"
                            style={{ color: getStatusColor(phase.status) }}
                          >
                            {phase.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section">
                  <h4>Project Budget</h4>
                  <div className="budget-info">
                    <div className="budget-stats">
                      <div className="budget-item">
                        <label>Total Budget:</label>
                        <span className="budget-amount">{projects[activeProject].budget.total}</span>
                      </div>
                      <div className="budget-item">
                        <label>Funds Raised:</label>
                        <span className="budget-amount raised">{projects[activeProject].budget.raised}</span>
                      </div>
                    </div>
                    <div className="budget-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${projects[activeProject].budget.percentage}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{projects[activeProject].budget.percentage}% Funded</span>
                    </div>
                  </div>
                </div>

                {projects[activeProject].gallery && (
                  <div className="section">
                    <h4>Project Gallery</h4>
                    <div className="project-gallery">
                      {projects[activeProject].gallery.map((image, index) => (
                        <div key={index} className="gallery-item">
                          <img src={image} alt={`${projects[activeProject].title} ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="project-actions">
                <button className="btn btn-primary">Support This Project</button>
                <button className="btn btn-secondary">Download Proposal</button>
                <button className="btn btn-outline">Share Project</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="support-section">
        <div className="support-content">
          <h2>Support Our Mission</h2>
          <p>Your contribution can make a significant difference in the lives of vulnerable children and youth in Niger State.</p>
          <div className="support-options">
            <div className="support-option">
              <h4>Financial Support</h4>
              <p>Direct donations to fund our projects</p>
              <button className="btn btn-primary">Donate Now</button>
            </div>
            <div className="support-option">
              <h4>Partnership</h4>
              <p>Collaborate with us on specific initiatives</p>
              <button className="btn btn-secondary">Partner With Us</button>
            </div>
            <div className="support-option">
              <h4>Volunteer</h4>
              <p>Contribute your time and skills</p>
              <button className="btn btn-outline">Join Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
