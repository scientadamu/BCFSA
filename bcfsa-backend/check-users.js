const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bcfsa'
};

async function checkAndCreateUsers() {
  let connection;
  
  try {
    console.log('🔧 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully!');

    // Check if users exist
    const [users] = await connection.execute('SELECT id, name, email, role FROM users LIMIT 10');
    console.log('\n📋 Current users in database:');
    
    if (users.length === 0) {
      console.log('❌ No users found in database');
      
      // Create default admin user
      console.log('\n🔧 Creating default admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      await connection.execute(
        'INSERT INTO users (name, email, password, role, isActive, isEmailVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
        ['System Administrator', 'admin@bcfsa.org', hashedPassword, 'admin', 1, 1]
      );
      
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@bcfsa.org');
      console.log('🔑 Password: admin123');
      
      // Create sample trainer
      const trainerPassword = await bcrypt.hash('trainer123', 12);
      await connection.execute(
        'INSERT INTO users (name, email, password, role, isActive, isEmailVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
        ['John Trainer', 'trainer@bcfsa.org', trainerPassword, 'trainer', 1, 1]
      );
      
      // Create sample student
      const studentPassword = await bcrypt.hash('student123', 12);
      await connection.execute(
        'INSERT INTO users (name, email, password, role, isActive, isEmailVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
        ['Jane Student', 'student@bcfsa.org', studentPassword, 'trainee', 1, 1]
      );
      
      // Create sample corp member
      const corpPassword = await bcrypt.hash('corp123', 12);
      await connection.execute(
        'INSERT INTO users (name, email, password, role, isActive, isEmailVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
        ['NYSC Corp Member', 'corp@bcfsa.org', corpPassword, 'corp_member', 1, 1]
      );
      
      console.log('✅ Sample users created successfully!');
      
    } else {
      console.log(`✅ Found ${users.length} users:`);
      users.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
      });
    }

    // Test password verification for admin user
    console.log('\n🔧 Testing password verification...');
    const [adminUsers] = await connection.execute(
      'SELECT id, name, email, password, role FROM users WHERE email = ?',
      ['admin@bcfsa.org']
    );
    
    if (adminUsers.length > 0) {
      const admin = adminUsers[0];
      const isValidPassword = await bcrypt.compare('admin123', admin.password);
      console.log(`✅ Admin password verification: ${isValidPassword ? 'PASSED' : 'FAILED'}`);
      
      if (!isValidPassword) {
        console.log('🔧 Updating admin password...');
        const newHashedPassword = await bcrypt.hash('admin123', 12);
        await connection.execute(
          'UPDATE users SET password = ? WHERE email = ?',
          [newHashedPassword, 'admin@bcfsa.org']
        );
        console.log('✅ Admin password updated successfully!');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

checkAndCreateUsers();
