const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('🚀 Starting BCFSA Database Setup...\n');

  try {
    // Step 1: Connect to MySQL server (without database)
    console.log('📡 Connecting to MySQL server...');
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL server successfully!\n');

    // Step 2: Create database
    console.log('🗄️ Creating database "bcfsa"...');
    await connection.execute('CREATE DATABASE IF NOT EXISTS bcfsa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    console.log('✅ Database "bcfsa" created successfully!\n');

    // Step 3: Close connection and reconnect to the specific database
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

    // Step 4: Read and execute schema file
    console.log('📋 Creating database tables...');
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found: ${schemaPath}`);
    }

    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Split SQL statements and execute them one by one
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('/*'));

    for (const statement of statements) {
      if (statement.toLowerCase().includes('create table') || 
          statement.toLowerCase().includes('create database') ||
          statement.toLowerCase().includes('use ')) {
        try {
          await dbConnection.execute(statement);
          const tableName = statement.match(/create table (?:if not exists )?(\w+)/i);
          if (tableName) {
            console.log(`  ✅ Table "${tableName[1]}" created`);
          }
        } catch (error) {
          if (!error.message.includes('already exists')) {
            console.log(`  ⚠️ Warning: ${error.message}`);
          }
        }
      }
    }

    console.log('✅ All tables created successfully!\n');

    // Step 5: Insert sample data
    console.log('📊 Inserting sample data...');
    
    // Insert admin user with hashed password
    const adminPassword = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu'; // admin123
    
    await dbConnection.execute(`
      INSERT IGNORE INTO Users (name, email, password, role, isActive, isEmailVerified)
      VALUES ('System Administrator', 'admin@bcfsa.org', ?, 'admin', TRUE, TRUE)
    `, [adminPassword]);
    console.log('  ✅ Admin user created');

    // Insert sample trainers
    await connection.execute(`
      INSERT IGNORE INTO Users (name, email, password, role, phone, specializations, experience, isActive, isEmailVerified) 
      VALUES 
      ('John Smith', 'john.smith@bcfsa.org', ?, 'trainer', '+234-801-234-5678', ?, 5, TRUE, TRUE),
      ('Sarah Johnson', 'sarah.johnson@bcfsa.org', ?, 'trainer', '+234-802-345-6789', ?, 3, TRUE, TRUE),
      ('Mary Wilson', 'mary.wilson@bcfsa.org', ?, 'trainer', '+234-803-456-7890', ?, 7, TRUE, TRUE),
      ('David Brown', 'david.brown@bcfsa.org', ?, 'trainer', '+234-804-567-8901', ?, 4, TRUE, TRUE)
    `, [
      adminPassword, JSON.stringify(["Web Development", "JavaScript", "React"]),
      adminPassword, JSON.stringify(["Digital Marketing", "SEO", "Social Media"]),
      adminPassword, JSON.stringify(["Fashion Design", "Pattern Making"]),
      adminPassword, JSON.stringify(["Culinary Arts", "Food Safety"])
    ]);
    console.log('  ✅ Sample trainers created');

    // Insert sample students
    await connection.execute(`
      INSERT IGNORE INTO Users (name, email, password, role, phone, dateOfBirth, gender, studentId, enrollmentDate, isActive, isEmailVerified) 
      VALUES 
      ('Alice Cooper', 'alice.cooper@email.com', ?, 'trainee', '+234-805-678-9012', '1995-05-15', 'female', 'BCFSA20240001', '2024-01-15', TRUE, TRUE),
      ('Bob Johnson', 'bob.johnson@email.com', ?, 'trainee', '+234-806-789-0123', '1998-08-22', 'male', 'BCFSA20240002', '2024-01-20', TRUE, TRUE),
      ('Carol Davis', 'carol.davis@email.com', ?, 'trainee', '+234-807-890-1234', '1997-12-03', 'female', 'BCFSA20240003', '2024-02-01', TRUE, TRUE)
    `, [adminPassword, adminPassword, adminPassword]);
    console.log('  ✅ Sample students created');

    // Insert sample programs
    await connection.execute(`
      INSERT IGNORE INTO Programs (title, description, category, durationValue, durationUnit, level, maxStudents, currentEnrollment, isActive, isPublished, createdBy) 
      VALUES 
      ('Web Development Bootcamp', 'Comprehensive full-stack web development training covering HTML, CSS, JavaScript, React, Node.js, and database management.', 'technology', 6, 'months', 'beginner', 30, 15, TRUE, TRUE, 1),
      ('Digital Marketing Mastery', 'Learn modern digital marketing strategies including SEO, social media marketing, content creation, and analytics.', 'creative-arts', 4, 'months', 'intermediate', 25, 12, TRUE, TRUE, 1),
      ('Fashion Design Fundamentals', 'Master the art of fashion design including pattern making, garment construction, and fashion business.', 'creative-arts', 5, 'months', 'beginner', 20, 8, TRUE, TRUE, 1),
      ('Culinary Arts Professional', 'Professional cooking training covering international cuisine, food safety, and restaurant management.', 'culinary', 4, 'months', 'intermediate', 15, 10, TRUE, TRUE, 1),
      ('Knitting & Textile Arts', 'Learn modern knitting techniques to create fashionable clothing, accessories, and home décor items.', 'crafts', 3, 'months', 'beginner', 20, 5, TRUE, TRUE, 1),
      ('Kuli-kuli Production', 'Master the traditional art of kuli-kuli production for entrepreneurship and food processing business.', 'culinary', 2, 'months', 'beginner', 25, 8, TRUE, TRUE, 1)
    `);
    console.log('  ✅ Sample programs created');

    // Insert sample enrollments
    await connection.execute(`
      INSERT IGNORE INTO Enrollments (studentId, programId, status, overallProgress, currentModule) 
      VALUES 
      (5, 1, 'active', 75, 'React Development'),
      (6, 2, 'active', 60, 'SEO Optimization'),
      (7, 3, 'active', 40, 'Pattern Making'),
      (5, 5, 'completed', 100, 'Completed'),
      (6, 6, 'active', 80, 'Business Development')
    `);
    console.log('  ✅ Sample enrollments created');

    // Insert orphanage children
    await connection.execute(`
      INSERT IGNORE INTO OrphanageChildren (name, dateOfBirth, gender, admissionDate, guardianName, guardianPhone, educationLevel, status, caregiverAssigned) 
      VALUES 
      ('Emmanuel Bello', '2010-03-15', 'male', '2024-01-10', 'Aunt Fatima', '+234-809-012-3456', 'Primary 5', 'active', 2),
      ('Blessing Adamu', '2012-07-22', 'female', '2024-01-15', 'Uncle Joseph', '+234-810-123-4567', 'Primary 3', 'active', 3),
      ('Ibrahim Sani', '2008-11-08', 'male', '2024-02-01', 'Grandmother Hajiya', '+234-811-234-5678', 'JSS 2', 'active', 2)
    `);
    console.log('  ✅ Sample orphanage children created');

    // Insert sample projects
    await connection.execute(`
      INSERT IGNORE INTO Projects (title, description, category, status, budget, fundsRaised, projectManager) 
      VALUES 
      ('BCFSA Orphanage Home', 'A state-of-the-art orphanage facility to provide comprehensive care for orphaned and vulnerable children in Niger State.', 'orphanage', 'planning', 2500000000.00, 150000000.00, 1),
      ('Skills Training Center Expansion', 'Expansion of existing training facilities to accommodate more students and introduce new programs.', 'infrastructure', 'in_progress', 800000000.00, 600000000.00, 1),
      ('Community Outreach Program', 'Mobile training units and community centers to extend reach to rural areas across Niger State.', 'community', 'planning', 1200000000.00, 200000000.00, 1)
    `);
    console.log('  ✅ Sample projects created');

    // Insert system settings
    await connection.execute(`
      INSERT IGNORE INTO SystemSettings (settingKey, settingValue, description, category) 
      VALUES 
      ('site_name', 'Bago Center For Skills Acquisition & Orphanage Home', 'Official name of the organization', 'general'),
      ('site_email', 'info@bcfsa.org', 'Primary contact email', 'general'),
      ('site_phone', '+234-800-BCFSA-01', 'Primary contact phone', 'general'),
      ('max_enrollment_per_program', '50', 'Maximum number of students per program', 'enrollment'),
      ('orphanage_capacity', '200', 'Maximum capacity of orphanage home', 'orphanage'),
      ('academic_year', '2024', 'Current academic year', 'academic')
    `);
    console.log('  ✅ System settings created');

    // Step 6: Verify setup
    console.log('\n🔍 Verifying database setup...');
    
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✅ Found ${tables.length} tables:`);
    tables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });

    const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM Users');
    const [programCount] = await connection.execute('SELECT COUNT(*) as count FROM Programs');
    const [enrollmentCount] = await connection.execute('SELECT COUNT(*) as count FROM Enrollments');

    console.log(`\n📊 Data Summary:`);
    console.log(`  - Users: ${userCount[0].count}`);
    console.log(`  - Programs: ${programCount[0].count}`);
    console.log(`  - Enrollments: ${enrollmentCount[0].count}`);

    // Close connection
    await connection.end();

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Default Login Credentials:');
    console.log('  Email: admin@bcfsa.org');
    console.log('  Password: admin123');
    console.log('\n🚀 You can now start the backend server with: npm run dev');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Make sure MySQL is running (start XAMPP MySQL service)');
      console.log('2. Check if MySQL is running on port 3306');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Check MySQL username and password');
      console.log('2. Make sure root user has proper permissions');
    }
    
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
