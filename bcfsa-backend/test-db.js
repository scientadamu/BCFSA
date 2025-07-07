// Simple database connection test
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bcfsa'
});

console.log('🔧 Testing MySQL connection...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    if (err.code === 'ECONNREFUSED') {
      console.log('💡 Make sure MySQL is running (start XAMPP MySQL service)');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Database "bcfsa" does not exist. Create it in phpMyAdmin first.');
    }
    process.exit(1);
  }

  console.log('✅ Connected to MySQL database successfully!');
  
  // Test query
  connection.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('❌ Query failed:', err.message);
    } else {
      console.log('📋 Tables in database:');
      results.forEach(row => {
        console.log(`  - ${Object.values(row)[0]}`);
      });
    }
    
    connection.end();
    console.log('✅ Database test completed!');
  });
});
