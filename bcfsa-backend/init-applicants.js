const mysql = require('mysql2/promise');
const { Applicant } = require('./models');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bcfsa'
};

async function initializeApplicants() {
  let connection;
  
  try {
    console.log('🔧 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully!');

    // Create applicants table
    console.log('\n📋 Creating applicants table...');
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS applicants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        dateOfBirth DATE NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        address TEXT NOT NULL,
        education VARCHAR(255) NOT NULL,
        experience TEXT,
        motivation TEXT NOT NULL,
        program VARCHAR(100) NOT NULL,
        status ENUM('pending', 'reviewed', 'admitted', 'rejected') DEFAULT 'pending',
        applicationDate DATE DEFAULT (CURRENT_DATE),
        reviewedBy INT,
        reviewedAt DATETIME,
        admittedAt DATETIME,
        admissionNumber VARCHAR(20) UNIQUE,
        notes TEXT,
        emergencyContactName VARCHAR(100),
        emergencyContactPhone VARCHAR(20),
        emergencyContactRelationship VARCHAR(50),
        hasDisability BOOLEAN DEFAULT FALSE,
        disabilityDetails TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (reviewedBy) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_program (program),
        INDEX idx_application_date (applicationDate)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.execute(createTableQuery);
    console.log('✅ Applicants table created successfully!');

    // Insert sample applicants
    console.log('\n👥 Inserting sample applicants...');
    
    const sampleApplicants = [
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@email.com',
        phone: '08012345678',
        dateOfBirth: '1995-05-15',
        gender: 'Female',
        address: '123 Main Street, Lagos State, Nigeria',
        education: 'Secondary School Certificate',
        experience: 'Basic computer knowledge from secondary school',
        motivation: 'I want to learn programming and web development to build a career in technology and help my community',
        program: 'Computer Training',
        status: 'pending',
        applicationDate: '2025-01-10'
      },
      {
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@email.com',
        phone: '08087654321',
        dateOfBirth: '1992-08-22',
        gender: 'Male',
        address: '456 Oak Avenue, Abuja, FCT, Nigeria',
        education: 'National Diploma in Art and Design',
        experience: 'Some tailoring experience from family business',
        motivation: 'Passionate about fashion and design. I want to start my own fashion brand and create employment opportunities',
        program: 'Fashion Design',
        status: 'pending',
        applicationDate: '2025-01-12'
      },
      {
        firstName: 'Sarah',
        lastName: 'Brown',
        email: 'sarah.brown@email.com',
        phone: '08098765432',
        dateOfBirth: '1990-12-03',
        gender: 'Female',
        address: '789 Pine Road, Port Harcourt, Rivers State, Nigeria',
        education: 'Higher National Diploma in Hospitality Management',
        experience: 'Worked in restaurant for 2 years as assistant chef',
        motivation: 'Want to enhance my culinary skills and start my own catering business to serve quality food',
        program: 'Catering',
        status: 'reviewed',
        applicationDate: '2025-01-08'
      },
      {
        firstName: 'Michael',
        lastName: 'Adebayo',
        email: 'michael.adebayo@email.com',
        phone: '08076543210',
        dateOfBirth: '1993-03-18',
        gender: 'Male',
        address: '321 Cedar Street, Kano State, Nigeria',
        education: 'Secondary School Certificate',
        experience: 'Helped in family shoe repair shop',
        motivation: 'I want to learn professional shoe making and cobbling to establish a modern shoe business',
        program: 'Shoe Cobbling',
        status: 'pending',
        applicationDate: '2025-01-14'
      },
      {
        firstName: 'Fatima',
        lastName: 'Ibrahim',
        email: 'fatima.ibrahim@email.com',
        phone: '08065432109',
        dateOfBirth: '1994-07-25',
        gender: 'Female',
        address: '654 Birch Lane, Kaduna State, Nigeria',
        education: 'National Certificate in Education',
        experience: 'Basic jewelry making as a hobby',
        motivation: 'I love creating beautiful jewelry pieces and want to turn my passion into a profitable business',
        program: 'Jewelry Making',
        status: 'pending',
        applicationDate: '2025-01-16'
      }
    ];

    for (const applicant of sampleApplicants) {
      const insertQuery = `
        INSERT INTO applicants (
          firstName, lastName, email, phone, dateOfBirth, gender, address, 
          education, experience, motivation, program, status, applicationDate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(insertQuery, [
        applicant.firstName,
        applicant.lastName,
        applicant.email,
        applicant.phone,
        applicant.dateOfBirth,
        applicant.gender,
        applicant.address,
        applicant.education,
        applicant.experience,
        applicant.motivation,
        applicant.program,
        applicant.status,
        applicant.applicationDate
      ]);
      
      console.log(`✅ Added applicant: ${applicant.firstName} ${applicant.lastName}`);
    }

    // Verify the data
    console.log('\n📊 Verifying applicants data...');
    const [applicants] = await connection.execute('SELECT id, firstName, lastName, email, program, status FROM applicants ORDER BY id');
    
    console.log('='.repeat(80));
    applicants.forEach((applicant, index) => {
      console.log(`${index + 1}. ${applicant.firstName} ${applicant.lastName} (${applicant.email})`);
      console.log(`   Program: ${applicant.program} | Status: ${applicant.status}`);
      console.log('-'.repeat(40));
    });
    console.log('='.repeat(80));
    console.log(`✅ Total applicants created: ${applicants.length}`);

    console.log('\n🎉 Applicants initialization completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

initializeApplicants();
