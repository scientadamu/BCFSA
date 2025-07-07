const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bcfsa'
};

async function testLogin() {
  let connection;
  
  try {
    console.log('🔧 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully!');

    const testEmail = 'scientadamu@gmail.com';
    const testPassword = 'admin123';

    // Get user with password
    const [users] = await connection.execute(
      'SELECT id, name, email, password, role, isActive FROM users WHERE email = ?',
      [testEmail]
    );
    
    if (users.length === 0) {
      console.log('❌ User not found with email:', testEmail);
      return;
    }

    const user = users[0];
    console.log('\n📋 User found:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Active: ${user.isActive}`);
    console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);

    // Test password verification
    console.log('\n🔧 Testing password verification...');
    console.log(`   Testing password: "${testPassword}"`);
    
    const isMatch = await bcrypt.compare(testPassword, user.password);
    console.log(`   Password match: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}`);

    if (!isMatch) {
      console.log('\n🔧 Creating new password hash...');
      const newHash = await bcrypt.hash(testPassword, 12);
      console.log(`   New hash: ${newHash.substring(0, 20)}...`);
      
      // Update password in database
      await connection.execute(
        'UPDATE users SET password = ? WHERE email = ?',
        [newHash, testEmail]
      );
      console.log('✅ Password updated in database');
      
      // Test again
      const retestMatch = await bcrypt.compare(testPassword, newHash);
      console.log(`   Retest password match: ${retestMatch ? '✅ SUCCESS' : '❌ FAILED'}`);
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

testLogin();
