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
            <p className="leadership-intro">
              Meet the visionary leaders who guide BCFSA in its mission to empower youth and support vulnerable children.
              Our leadership team brings together experience, passion, and commitment to creating positive change in Niger State.
            </p>

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
                  <p>
                    Under his leadership, Niger State has witnessed unprecedented development in education, agriculture,
                    and youth empowerment. His commitment to creating opportunities for young people and supporting
                    vulnerable populations has made BCFSA a flagship institution for skills development in the region.
                  </p>
                  <div className="achievements">
                    <h5>Key Achievements & Initiatives:</h5>
                    <ul>
                      <li>Established multiple skills acquisition centers across Niger State</li>
                      <li>Implemented modern farming techniques and agricultural development programs</li>
                      <li>Launched comprehensive programs for orphans and vulnerable groups</li>
                      <li>Initiated major infrastructure development projects</li>
                      <li>Promoted gender equality and women empowerment initiatives</li>
                      <li>Supported youth entrepreneurship and job creation programs</li>
                    </ul>
                  </div>
                  <div className="leadership-quote">
                    <blockquote>
                      "Our youth are the future of Niger State. Through quality skills training and support for vulnerable children,
                      we are building a stronger, more prosperous state for all."
                    </blockquote>
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
                  <p>
                    With extensive experience in education, community development, and social services, the Chairman
                    has dedicated his career to creating opportunities for disadvantaged youth and vulnerable children.
                    His strategic vision has positioned BCFSA as a model institution for skills development and child care.
                  </p>
                  <div className="achievements">
                    <h5>Leadership Achievements & Impact:</h5>
                    <ul>
                      <li>Established 8 comprehensive skills training programs</li>
                      <li>Developed modern training facilities and equipment</li>
                      <li>Created partnerships with government and private organizations</li>
                      <li>Launched women empowerment and gender-based violence prevention programs</li>
                      <li>Initiated the ₦2.5 billion orphanage home project</li>
                      <li>Built strategic alliances with international development organizations</li>
                      <li>Implemented sustainable funding models for program continuity</li>
                    </ul>
                  </div>
                  <div className="leadership-quote">
                    <blockquote>
                      "Every young person deserves the opportunity to develop their potential. Through skills training and
                      compassionate care, we are not just changing individual lives - we are transforming our entire community."
                    </blockquote>
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
              <h3>Our Dedicated Staff Team</h3>
              <p className="staff-intro">
                Our experienced and committed staff members are the backbone of BCFSA's success. Each team member
                brings unique expertise and dedication to ensuring the highest quality of training and care for our
                beneficiaries.
              </p>
              <div className="staff-grid">
                <div className="staff-card">
                  <img src={require('../assets/images/general/Sec BCFSA.PNG')} alt="Secretary" />
                  <h4>Secretary</h4>
                  <p>Coordinating programs and ensuring smooth operations across all departments. Manages administrative
                     functions and serves as the primary liaison between different program areas.</p>
                  <div className="staff-responsibilities">
                    <strong>Key Responsibilities:</strong>
                    <ul>
                      <li>Program coordination and scheduling</li>
                      <li>Administrative oversight</li>
                      <li>Communication management</li>
                    </ul>
                  </div>
                </div>
                <div className="staff-card">
                  <img src={require('../assets/images/general/controller.PNG')} alt="Controller" />
                  <h4>Financial Controller</h4>
                  <p>Managing finances and ensuring proper resource allocation for all programs. Oversees budget
                     planning, financial reporting, and ensures transparency in all financial operations.</p>
                  <div className="staff-responsibilities">
                    <strong>Key Responsibilities:</strong>
                    <ul>
                      <li>Financial planning and budgeting</li>
                      <li>Resource allocation</li>
                      <li>Financial reporting and compliance</li>
                    </ul>
                  </div>
                </div>
                <div className="staff-card">
                  <img src={require('../assets/images/general/ministry of labour.PNG')} alt="Ministry Representative" />
                  <h4>Ministry of Labour Representative</h4>
                  <p>Liaison with government agencies and policy implementation. Ensures compliance with government
                     regulations and facilitates partnerships with relevant ministries and agencies.</p>
                  <div className="staff-responsibilities">
                    <strong>Key Responsibilities:</strong>
                    <ul>
                      <li>Government liaison and partnerships</li>
                      <li>Policy implementation</li>
                      <li>Regulatory compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="additional-staff">
                <h4>Additional Support Staff</h4>
                <div className="support-roles">
                  <div className="role-item">
                    <strong>Training Coordinators:</strong> Specialized staff who oversee specific skill training programs
                    and ensure quality delivery of curriculum.
                  </div>
                  <div className="role-item">
                    <strong>Child Care Workers:</strong> Dedicated professionals who provide care and support for children
                    in our orphanage programs.
                  </div>
                  <div className="role-item">
                    <strong>Counselors:</strong> Qualified counselors who provide psychological support and guidance to
                    both trainees and children in our care.
                  </div>
                  <div className="role-item">
                    <strong>Administrative Support:</strong> Essential support staff who handle day-to-day operations,
                    record keeping, and facility management.
                  </div>
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
                    to our training programs while fulfilling their national service obligations. Our partnership
                    with NYSC creates a dynamic environment where recent graduates can apply their knowledge while
                    gaining valuable experience in community development and skills training.
                  </p>
                  <div className="nysc-contributions">
                    <h5>Corp Members Contribute Through:</h5>
                    <ul>
                      <li>Teaching and training in various skill areas including computer literacy and digital skills</li>
                      <li>Assisting with administrative duties and program coordination</li>
                      <li>Supporting orphanage activities and child care programs</li>
                      <li>Community outreach and awareness programs</li>
                      <li>Technology support and digital literacy training</li>
                      <li>Research and development of new training methodologies</li>
                      <li>Mentoring and counseling services for trainees</li>
                      <li>Documentation and reporting of program activities</li>
                    </ul>
                  </div>
                  <div className="nysc-impact">
                    <h5>Impact & Benefits:</h5>
                    <div className="impact-stats-small">
                      <div className="impact-item">
                        <strong>15+</strong>
                        <span>Corp Members Annually</span>
                      </div>
                      <div className="impact-item">
                        <strong>500+</strong>
                        <span>Trainees Supported</span>
                      </div>
                      <div className="impact-item">
                        <strong>8</strong>
                        <span>Program Areas Covered</span>
                      </div>
                    </div>
                  </div>
                  <div className="nysc-testimonial">
                    <blockquote>
                      "Serving at BCFSA has been a transformative experience. I've been able to use my skills to
                      make a real difference in young people's lives while gaining invaluable experience in
                      community development and education."
                    </blockquote>
                    <cite>- NYSC Corp Member, 2024</cite>
                  </div>
                </div>
                <div className="nysc-image">
                  <img src={require('../assets/images/general/465A4630.jpg')} alt="NYSC Corp Members" />
                  <div className="image-caption">
                    <p>NYSC Corp Members actively participating in skills training programs</p>
                  </div>
                </div>
              </div>

              <div className="nysc-programs">
                <h4>NYSC Partnership Programs</h4>
                <div className="partnership-grid">
                  <div className="partnership-item">
                    <h5>🎓 Skills Development</h5>
                    <p>Corp members lead specialized training sessions in their areas of expertise</p>
                  </div>
                  <div className="partnership-item">
                    <h5>👥 Community Service</h5>
                    <p>Organizing community outreach programs and awareness campaigns</p>
                  </div>
                  <div className="partnership-item">
                    <h5>💻 Digital Innovation</h5>
                    <p>Introducing new technologies and digital solutions to enhance training</p>
                  </div>
                  <div className="partnership-item">
                    <h5>📚 Educational Support</h5>
                    <p>Providing additional educational support and tutoring services</p>
                  </div>
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
