const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bcfsa',
  multipleStatements: true
});

console.log('🔧 Adding missing tables and updating data...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }

  console.log('✅ Connected to MySQL database!');

  // Add Staff table
  const createStaffTable = `
    CREATE TABLE IF NOT EXISTS Staff (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      staffId VARCHAR(50) UNIQUE,
      department VARCHAR(100),
      position VARCHAR(100),
      specializations JSON,
      experience INT,
      qualifications JSON,
      hireDate DATE,
      salary DECIMAL(10,2),
      status ENUM('active', 'inactive', 'terminated') DEFAULT 'active',
      supervisorId INT,
      workSchedule JSON,
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
      INDEX idx_staff_id (staffId),
      INDEX idx_department (department),
      INDEX idx_status (status)
    );
  `;

  // Add Students table
  const createStudentsTable = `
    CREATE TABLE IF NOT EXISTS Students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      studentId VARCHAR(50) UNIQUE,
      enrollmentDate DATE,
      graduationDate DATE,
      currentLevel VARCHAR(50),
      overallGPA DECIMAL(3,2),
      totalCredits INT DEFAULT 0,
      status ENUM('active', 'graduated', 'dropped', 'suspended') DEFAULT 'active',
      guardianName VARCHAR(100),
      guardianPhone VARCHAR(20),
      guardianRelationship VARCHAR(50),
      medicalInfo TEXT,
      specialNeeds TEXT,
      financialStatus ENUM('sponsored', 'self_funded', 'scholarship') DEFAULT 'sponsored',
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
      INDEX idx_student_id (studentId),
      INDEX idx_status (status),
      INDEX idx_enrollment_date (enrollmentDate)
    );
  `;

  // Create tables
  connection.query(createStaffTable, (err) => {
    if (err) {
      console.error('❌ Failed to create Staff table:', err.message);
    } else {
      console.log('✅ Staff table created/verified');
    }

    connection.query(createStudentsTable, (err) => {
      if (err) {
        console.error('❌ Failed to create Students table:', err.message);
      } else {
        console.log('✅ Students table created/verified');
      }

      // Clear existing programs and insert all 12 programs
      console.log('📚 Updating Programs with complete data...');
      
      const clearPrograms = 'DELETE FROM Programs';
      connection.query(clearPrograms, (err) => {
        if (err) {
          console.error('❌ Failed to clear programs:', err.message);
        } else {
          console.log('✅ Existing programs cleared');

          // Insert all 12 programs
          const insertPrograms = `
            INSERT INTO Programs (title, description, category, durationValue, durationUnit, level, curriculum, requirements, careerPaths, certificationName, isActive, isPublished, createdBy) VALUES
            ('Computer Training', 'Comprehensive computer literacy program covering essential skills for the modern workplace.', 'technology', 3, 'months', 'beginner', ?, 'Basic literacy skills', ?, 'BCFSA Computer Literacy Certificate', TRUE, TRUE, 1),
            ('Fashion Design', 'Master the art of fashion design from concept to finished garment.', 'creative-arts', 6, 'months', 'beginner', ?, 'Creativity and basic sewing knowledge helpful', ?, 'BCFSA Fashion Design Certificate', TRUE, TRUE, 1),
            ('Catering Services', 'Professional culinary training for aspiring chefs and catering entrepreneurs.', 'culinary', 4, 'months', 'intermediate', ?, 'Basic cooking experience preferred', ?, 'BCFSA Professional Catering Certificate', TRUE, TRUE, 1),
            ('Shoe Cobbling', 'Traditional and modern shoe repair and manufacturing techniques.', 'crafts', 3, 'months', 'beginner', ?, 'Manual dexterity and attention to detail', ?, 'BCFSA Shoe Cobbling Certificate', TRUE, TRUE, 1),
            ('Jewelry Making', 'Create beautiful jewelry pieces using traditional and contemporary techniques.', 'crafts', 4, 'months', 'beginner', ?, 'Creativity and fine motor skills', ?, 'BCFSA Jewelry Making Certificate', TRUE, TRUE, 1),
            ('Local Weaving', 'Traditional Nigerian weaving techniques for creating textiles and crafts.', 'crafts', 3, 'months', 'beginner', ?, 'Interest in traditional crafts', ?, 'BCFSA Traditional Weaving Certificate', TRUE, TRUE, 1),
            ('Graphic Design', 'Modern digital design skills for print and web media.', 'creative-arts', 5, 'months', 'intermediate', ?, 'Basic computer skills and creativity', ?, 'BCFSA Graphic Design Certificate', TRUE, TRUE, 1),
            ('Digital Marketing', 'Comprehensive digital marketing strategies for modern businesses.', 'creative-arts', 4, 'months', 'intermediate', ?, 'Basic internet and computer skills', ?, 'BCFSA Digital Marketing Certificate', TRUE, TRUE, 1),
            ('Knitting', 'Modern knitting techniques for fashion and home décor items.', 'crafts', 3, 'months', 'beginner', ?, 'Patience and attention to detail', ?, 'BCFSA Knitting Certificate', TRUE, TRUE, 1),
            ('Kuli-kuli Production', 'Traditional groundnut processing and modern food production techniques.', 'culinary', 2, 'months', 'beginner', ?, 'Interest in food production', ?, 'BCFSA Food Production Certificate', TRUE, TRUE, 1),
            ('Web Development', 'Full-stack web development for modern applications.', 'technology', 6, 'months', 'intermediate', ?, 'Basic computer skills and logical thinking', ?, 'BCFSA Web Development Certificate', TRUE, TRUE, 1),
            ('Mobile App Development', 'Create mobile applications for Android and iOS platforms.', 'technology', 6, 'months', 'advanced', ?, 'Programming experience preferred', ?, 'BCFSA Mobile Development Certificate', TRUE, TRUE, 1)
          `;

          const programsData = [
            // Computer Training
            JSON.stringify(['Microsoft Office Suite (Word, Excel, PowerPoint)', 'Internet and Email Usage', 'Basic Computer Troubleshooting', 'Introduction to Programming', 'Digital Literacy and Online Safety']),
            JSON.stringify(['Office Assistant', 'Data Entry Clerk', 'Computer Operator', 'IT Support']),
            // Fashion Design
            JSON.stringify(['Fashion Design Principles', 'Pattern Making and Drafting', 'Garment Construction Techniques', 'Fabric Selection and Care', 'Fashion Business and Marketing']),
            JSON.stringify(['Fashion Designer', 'Tailor', 'Fashion Entrepreneur', 'Costume Designer']),
            // Catering Services
            JSON.stringify(['Professional Cooking Techniques', 'Menu Planning and Costing', 'Food Safety and Hygiene', 'Catering Business Management', 'International Cuisine']),
            JSON.stringify(['Professional Chef', 'Catering Business Owner', 'Restaurant Manager', 'Food Service Supervisor']),
            // Shoe Cobbling
            JSON.stringify(['Shoe Anatomy and Materials', 'Repair Techniques', 'Sole Replacement', 'Leather Working', 'Business Skills for Cobblers']),
            JSON.stringify(['Shoe Repair Specialist', 'Leather Craftsperson', 'Footwear Entrepreneur']),
            // Jewelry Making
            JSON.stringify(['Jewelry Design Principles', 'Metalworking Techniques', 'Beadwork and Wire Wrapping', 'Gemstone Setting', 'Jewelry Business and Marketing']),
            JSON.stringify(['Jewelry Designer', 'Artisan Craftsperson', 'Jewelry Business Owner']),
            // Local Weaving
            JSON.stringify(['Traditional Weaving Patterns', 'Loom Operation', 'Fiber Preparation', 'Color and Design', 'Marketing Handwoven Products']),
            JSON.stringify(['Textile Artisan', 'Cultural Craft Specialist', 'Handwoven Products Entrepreneur']),
            // Graphic Design
            JSON.stringify(['Design Principles and Theory', 'Adobe Creative Suite', 'Logo and Brand Design', 'Web Design Basics', 'Print Design and Production']),
            JSON.stringify(['Graphic Designer', 'Web Designer', 'Brand Designer', 'Freelance Designer']),
            // Digital Marketing
            JSON.stringify(['Social Media Marketing', 'Search Engine Optimization', 'Content Marketing', 'Email Marketing', 'Analytics and Reporting']),
            JSON.stringify(['Digital Marketing Specialist', 'Social Media Manager', 'SEO Specialist', 'Marketing Consultant']),
            // Knitting
            JSON.stringify(['Basic Knitting Stitches', 'Pattern Reading', 'Garment Construction', 'Machine Knitting', 'Knitting Business Basics']),
            JSON.stringify(['Knitwear Designer', 'Custom Knitting Service', 'Knitting Instructor']),
            // Kuli-kuli Production
            JSON.stringify(['Groundnut Processing', 'Food Safety Standards', 'Packaging and Preservation', 'Quality Control', 'Food Business Management']),
            JSON.stringify(['Food Processor', 'Snack Food Entrepreneur', 'Food Production Manager']),
            // Web Development
            JSON.stringify(['HTML, CSS, JavaScript', 'React.js Framework', 'Node.js Backend', 'Database Management', 'Web Deployment']),
            JSON.stringify(['Web Developer', 'Frontend Developer', 'Full-stack Developer', 'Freelance Developer']),
            // Mobile App Development
            JSON.stringify(['Mobile App Design', 'React Native Development', 'App Store Deployment', 'Mobile UI/UX', 'App Monetization']),
            JSON.stringify(['Mobile App Developer', 'App Entrepreneur', 'Mobile UI Designer'])
          ];

          connection.query(insertPrograms, programsData, (err) => {
            if (err) {
              console.error('❌ Failed to insert programs:', err.message);
            } else {
              console.log('✅ All 12 programs inserted successfully!');
            }

            // Verify the setup
            connection.query('SELECT COUNT(*) as count FROM Programs', (err, result) => {
              if (!err) {
                console.log(`✅ Total programs in database: ${result[0].count}`);
              }

              connection.query('SHOW TABLES', (err, tables) => {
                if (!err) {
                  console.log('📋 All tables in database:');
                  tables.forEach(table => {
                    console.log(`  - ${Object.values(table)[0]}`);
                  });
                }

                connection.end();
                console.log('\n🎉 Database update completed successfully!');
                console.log('\n📋 Default Login Credentials:');
                console.log('  Email: admin@bcfsa.org');
                console.log('  Password: admin123');
              });
            });
          });
        }
      });
    });
  });
});
