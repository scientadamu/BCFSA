const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bcfsa'
};

// Mock users from the AuthContext
const mockUsers = [
  {
    email: 'scientadamu@gmail.com',
    password: 'Ad@sdg2341',
    role: 'admin',
    name: 'System Administrator',
    isActive: 1,
    isEmailVerified: 1
  },
  {
    email: 'trainer@bcfsa.org',
    password: 'trainer123',
    role: 'trainer',
    name: 'John Trainer',
    isActive: 1,
    isEmailVerified: 1
  },
  {
    email: 'student@bcfsa.org',
    password: 'student123',
    role: 'trainee',
    name: 'Jane Student',
    isActive: 1,
    isEmailVerified: 1
  },
  {
    email: 'corp@bcfsa.org',
    password: 'corp123',
    role: 'corp_member',
    name: 'NYSC Corp Member',
    isActive: 1,
    isEmailVerified: 1
  }
];

async function resetAndPopulateUsers() {
  let connection;
  
  try {
    console.log('🔧 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully!');

    // Step 1: Disable foreign key checks and clear existing users
    console.log('\n🗑️ Disabling foreign key checks...');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    console.log('✅ Foreign key checks disabled');

    console.log('\n🗑️ Clearing existing users...');
    const [deleteResult] = await connection.execute('DELETE FROM users');
    console.log(`✅ Deleted ${deleteResult.affectedRows} existing users`);

    console.log('\n🔄 Re-enabling foreign key checks...');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Foreign key checks re-enabled');

    // Step 2: Reset auto-increment
    console.log('\n🔄 Resetting auto-increment...');
    await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
    console.log('✅ Auto-increment reset to 1');

    // Step 3: Insert mock users
    console.log('\n👥 Inserting mock users...');
    
    for (const user of mockUsers) {
      console.log(`\n📝 Creating user: ${user.name} (${user.email})`);
      
      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, 12);
      console.log(`   🔐 Password hashed for ${user.email}`);
      
      // Insert user
      const [insertResult] = await connection.execute(
        `INSERT INTO users (name, email, password, role, isActive, isEmailVerified, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [user.name, user.email, hashedPassword, user.role, user.isActive, user.isEmailVerified]
      );
      
      console.log(`   ✅ User created with ID: ${insertResult.insertId}`);
      
      // Test password verification
      const isMatch = await bcrypt.compare(user.password, hashedPassword);
      console.log(`   🔍 Password verification: ${isMatch ? '✅ PASS' : '❌ FAIL'}`);
    }

    // Step 4: Verify all users
    console.log('\n📋 Verifying created users...');
    const [users] = await connection.execute(
      'SELECT id, name, email, role, isActive FROM users ORDER BY id'
    );
    
    console.log('='.repeat(80));
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role} - Active: ${user.isActive ? 'Yes' : 'No'}`);
    });
    console.log('='.repeat(80));
    console.log(`✅ Total users created: ${users.length}`);

    // Step 5: Test login for each user
    console.log('\n🧪 Testing login for each user...');
    for (const mockUser of mockUsers) {
      const [userRows] = await connection.execute(
        'SELECT id, name, email, password, role FROM users WHERE email = ?',
        [mockUser.email]
      );
      
      if (userRows.length > 0) {
        const dbUser = userRows[0];
        const isMatch = await bcrypt.compare(mockUser.password, dbUser.password);
        console.log(`   ${mockUser.email}: ${isMatch ? '✅ LOGIN OK' : '❌ LOGIN FAILED'}`);
      }
    }

    console.log('\n🎉 Database reset and population completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('='.repeat(50));
    mockUsers.forEach(user => {
      console.log(`${user.role.toUpperCase()}: ${user.email} / ${user.password}`);
    });
    console.log('='.repeat(50));

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

resetAndPopulateUsers();
