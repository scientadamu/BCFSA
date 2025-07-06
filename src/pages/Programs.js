import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Programs.css';

const Programs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const programs = [
    // Skills Training Programs
    {
      id: 'gbv-services',
      title: 'Gender-Based Violence Prevention & Support',
      category: 'social-services',
      duration: 'Ongoing',
      level: 'Community Support',
      image: require('../assets/images/general/genderBaseViolence.jpg'),
      description: 'Comprehensive support services, advocacy programs, and empowerment initiatives to combat gender-based violence.',
      curriculum: [
        'Crisis intervention and support',
        'Counseling and therapy services',
        'Legal assistance and advocacy',
        'Economic empowerment programs',
        'Community awareness campaigns'
      ],
      requirements: 'Open to all community members',
      certification: 'Support Services Access',
      careerPaths: ['Survivor Support', 'Community Advocacy', 'Legal Assistance', 'Counseling Services'],
      link: '/gender-violence-services'
    },
    {
      id: 'women-support',
      title: 'Women Support & Empowerment',
      category: 'social-services',
      duration: '6 months',
      level: 'All Levels',
      image: require('../assets/images/general/marriage.jpg'),
      description: 'Support and empowerment programs for divorcees, widows, and vulnerable women in our community.',
      curriculum: [
        'Emotional support and counseling',
        'Skills training and development',
        'Economic empowerment initiatives',
        'Community building activities',
        'Leadership development'
      ],
      requirements: 'Women in need of support',
      certification: 'Women Empowerment Certificate',
      careerPaths: ['Entrepreneur', 'Community Leader', 'Skilled Artisan', 'Business Owner'],
      link: '/women-support'
    },
    {
      id: 'orphanage-services',
      title: 'Orphanage & Child Care Services',
      category: 'social-services',
      duration: 'Long-term Care',
      level: 'Child Support',
      image: require('../assets/images/general/ProposedOphanageHome.jpg'),
      description: 'Comprehensive care and support for orphaned and vulnerable children, providing education, healthcare, and nurturing environment.',
      curriculum: [
        'Safe housing and accommodation',
        'Quality education programs',
        'Healthcare and nutrition',
        'Psychological support',
        'Life skills development'
      ],
      requirements: 'Orphaned and vulnerable children',
      certification: 'Educational Certificates',
      careerPaths: ['Education', 'Healthcare', 'Social Work', 'Community Service'],
      link: '/orphanage-services'
    },
    {
      id: 1,
      title: 'Computer Training',
      category: 'technology',
      duration: '3 months',
      level: 'Beginner to Intermediate',
      image: require('../assets/images/computer/computer.jpg'),
      description: 'Comprehensive computer literacy program covering essential skills for the modern workplace.',
      curriculum: [
        'Microsoft Office Suite (Word, Excel, PowerPoint)',
        'Internet and Email Usage',
        'Basic Computer Troubleshooting',
        'Introduction to Programming',
        'Digital Literacy and Online Safety'
      ],
      requirements: 'Basic literacy skills',
      certification: 'BCFSA Computer Literacy Certificate',
      careerPaths: ['Office Assistant', 'Data Entry Clerk', 'Computer Operator', 'IT Support']
    },
    {
      id: 2,
      title: 'Fashion Design',
      category: 'creative',
      duration: '6 months',
      level: 'Beginner to Advanced',
      image: require('../assets/images/fashion/fashion.jpg'),
      description: 'Master the art of fashion design from concept to finished garment.',
      curriculum: [
        'Fashion Design Principles',
        'Pattern Making and Drafting',
        'Garment Construction Techniques',
        'Fabric Selection and Care',
        'Fashion Business and Marketing'
      ],
      requirements: 'Creativity and basic sewing knowledge helpful',
      certification: 'BCFSA Fashion Design Certificate',
      careerPaths: ['Fashion Designer', 'Tailor', 'Fashion Entrepreneur', 'Costume Designer']
    },
    {
      id: 3,
      title: 'Catering Services',
      category: 'culinary',
      duration: '4 months',
      level: 'Beginner to Professional',
      image: require('../assets/images/general/catering.png'),
      description: 'Professional cooking and catering business management training.',
      curriculum: [
        'Professional Cooking Techniques',
        'Food Safety and Hygiene',
        'Menu Planning and Costing',
        'Catering Business Management',
        'Customer Service Excellence'
      ],
      requirements: 'Interest in cooking and food service',
      certification: 'BCFSA Catering Services Certificate',
      careerPaths: ['Professional Chef', 'Caterer', 'Restaurant Manager', 'Food Entrepreneur']
    },
    {
      id: 4,
      title: 'Shoe Cobbling',
      category: 'crafts',
      duration: '2 months',
      level: 'Beginner',
      image: require('../assets/images/sheo/shoe cobbling.PNG'),
      description: 'Learn traditional and modern shoe repair and maintenance techniques.',
      curriculum: [
        'Shoe Anatomy and Materials',
        'Basic Repair Techniques',
        'Leather Working Skills',
        'Tool Usage and Maintenance',
        'Business Setup and Management'
      ],
      requirements: 'Manual dexterity and attention to detail',
      certification: 'BCFSA Shoe Cobbling Certificate',
      careerPaths: ['Shoe Cobbler', 'Leather Craftsperson', 'Shoe Repair Business Owner']
    },
    {
      id: 5,
      title: 'Jewelry Making',
      category: 'crafts',
      duration: '3 months',
      level: 'Beginner to Intermediate',
      image: require('../assets/images/earring/ear ring.PNG'),
      description: 'Create beautiful jewelry pieces and learn the business of jewelry trade.',
      curriculum: [
        'Jewelry Design Principles',
        'Wire Working and Beading',
        'Metal Working Basics',
        'Gemstone Setting',
        'Jewelry Business and Marketing'
      ],
      requirements: 'Creativity and fine motor skills',
      certification: 'BCFSA Jewelry Making Certificate',
      careerPaths: ['Jewelry Designer', 'Jewelry Maker', 'Jewelry Business Owner', 'Artisan']
    },
    {
      id: 6,
      title: 'Local Weaving',
      category: 'crafts',
      duration: '4 months',
      level: 'Beginner to Advanced',
      image: require('../assets/images/weaving/local veaving.PNG'),
      description: 'Traditional weaving techniques with modern applications for textile production.',
      curriculum: [
        'Traditional Weaving Techniques',
        'Loom Setup and Operation',
        'Pattern Design and Creation',
        'Fiber Selection and Preparation',
        'Textile Business Development'
      ],
      requirements: 'Patience and attention to detail',
      certification: 'BCFSA Local Weaving Certificate',
      careerPaths: ['Textile Artisan', 'Weaving Instructor', 'Textile Business Owner', 'Cultural Preservationist']
    },
    {
      id: 7,
      title: 'Knitting',
      category: 'crafts',
      duration: '3 months',
      level: 'Beginner to Intermediate',
      image: require('../assets/images/knitting/knitting.png'),
      description: 'Learn modern knitting techniques to create fashionable clothing, accessories, and home décor items.',
      curriculum: [
        'Basic Knitting Stitches and Techniques',
        'Pattern Reading and Following',
        'Garment Construction and Sizing',
        'Advanced Knitting Patterns',
        'Knitting Business and Marketing'
      ],
      requirements: 'Manual dexterity and patience',
      certification: 'BCFSA Knitting Certificate',
      careerPaths: ['Knitting Designer', 'Fashion Knitter', 'Knitting Instructor', 'Handmade Business Owner']
    },
    {
      id: 8,
      title: 'Kuli-kuli Production',
      category: 'culinary',
      duration: '2 months',
      level: 'Beginner',
      image: require('../assets/images/kulikuli/kulikuli.PNG'),
      description: 'Master the traditional art of kuli-kuli production for entrepreneurship and food processing business.',
      curriculum: [
        'Groundnut Selection and Processing',
        'Traditional Kuli-kuli Making Techniques',
        'Food Safety and Hygiene Standards',
        'Packaging and Preservation Methods',
        'Business Setup and Marketing'
      ],
      requirements: 'Interest in food processing and entrepreneurship',
      certification: 'BCFSA Kuli-kuli Production Certificate',
      careerPaths: ['Food Processor', 'Kuli-kuli Business Owner', 'Food Entrepreneur', 'Snack Producer']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Programs' },
    { id: 'social-services', name: 'Social Services' },
    { id: 'technology', name: 'Technology' },
    { id: 'creative', name: 'Creative Arts' },
    { id: 'culinary', name: 'Culinary Arts' },
    { id: 'crafts', name: 'Traditional Crafts' }
  ];

  const filteredPrograms = selectedCategory === 'all'
    ? programs
    : programs.filter(program => program.category === selectedCategory);

  return (
    <div className="programs-page">
      <div className="container">
        <div className="programs-hero">
          <h1>Our Programs & Services</h1>
          <p>Comprehensive skill development programs and social services designed to empower individuals and strengthen our community</p>
        </div>

        <div className="programs-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="programs-grid">
          {filteredPrograms.map(program => (
            <div key={program.id} className="program-detail-card">
              <div className="program-image">
                <img src={program.image} alt={program.title} />
                <div className="program-badge">{program.level}</div>
              </div>

              <div className="program-content">
                <div className="program-header">
                  <h3>{program.title}</h3>
                  <div className="program-meta">
                    <span className="duration">📅 {program.duration}</span>
                    <span className="level">📊 {program.level}</span>
                  </div>
                </div>

                <p className="program-description">{program.description}</p>

                <div className="program-details">
                  <div className="detail-section">
                    <h4>What You'll Learn:</h4>
                    <ul>
                      {program.curriculum.slice(0, 3).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                      {program.curriculum.length > 3 && <li>...and more</li>}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>Career Opportunities:</h4>
                    <div className="career-tags">
                      {program.careerPaths.map((career, index) => (
                        <span key={index} className="career-tag">{career}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Requirements:</h4>
                    <p>{program.requirements}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Certification:</h4>
                    <p>{program.certification}</p>
                  </div>
                </div>

                <div className="program-actions">
                  {program.category === 'social-services' ? (
                    <>
                      <Link to={program.link} className="btn btn-primary">Learn More</Link>
                      <Link to="/contact" className="btn btn-secondary">Get Support</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/application?type=trainee" className="btn btn-primary">Register Now</Link>
                      <Link to="/contact" className="btn btn-secondary">Learn More</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="programs-cta">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of youth who have transformed their lives through our training programs</p>
          <Link to="/application?type=trainee" className="btn btn-primary">Register Today</Link>
        </div>
      </div>
    </div>
  );
};

export default Programs;
