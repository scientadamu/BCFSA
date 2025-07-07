const mysql = require('mysql2');

async function quickSetup() {
  console.log('🚀 Quick BCFSA Database Setup...\n');

  // Create connection
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    multipleStatements: true
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('❌ Connection failed:', err.message);
        reject(err);
        return;
      }

      console.log('✅ Connected to MySQL server!\n');

      // Create database
      connection.query('CREATE DATABASE IF NOT EXISTS bcfsa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', (err) => {
        if (err) {
          console.error('❌ Failed to create database:', err.message);
          reject(err);
          return;
        }

        console.log('✅ Database "bcfsa" created!\n');

        // Use database
        connection.query('USE bcfsa', (err) => {
          if (err) {
            console.error('❌ Failed to use database:', err.message);
            reject(err);
            return;
          }

          console.log('📂 Using database "bcfsa"\n');

          // Create tables
          const createTables = `
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
            );

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
            );

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
            );

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
            );

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
            );
          `;

          console.log('📋 Creating tables...');
          connection.query(createTables, (err) => {
            if (err) {
              console.error('❌ Failed to create tables:', err.message);
              reject(err);
              return;
            }

            console.log('✅ All tables created successfully!\n');

            // Insert sample data
            const adminPassword = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu'; // admin123

            const insertData = `
              INSERT IGNORE INTO Users (name, email, password, role, isActive, isEmailVerified) 
              VALUES ('System Administrator', 'admin@bcfsa.org', '${adminPassword}', 'admin', TRUE, TRUE);

              INSERT IGNORE INTO Users (name, email, password, role, phone, isActive, isEmailVerified) 
              VALUES 
              ('John Smith', 'john.smith@bcfsa.org', '${adminPassword}', 'trainer', '+234-801-234-5678', TRUE, TRUE),
              ('Sarah Johnson', 'sarah.johnson@bcfsa.org', '${adminPassword}', 'trainer', '+234-802-345-6789', TRUE, TRUE),
              ('Alice Cooper', 'alice.cooper@email.com', '${adminPassword}', 'trainee', '+234-805-678-9012', TRUE, TRUE),
              ('Bob Johnson', 'bob.johnson@email.com', '${adminPassword}', 'trainee', '+234-806-789-0123', TRUE, TRUE);

              INSERT IGNORE INTO Programs (title, description, category, durationValue, level, isActive, isPublished, createdBy) 
              VALUES 
              ('Web Development Bootcamp', 'Comprehensive full-stack web development training', 'technology', 6, 'beginner', TRUE, TRUE, 1),
              ('Digital Marketing Mastery', 'Learn modern digital marketing strategies', 'creative-arts', 4, 'intermediate', TRUE, TRUE, 1),
              ('Knitting & Textile Arts', 'Learn modern knitting techniques', 'crafts', 3, 'beginner', TRUE, TRUE, 1),
              ('Kuli-kuli Production', 'Master traditional kuli-kuli production', 'culinary', 2, 'beginner', TRUE, TRUE, 1);

              INSERT IGNORE INTO Projects (title, description, category, status, budget, fundsRaised, projectManager) 
              VALUES 
              ('BCFSA Orphanage Home', 'State-of-the-art orphanage facility', 'orphanage', 'planning', 2500000000.00, 150000000.00, 1),
              ('Skills Training Center Expansion', 'Facility expansion project', 'infrastructure', 'in_progress', 800000000.00, 600000000.00, 1);
            `;

            console.log('📊 Inserting sample data...');
            connection.query(insertData, (err) => {
              if (err) {
                console.error('❌ Failed to insert data:', err.message);
                reject(err);
                return;
              }

              console.log('✅ Sample data inserted successfully!\n');

              // Verify setup
              connection.query('SHOW TABLES', (err, tables) => {
                if (err) {
                  console.error('❌ Failed to verify setup:', err.message);
                  reject(err);
                  return;
                }

                console.log('🔍 Database verification:');
                console.log(`✅ Found ${tables.length} tables:`);
                tables.forEach(table => {
                  console.log(`  - ${Object.values(table)[0]}`);
                });

                connection.query('SELECT COUNT(*) as count FROM Users', (err, result) => {
                  if (!err) {
                    console.log(`✅ Users: ${result[0].count}`);
                  }

                  connection.query('SELECT COUNT(*) as count FROM Programs', (err, result) => {
                    if (!err) {
                      console.log(`✅ Programs: ${result[0].count}`);
                    }

                    connection.end();
                    console.log('\n🎉 Database setup completed successfully!');
                    console.log('\n📋 Default Login Credentials:');
                    console.log('  Email: admin@bcfsa.org');
                    console.log('  Password: admin123');
                    console.log('\n🚀 You can now start the backend server!');
                    resolve();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

quickSetup().catch(console.error);
