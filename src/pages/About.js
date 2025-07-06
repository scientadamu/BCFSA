import React from 'react';
import MediaGallery from '../components/MediaGallery';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <h1>About Bago Center For Skills Acquisition & Orphanage Home</h1>
          <p>Empowering youth through skills training and providing compassionate care for vulnerable children</p>
        </div>

        <div className="about-content">
          <section className="mission-section">
            <div className="content-grid">
              <div className="text-content">
                <h2>Our Mission</h2>
                <p>
                  To provide free, quality skill development training to youth in our community while
                  offering compassionate care and support to orphaned and vulnerable children. We empower
                  young people with marketable skills that lead to sustainable employment and entrepreneurship
                  opportunities, while ensuring every child has access to education, healthcare, and a nurturing
                  environment to thrive.
                </p>
              </div>
              <div className="image-content">
                <img src={require('../assets/images/general/465A4605.jpg')} alt="Our Mission" />
              </div>
            </div>
          </section>

          <section className="vision-section">
            <div className="content-grid reverse">
              <div className="text-content">
                <h2>Our Vision</h2>
                <p>
                  To be the leading skills acquisition center and child care facility in Niger State,
                  creating a skilled workforce that drives economic growth while providing a safe haven
                  for vulnerable children. We envision a future where every young person has access to
                  quality education, skills training, and opportunities to build a successful life.
                </p>
              </div>
              <div className="image-content">
                <img src={require('../assets/images/general/465A4608.jpg')} alt="Our Vision" />
              </div>
            </div>
          </section>

          <section className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Excellence</h3>
                <p>We strive for the highest quality in all our training programs and services.</p>
              </div>
              <div className="value-card">
                <h3>Accessibility</h3>
                <p>We ensure our programs are free and accessible to all youth regardless of background.</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>We continuously update our curriculum to meet modern industry demands.</p>
              </div>
              <div className="value-card">
                <h3>Community</h3>
                <p>We are committed to the development and growth of our local community.</p>
              </div>
            </div>
          </section>

          <section className="orphanage-section">
            <h2>BCFSA Orphanage Home</h2>
            <div className="content-grid">
              <div className="text-content">
                <h3>Caring for Vulnerable Children</h3>
                <p>
                  Our orphanage home project represents our commitment to providing comprehensive care
                  for orphaned and vulnerable children in Niger State. This state-of-the-art facility
                  will offer more than just shelter - it will be a place where children can grow, learn,
                  and develop the skills they need for a successful future.
                </p>
                <div className="orphanage-features">
                  <div className="feature-item">
                    <h4>🏠 Safe Housing</h4>
                    <p>Modern residential quarters designed for comfort and security</p>
                  </div>
                  <div className="feature-item">
                    <h4>📚 Quality Education</h4>
                    <p>On-site classrooms and learning centers with qualified teachers</p>
                  </div>
                  <div className="feature-item">
                    <h4>🏥 Healthcare</h4>
                    <p>Medical clinic and health facilities for comprehensive care</p>
                  </div>
                  <div className="feature-item">
                    <h4>🎯 Skills Training</h4>
                    <p>Age-appropriate skills development and vocational training</p>
                  </div>
                </div>
              </div>
              <div className="image-content">
                <img src={require('../assets/images/general/image2.jpg')} alt="Orphanage Home Project" />
                <div className="image-caption">
                  <p>Proposed BCFSA Orphanage Home - A beacon of hope for vulnerable children</p>
                </div>
              </div>
            </div>
          </section>

          <section className="programs-overview">
            <h2>Our Dual Mission</h2>
            <div className="programs-grid">
              <div className="program-card">
                <div className="program-icon">🎓</div>
                <h3>Skills Training Programs</h3>
                <p>
                  Comprehensive vocational training in technology, creative arts, culinary skills,
                  and traditional crafts. Our programs are designed to meet current market demands
                  and provide sustainable livelihood opportunities.
                </p>
                <ul>
                  <li>Web Development & Digital Marketing</li>
                  <li>Graphic Design & Creative Arts</li>
                  <li>Culinary Arts & Food Processing</li>
                  <li>Traditional Crafts & Knitting</li>
                  <li>Kuli-kuli Production & Food Technology</li>
                </ul>
              </div>
              <div className="program-card">
                <div className="program-icon">❤️</div>
                <h3>Child Care & Support</h3>
                <p>
                  Holistic care for orphaned and vulnerable children, providing not just shelter
                  but a nurturing environment where children can heal, grow, and prepare for
                  independent living.
                </p>
                <ul>
                  <li>Safe and secure residential care</li>
                  <li>Quality education and tutoring</li>
                  <li>Psychological counseling and support</li>
                  <li>Healthcare and nutrition programs</li>
                  <li>Life skills and independence training</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="leadership-section">
            <h2>Our Leadership Team</h2>

            {/* Governor Section */}
            <div id="governor" className="leader-profile">
              <div className="profile-content">
                <div className="profile-image">
                  <img src={require('../assets/images/general/farmrBago.jpg')} alt="Governor Farmer Umaru Bago" />
                </div>
                <div className="profile-info">
                  <h3>His Excellency, Governor Farmer Umaru Bago</h3>
                  <h4>Executive Governor of Niger State & Patron of BCFSA</h4>
                  <p>
                    His Excellency, Governor Farmer Umaru Bago is a visionary leader committed to transforming Niger State
                    through innovative policies and programs that prioritize youth empowerment, skills development, and
                    sustainable economic growth. As the Patron of BCFSA, he has been instrumental in the establishment
                    and growth of our institution, providing ongoing support for program development and expansion.
                  </p>
                  <div className="achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                      <li>Established multiple skills acquisition centers across Niger State</li>
                      <li>Implemented modern farming techniques and agricultural development</li>
                      <li>Launched comprehensive programs for orphans and vulnerable groups</li>
                      <li>Initiated major infrastructure development projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Chairman Section */}
            <div id="chairman" className="leader-profile">
              <div className="profile-content reverse">
                <div className="profile-image">
                  <img src={require('../assets/images/general/bcfsaChairman.jpg')} alt="BCFSA Chairman" />
                </div>
                <div className="profile-info">
                  <h3>Chairman of BCFSA</h3>
                  <h4>Board Chairman & Chief Executive</h4>
                  <p>
                    The Chairman of Bago Center for Skills Acquisition and Orphanage Home is a distinguished leader
                    with a passion for youth empowerment, skills development, and child welfare. Under his visionary
                    leadership, BCFSA has become a beacon of hope and transformation in Niger State, successfully
                    training over 1,000 young people with an 85% employment rate among graduates.
                  </p>
                  <div className="achievements">
                    <h5>Leadership Achievements:</h5>
                    <ul>
                      <li>Established 8 comprehensive skills training programs</li>
                      <li>Developed modern training facilities and equipment</li>
                      <li>Created partnerships with government and private organizations</li>
                      <li>Launched women empowerment and gender-based violence prevention programs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Director Section */}
            <div id="director" className="leader-profile">
              <div className="profile-content">
                <div className="profile-image">
                  <img src={require('../assets/images/general/DirectorBCFSA.jpg')} alt="BCFSA Director" />
                </div>
                <div className="profile-info">
                  <h3>Director of BCFSA</h3>
                  <h4>Executive Director & Operations Manager</h4>
                  <p>
                    The Director oversees the day-to-day operations of BCFSA, ensuring that all programs run smoothly
                    and effectively. With extensive experience in education and community development, the Director
                    is responsible for curriculum development, staff management, and maintaining the high standards
                    of training that BCFSA is known for.
                  </p>
                  <div className="achievements">
                    <h5>Key Responsibilities:</h5>
                    <ul>
                      <li>Oversee all training programs and curriculum development</li>
                      <li>Manage staff and ensure quality training delivery</li>
                      <li>Coordinate with government agencies and partners</li>
                      <li>Monitor student progress and employment outcomes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Section */}
            <div id="staff" className="staff-section">
              <h3>Our Dedicated Staff</h3>
              <div className="staff-grid">
                <div className="staff-card">
                  <img src={require('../assets/images/general/Sec BCFSA.PNG')} alt="Secretary" />
                  <h4>Secretary</h4>
                  <p>Coordinating programs and ensuring smooth operations across all departments.</p>
                </div>
                <div className="staff-card">
                  <img src={require('../assets/images/general/controller.PNG')} alt="Controller" />
                  <h4>Controller</h4>
                  <p>Managing finances and ensuring proper resource allocation for all programs.</p>
                </div>
                <div className="staff-card">
                  <img src={require('../assets/images/general/ministry of labour.PNG')} alt="Ministry Representative" />
                  <h4>Ministry Representative</h4>
                  <p>Liaison with government agencies and policy implementation.</p>
                </div>
              </div>
            </div>

            {/* NYSC Corp Members Section */}
            <div id="nysc" className="nysc-section">
              <h3>Our NYSC Corp Members</h3>
              <div className="nysc-content">
                <div className="nysc-info">
                  <p>
                    BCFSA proudly hosts National Youth Service Corps (NYSC) members who contribute significantly
                    to our mission. These dedicated young graduates bring fresh perspectives, energy, and expertise
                    to our training programs while fulfilling their national service obligations.
                  </p>
                  <div className="nysc-contributions">
                    <h5>Corp Members Contribute Through:</h5>
                    <ul>
                      <li>Teaching and training in various skill areas</li>
                      <li>Assisting with administrative duties</li>
                      <li>Supporting orphanage activities and child care</li>
                      <li>Community outreach and awareness programs</li>
                      <li>Technology support and digital literacy training</li>
                    </ul>
                  </div>
                </div>
                <div className="nysc-image">
                  <img src={require('../assets/images/general/465A4630.jpg')} alt="NYSC Corp Members" />
                </div>
              </div>
            </div>
          </section>

          <section className="impact-section">
            <h2>Our Impact & Goals</h2>
            <div className="impact-stats">
              <div className="stat-card">
                <h3>500+</h3>
                <p>Youth Trained</p>
              </div>
              <div className="stat-card">
                <h3>85%</h3>
                <p>Employment Rate</p>
              </div>
              <div className="stat-card">
                <h3>200+</h3>
                <p>Children to be Cared For</p>
              </div>
              <div className="stat-card">
                <h3>12+</h3>
                <p>Skill Programs</p>
              </div>
              <div className="stat-card">
                <h3>5+</h3>
                <p>Years of Service</p>
              </div>
              <div className="stat-card">
                <h3>₦2.5B</h3>
                <p>Orphanage Project Value</p>
              </div>
            </div>
          </section>

          <MediaGallery />
        </div>
      </div>
    </div>
  );
};

export default About;
