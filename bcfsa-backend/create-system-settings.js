const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bcfsa'
});

console.log('🔧 Creating SystemSettings table...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }

  console.log('✅ Connected to MySQL database!');

  // Create SystemSettings table
  const createSystemSettingsTable = `
    CREATE TABLE IF NOT EXISTS SystemSettings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      settingKey VARCHAR(100) NOT NULL UNIQUE,
      settingValue TEXT,
      description TEXT,
      category VARCHAR(50),
      updatedBy INT,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (updatedBy) REFERENCES Users(id),
      INDEX idx_category (category)
    );
  `;

  connection.query(createSystemSettingsTable, (err) => {
    if (err) {
      console.error('❌ Failed to create SystemSettings table:', err.message);
    } else {
      console.log('✅ SystemSettings table created');

      // Insert default settings
      const insertSettings = `
        INSERT INTO SystemSettings (settingKey, settingValue, description, category) VALUES
        ('total_graduates', '300', 'Total number of graduates', 'statistics'),
        ('total_students', '1234', 'Total current students', 'statistics'),
        ('active_programs', '12', 'Number of active programs', 'statistics'),
        ('completion_rate', '87', 'Program completion rate percentage', 'statistics'),
        ('director_name', 'Dr. Amina Bello', 'Director name', 'staff'),
        ('director_position', 'Executive Director', 'Director position', 'staff'),
        ('director_photo', 'director.jpg', 'Director photo filename', 'staff'),
        ('auditor_name', 'Mr. Ibrahim Sani', 'Auditor name', 'staff'),
        ('auditor_position', 'Chief Auditor', 'Auditor position', 'staff'),
        ('auditor_photo', 'auditor.jpg', 'Auditor photo filename', 'staff'),
        ('secretary_name', 'Mrs. Fatima Usman', 'Secretary name', 'staff'),
        ('secretary_position', 'Administrative Secretary', 'Secretary position', 'staff'),
        ('secretary_photo', 'secretary.jpg', 'Secretary photo filename', 'staff'),
        ('site_name', 'Bago Center For Skills Acquisition & Orphanage Home', 'Official site name', 'general'),
        ('site_email', 'info@bcfsa.org', 'Primary contact email', 'general'),
        ('site_phone', '+234-800-BCFSA-01', 'Primary contact phone', 'general'),
        ('orphanage_capacity', '200', 'Maximum orphanage capacity', 'orphanage'),
        ('current_orphans', '45', 'Current children in care', 'orphanage')
        ON DUPLICATE KEY UPDATE settingValue = VALUES(settingValue)
      `;

      connection.query(insertSettings, (err) => {
        if (err) {
          console.error('❌ Failed to insert settings:', err.message);
        } else {
          console.log('✅ Default settings inserted');
        }

        connection.end();
        console.log('🎉 SystemSettings setup completed!');
      });
    }
  });
});
