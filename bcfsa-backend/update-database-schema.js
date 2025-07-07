const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bcfsa'
});

console.log('🔧 Updating database schema for applications...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }

  console.log('✅ Connected to MySQL database!');

  // Create Applications table
  const createApplicationsTable = `
    CREATE TABLE IF NOT EXISTS Applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      applicationType ENUM('trainee', 'trainer', 'staff') NOT NULL,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      dateOfBirth DATE,
      gender ENUM('male', 'female', 'other'),
      address TEXT,
      
      -- Trainee specific fields
      programId INT,
      education VARCHAR(255),
      experience TEXT,
      
      -- Trainer/Staff specific fields
      position VARCHAR(100),
      qualifications JSON,
      experience_years INT,
      specializations JSON,
      cv_file VARCHAR(255),
      certificates JSON,
      
      -- Common fields
      photo VARCHAR(255),
      emergencyContactName VARCHAR(100),
      emergencyContactPhone VARCHAR(20),
      emergencyContactRelationship VARCHAR(50),
      hasDisability BOOLEAN DEFAULT FALSE,
      disabilityDetails TEXT,
      
      -- Application status
      status ENUM('pending', 'approved', 'rejected', 'withdrawn') DEFAULT 'pending',
      applicationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      reviewedBy INT,
      reviewDate DATETIME,
      reviewNotes TEXT,
      
      -- If approved, link to created user
      userId INT,
      
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      
      FOREIGN KEY (programId) REFERENCES Programs(id),
      FOREIGN KEY (reviewedBy) REFERENCES Users(id),
      FOREIGN KEY (userId) REFERENCES Users(id),
      
      INDEX idx_application_type (applicationType),
      INDEX idx_status (status),
      INDEX idx_email (email),
      INDEX idx_application_date (applicationDate)
    );
  `;

  // Create Notifications table
  const createNotificationsTable = `
    CREATE TABLE IF NOT EXISTS Notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      type ENUM('success', 'error', 'warning', 'info') DEFAULT 'info',
      isRead BOOLEAN DEFAULT FALSE,
      actionUrl VARCHAR(255),
      relatedId INT,
      relatedType VARCHAR(50),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      readAt DATETIME,
      
      FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
      
      INDEX idx_user_read (userId, isRead),
      INDEX idx_created (createdAt),
      INDEX idx_type (type)
    );
  `;

  // Create File Uploads table
  const createFileUploadsTable = `
    CREATE TABLE IF NOT EXISTS FileUploads (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      originalName VARCHAR(255) NOT NULL,
      mimetype VARCHAR(100) NOT NULL,
      size INT NOT NULL,
      path VARCHAR(500) NOT NULL,
      uploadedBy INT,
      relatedId INT,
      relatedType VARCHAR(50),
      uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      
      FOREIGN KEY (uploadedBy) REFERENCES Users(id),
      
      INDEX idx_related (relatedId, relatedType),
      INDEX idx_uploaded_by (uploadedBy)
    );
  `;

  // Execute table creation
  connection.query(createApplicationsTable, (err) => {
    if (err) {
      console.error('❌ Failed to create Applications table:', err.message);
    } else {
      console.log('✅ Applications table created/verified');
    }

    connection.query(createNotificationsTable, (err) => {
      if (err) {
        console.error('❌ Failed to create Notifications table:', err.message);
      } else {
        console.log('✅ Notifications table created/verified');
      }

      connection.query(createFileUploadsTable, (err) => {
        if (err) {
          console.error('❌ Failed to create FileUploads table:', err.message);
        } else {
          console.log('✅ FileUploads table created/verified');
        }

        // Update statistics in homepage data
        const updateStats = `
          INSERT INTO SystemSettings (settingKey, settingValue, description, category) VALUES
          ('total_graduates', '300', 'Total number of graduates', 'statistics'),
          ('director_name', 'Dr. Amina Bello', 'Director name', 'staff'),
          ('director_photo', 'director.jpg', 'Director photo', 'staff'),
          ('auditor_name', 'Mr. Ibrahim Sani', 'Auditor name', 'staff'),
          ('auditor_photo', 'auditor.jpg', 'Auditor photo', 'staff'),
          ('secretary_name', 'Mrs. Fatima Usman', 'Secretary name', 'staff'),
          ('secretary_photo', 'secretary.jpg', 'Secretary photo', 'staff')
          ON DUPLICATE KEY UPDATE settingValue = VALUES(settingValue)
        `;

        connection.query(updateStats, (err) => {
          if (err) {
            console.error('❌ Failed to update statistics:', err.message);
          } else {
            console.log('✅ Statistics updated');
          }

          // Verify tables
          connection.query('SHOW TABLES', (err, tables) => {
            if (!err) {
              console.log('\n📋 All tables in database:');
              tables.forEach(table => {
                console.log(`  - ${Object.values(table)[0]}`);
              });
            }

            connection.end();
            console.log('\n🎉 Database schema update completed!');
          });
        });
      });
    });
  });
});
