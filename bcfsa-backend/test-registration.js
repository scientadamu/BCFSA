const mysql = require('mysql2');

// Test registration directly to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bcfsa'
});

console.log('🧪 Testing registration process...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }

  console.log('✅ Connected to database');

  // Test data
  const testStudent = {
    name: 'Test Student',
    email: 'test@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu', // admin123
    role: 'trainee',
    phone: '+234-123-456-7890',
    gender: 'male',
    dateOfBirth: '1995-01-01',
    address: 'Test Address',
    emergencyContactName: 'Test Guardian',
    emergencyContactPhone: '+234-987-654-3210'
  };

  // Insert user
  const insertUser = `
    INSERT INTO Users (name, email, password, role, phone, gender, dateOfBirth, address, emergencyContactName, emergencyContactPhone, isActive, isEmailVerified)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE, TRUE)
  `;

  const userValues = [
    testStudent.name,
    testStudent.email,
    testStudent.password,
    testStudent.role,
    testStudent.phone,
    testStudent.gender,
    testStudent.dateOfBirth,
    testStudent.address,
    testStudent.emergencyContactName,
    testStudent.emergencyContactPhone
  ];

  connection.query(insertUser, userValues, (err, result) => {
    if (err) {
      console.error('❌ Failed to insert user:', err.message);
    } else {
      console.log('✅ User inserted with ID:', result.insertId);
      
      const userId = result.insertId;
      
      // Insert student record
      const insertStudent = `
        INSERT INTO Students (userId, studentId, enrollmentDate, status)
        VALUES (?, ?, CURDATE(), 'active')
      `;
      
      const studentId = `BCFSA-STU-${new Date().getFullYear()}-${String(userId).padStart(3, '0')}`;
      
      connection.query(insertStudent, [userId, studentId], (err, result) => {
        if (err) {
          console.error('❌ Failed to insert student:', err.message);
        } else {
          console.log('✅ Student record created with ID:', result.insertId);
          
          // Test enrollment in a program
          connection.query('SELECT id FROM Programs LIMIT 1', (err, programs) => {
            if (err || programs.length === 0) {
              console.error('❌ No programs found');
            } else {
              const programId = programs[0].id;
              
              const insertEnrollment = `
                INSERT INTO Enrollments (studentId, programId, status)
                VALUES (?, ?, 'pending')
              `;
              
              connection.query(insertEnrollment, [result.insertId, programId], (err, enrollResult) => {
                if (err) {
                  console.error('❌ Failed to create enrollment:', err.message);
                } else {
                  console.log('✅ Enrollment created with ID:', enrollResult.insertId);
                }
                
                // Verify the complete registration
                const verifyQuery = `
                  SELECT 
                    u.name, u.email, u.phone,
                    s.studentId, s.status as studentStatus,
                    p.title as programTitle,
                    e.status as enrollmentStatus
                  FROM Users u
                  JOIN Students s ON u.id = s.userId
                  LEFT JOIN Enrollments e ON s.id = e.studentId
                  LEFT JOIN Programs p ON e.programId = p.id
                  WHERE u.id = ?
                `;
                
                connection.query(verifyQuery, [userId], (err, results) => {
                  if (err) {
                    console.error('❌ Failed to verify registration:', err.message);
                  } else {
                    console.log('\n📋 Registration Verification:');
                    console.log('Name:', results[0].name);
                    console.log('Email:', results[0].email);
                    console.log('Phone:', results[0].phone);
                    console.log('Student ID:', results[0].studentId);
                    console.log('Student Status:', results[0].studentStatus);
                    console.log('Program:', results[0].programTitle || 'None');
                    console.log('Enrollment Status:', results[0].enrollmentStatus || 'None');
                  }
                  
                  connection.end();
                  console.log('\n🎉 Registration test completed!');
                });
              });
            }
          });
        }
      });
    }
  });
});
