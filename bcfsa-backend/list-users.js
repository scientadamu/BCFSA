const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bcfsa'
};

async function listAllUsers() {
  let connection;
  
  try {
    console.log('🔧 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully!');

    // Get all users
    const [users] = await connection.execute('SELECT id, name, email, role, isActive FROM users ORDER BY id');
    
    console.log('\n📋 All users in database:');
    console.log('='.repeat(80));
    
    if (users.length === 0) {
      console.log('❌ No users found in database');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ID: ${user.id}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Active: ${user.isActive ? 'Yes' : 'No'}`);
        console.log('-'.repeat(40));
      });
      
      console.log(`\n✅ Total users found: ${users.length}`);
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

listAllUsers();
