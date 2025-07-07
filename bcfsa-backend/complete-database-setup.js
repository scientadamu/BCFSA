const mysql = require('mysql2/promise');

async function setupCompleteDatabase() {
  console.log('🚀 Setting up Complete BCFSA Database with All Tables and Data...\n');

  try {
    // Connect to MySQL server
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL server!\n');

    // Create database
    await connection.execute('CREATE DATABASE IF NOT EXISTS bcfsa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    console.log('✅ Database "bcfsa" created!\n');

    // Close and reconnect to the specific database
    await connection.end();
    
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'bcfsa',
      multipleStatements: true
    });

    console.log('📂 Connected to database "bcfsa"\n');

    // Drop existing tables to recreate with fresh data
    console.log('🗑️ Dropping existing tables...');
    const dropTables = `
      SET FOREIGN_KEY_CHECKS = 0;
      DROP TABLE IF EXISTS AssessmentSubmissions;
      DROP TABLE IF EXISTS Assessments;
      DROP TABLE IF EXISTS Attendance;
      DROP TABLE IF EXISTS Enrollments;
      DROP TABLE IF EXISTS OrphanageChildren;
      DROP TABLE IF EXISTS Projects;
      DROP TABLE IF EXISTS Programs;
      DROP TABLE IF EXISTS Staff;
      DROP TABLE IF EXISTS Students;
      DROP TABLE IF EXISTS Users;
      DROP TABLE IF EXISTS Notifications;
      DROP TABLE IF EXISTS SystemSettings;
      SET FOREIGN_KEY_CHECKS = 1;
    `;
    
    await dbConnection.execute(dropTables);
    console.log('✅ Existing tables dropped\n');

    // Create Users table (base table for all user types)
    console.log('📋 Creating Users table...');
    await dbConnection.execute(`
      CREATE TABLE Users (
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
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role),
        INDEX idx_active (isActive)
      )
    `);
    console.log('✅ Users table created');

    // Create Staff table (for trainers and admin staff)
    console.log('📋 Creating Staff table...');
    await dbConnection.execute(`
      CREATE TABLE Staff (
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
        FOREIGN KEY (supervisorId) REFERENCES Staff(id),
        INDEX idx_staff_id (staffId),
        INDEX idx_department (department),
        INDEX idx_status (status)
      )
    `);
    console.log('✅ Staff table created');

    // Create Students table (for trainees)
    console.log('📋 Creating Students table...');
    await dbConnection.execute(`
      CREATE TABLE Students (
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
      )
    `);
    console.log('✅ Students table created');

    // Create Programs table with all UI programs
    console.log('📋 Creating Programs table...');
    await dbConnection.execute(`
      CREATE TABLE Programs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        category ENUM('technology', 'creative', 'culinary', 'crafts', 'business') NOT NULL,
        durationValue INT NOT NULL,
        durationUnit ENUM('days', 'weeks', 'months', 'years') DEFAULT 'months',
        level ENUM('beginner', 'intermediate', 'advanced', 'all-levels') DEFAULT 'beginner',
        image VARCHAR(255),
        curriculum JSON,
        requirements TEXT,
        careerPaths JSON,
        certificationName VARCHAR(255),
        certificationDescription TEXT,
        certificationAuthority VARCHAR(255) DEFAULT 'Bago Center For Skills Acquisition',
        instructors JSON,
        maxStudents INT DEFAULT 30,
        currentEnrollment INT DEFAULT 0,
        feeAmount DECIMAL(10,2) DEFAULT 0,
        feeCurrency VARCHAR(3) DEFAULT 'NGN',
        isFree BOOLEAN DEFAULT TRUE,
        scheduleStartDate DATE,
        scheduleEndDate DATE,
        classTime VARCHAR(50),
        classDays JSON,
        classLocation VARCHAR(100),
        isActive BOOLEAN DEFAULT TRUE,
        isPublished BOOLEAN DEFAULT TRUE,
        tags JSON,
        createdBy INT NOT NULL,
        updatedBy INT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES Users(id),
        FOREIGN KEY (updatedBy) REFERENCES Users(id),
        INDEX idx_category (category),
        INDEX idx_level (level),
        INDEX idx_active_published (isActive, isPublished)
      )
    `);
    console.log('✅ Programs table created');

    // Create Enrollments table
    console.log('📋 Creating Enrollments table...');
    await dbConnection.execute(`
      CREATE TABLE Enrollments (
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
        FOREIGN KEY (studentId) REFERENCES Students(id) ON DELETE CASCADE,
        FOREIGN KEY (programId) REFERENCES Programs(id) ON DELETE CASCADE,
        UNIQUE KEY unique_enrollment (studentId, programId),
        INDEX idx_student_status (studentId, status),
        INDEX idx_program_status (programId, status)
      )
    `);
    console.log('✅ Enrollments table created');

    // Create OrphanageChildren table
    console.log('📋 Creating OrphanageChildren table...');
    await dbConnection.execute(`
      CREATE TABLE OrphanageChildren (
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
        FOREIGN KEY (caregiverAssigned) REFERENCES Staff(id),
        INDEX idx_status (status),
        INDEX idx_admission_date (admissionDate)
      )
    `);
    console.log('✅ OrphanageChildren table created');

    // Create Projects table
    console.log('📋 Creating Projects table...');
    await dbConnection.execute(`
      CREATE TABLE Projects (
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
        FOREIGN KEY (projectManager) REFERENCES Staff(id),
        INDEX idx_category (category),
        INDEX idx_status (status)
      )
    `);
    console.log('✅ Projects table created');

    console.log('\n📊 All tables created successfully!\n');

    // Close connection
    await dbConnection.end();
    console.log('✅ Database setup completed successfully!');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

setupCompleteDatabase();
