const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  console.log('🔧 Setting up MySQL database for BCFSA...');
  
  try {
    // Connect to MySQL server (without specifying database)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'bcfsa';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Use the database
    await connection.execute(`USE \`${dbName}\``);
    console.log(`✅ Using database '${dbName}'`);

    // Create Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'trainer', 'trainee', 'corp_member') DEFAULT 'trainee',
        avatar VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        bio TEXT,
        dateOfBirth DATE,
        gender ENUM('male', 'female', 'other'),
        emergencyContactName VARCHAR(100),
        emergencyContactPhone VARCHAR(20),
        emergencyContactRelationship VARCHAR(50),
        isActive BOOLEAN DEFAULT TRUE,
        isEmailVerified BOOLEAN DEFAULT FALSE,
        lastLogin DATETIME,
        passwordResetToken VARCHAR(255),
        passwordResetExpires DATETIME,
        emailVerificationToken VARCHAR(255),
        emailVerificationExpires DATETIME,
        studentId VARCHAR(50) UNIQUE,
        enrollmentDate DATE,
        specializations JSON,
        experience INT,
        stateCode VARCHAR(10),
        batchYear VARCHAR(10),
        serviceStartDate DATE,
        serviceEndDate DATE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create Programs table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Programs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        category ENUM('technology', 'creative-arts', 'culinary', 'crafts') NOT NULL,
        durationValue INT NOT NULL,
        durationUnit ENUM('days', 'weeks', 'months', 'years') DEFAULT 'months',
        level ENUM('beginner', 'intermediate', 'advanced', 'all-levels') DEFAULT 'beginner',
        image VARCHAR(255),
        curriculum JSON,
        requirements JSON,
        careerPaths JSON,
        certificationName VARCHAR(255),
        certificationDescription TEXT,
        certificationAuthority VARCHAR(255) DEFAULT 'Bago Center For Skills Acquisition',
        trainers JSON,
        maxStudents INT DEFAULT 30,
        currentEnrollment INT DEFAULT 0,
        feeAmount DECIMAL(10,2) DEFAULT 0,
        feeCurrency VARCHAR(3) DEFAULT 'NGN',
        isFree BOOLEAN DEFAULT TRUE,
        scheduleStartDate DATE,
        scheduleEndDate DATE,
        classTime VARCHAR(50),
        classDays JSON,
        isActive BOOLEAN DEFAULT TRUE,
        isPublished BOOLEAN DEFAULT FALSE,
        tags JSON,
        createdBy INT NOT NULL,
        updatedBy INT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES Users(id),
        FOREIGN KEY (updatedBy) REFERENCES Users(id)
      )
    `);
    console.log('✅ Programs table created');

    // Create Enrollments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentId INT NOT NULL,
        programId INT NOT NULL,
        enrollmentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'active', 'completed', 'dropped', 'suspended') DEFAULT 'pending',
        overallProgress INT DEFAULT 0,
        currentModule VARCHAR(255),
        lastActivity DATETIME,
        completedModules JSON,
        attendance JSON,
        assessments JSON,
        grades JSON,
        certificateIssued BOOLEAN DEFAULT FALSE,
        certificateIssuedDate DATETIME,
        certificateNumber VARCHAR(100),
        certificateDownloadUrl VARCHAR(255),
        notes JSON,
        completionDate DATETIME,
        dropoutReason TEXT,
        dropoutDate DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES Users(id),
        FOREIGN KEY (programId) REFERENCES Programs(id),
        UNIQUE KEY unique_enrollment (studentId, programId)
      )
    `);
    console.log('✅ Enrollments table created');

    // Create Orphanage Children table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS OrphanageChildren (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        dateOfBirth DATE NOT NULL,
        gender ENUM('male', 'female') NOT NULL,
        admissionDate DATE NOT NULL,
        guardianName VARCHAR(100),
        guardianPhone VARCHAR(20),
        guardianRelationship VARCHAR(50),
        medicalInfo TEXT,
        educationLevel VARCHAR(50),
        currentSchool VARCHAR(100),
        specialNeeds TEXT,
        status ENUM('active', 'transferred', 'adopted', 'aged_out') DEFAULT 'active',
        roomNumber VARCHAR(10),
        caregiverAssigned INT,
        emergencyContact JSON,
        documents JSON,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (caregiverAssigned) REFERENCES Users(id)
      )
    `);
    console.log('✅ OrphanageChildren table created');

    // Create Projects table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        category ENUM('infrastructure', 'education', 'community', 'orphanage') NOT NULL,
        status ENUM('planning', 'in_progress', 'completed', 'on_hold') DEFAULT 'planning',
        startDate DATE,
        endDate DATE,
        budget DECIMAL(15,2),
        fundsRaised DECIMAL(15,2) DEFAULT 0,
        objectives JSON,
        milestones JSON,
        documents JSON,
        images JSON,
        projectManager INT,
        stakeholders JSON,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (projectManager) REFERENCES Users(id)
      )
    `);
    console.log('✅ Projects table created');

    // Insert default admin user
    const adminExists = await connection.execute('SELECT id FROM Users WHERE email = ?', ['admin@bcfsa.org']);
    if (adminExists[0].length === 0) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      await connection.execute(`
        INSERT INTO Users (name, email, password, role, isActive, isEmailVerified) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['System Administrator', 'admin@bcfsa.org', hashedPassword, 'admin', true, true]);
      
      console.log('✅ Default admin user created (admin@bcfsa.org / admin123)');
    }

    // Insert sample programs
    const programExists = await connection.execute('SELECT id FROM Programs LIMIT 1');
    if (programExists[0].length === 0) {
      const adminUser = await connection.execute('SELECT id FROM Users WHERE role = "admin" LIMIT 1');
      const adminId = adminUser[0][0].id;

      const samplePrograms = [
        {
          title: 'Web Development Bootcamp',
          description: 'Comprehensive full-stack web development training covering HTML, CSS, JavaScript, React, Node.js, and database management.',
          category: 'technology',
          durationValue: 6,
          level: 'beginner'
        },
        {
          title: 'Digital Marketing Mastery',
          description: 'Learn modern digital marketing strategies including SEO, social media marketing, content creation, and analytics.',
          category: 'creative-arts',
          durationValue: 4,
          level: 'intermediate'
        },
        {
          title: 'Knitting & Textile Arts',
          description: 'Learn modern knitting techniques to create fashionable clothing, accessories, and home décor items.',
          category: 'crafts',
          durationValue: 3,
          level: 'beginner'
        },
        {
          title: 'Kuli-kuli Production',
          description: 'Master the traditional art of kuli-kuli production for entrepreneurship and food processing business.',
          category: 'culinary',
          durationValue: 2,
          level: 'beginner'
        }
      ];

      for (const program of samplePrograms) {
        await connection.execute(`
          INSERT INTO Programs (title, description, category, durationValue, level, isActive, isPublished, createdBy)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [program.title, program.description, program.category, program.durationValue, program.level, true, true, adminId]);
      }
      
      console.log('✅ Sample programs created');
    }

    // Insert sample orphanage project
    const projectExists = await connection.execute('SELECT id FROM Projects WHERE title LIKE "%Orphanage%"');
    if (projectExists[0].length === 0) {
      const adminUser = await connection.execute('SELECT id FROM Users WHERE role = "admin" LIMIT 1');
      const adminId = adminUser[0][0].id;

      await connection.execute(`
        INSERT INTO Projects (title, description, category, status, budget, fundsRaised, projectManager)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        'BCFSA Orphanage Home',
        'A state-of-the-art orphanage facility to provide comprehensive care for orphaned and vulnerable children in Niger State.',
        'orphanage',
        'planning',
        2500000000, // 2.5 billion naira
        150000000,  // 150 million naira raised
        adminId
      ]);
      
      console.log('✅ Orphanage project created');
    }

    // Close connection
    await connection.end();
    console.log('✅ MySQL setup completed successfully!');
    
    console.log('\n📋 Next steps:');
    console.log('1. Update your .env file with the correct MySQL credentials');
    console.log('2. Run: npm run dev');
    console.log('3. The application will connect to the database automatically');
    console.log('\n🔐 Default login credentials:');
    console.log('Email: admin@bcfsa.org');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ MySQL setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MySQL is running (start XAMPP MySQL service)');
    console.log('2. Check your database credentials in .env file');
    console.log('3. Ensure the MySQL user has permission to create databases');
    process.exit(1);
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
