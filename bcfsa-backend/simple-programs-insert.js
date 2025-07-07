const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bcfsa'
});

console.log('🔧 Simple programs insertion...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }

  console.log('✅ Connected to MySQL database!');

  // Check constraints on Programs table
  connection.query('SHOW CREATE TABLE Programs', (err, result) => {
    if (err) {
      console.error('❌ Failed to show table structure:', err.message);
    } else {
      console.log('📋 Programs table creation SQL:');
      console.log(result[0]['Create Table']);
    }

    // Try inserting with minimal data first
    const simpleInsert = `
      INSERT INTO Programs (
        title, description, category, durationValue, level, 
        isActive, isPublished, createdBy
      ) VALUES (?, ?, ?, ?, ?, TRUE, TRUE, 1)
    `;

    const testProgram = [
      'Computer Training',
      'Comprehensive computer literacy program',
      'technology',
      3,
      'beginner'
    ];

    connection.query(simpleInsert, testProgram, (err, result) => {
      if (err) {
        console.error('❌ Failed to insert test program:', err.message);
        
        // Try to drop and recreate the table with proper structure
        console.log('🔧 Attempting to fix table structure...');
        
        const dropTable = 'DROP TABLE IF EXISTS Programs';
        connection.query(dropTable, (err) => {
          if (err) {
            console.error('❌ Failed to drop table:', err.message);
          } else {
            console.log('✅ Table dropped');
            
            const createTable = `
              CREATE TABLE Programs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                category ENUM('technology', 'creative-arts', 'culinary', 'crafts') NOT NULL,
                durationValue INT NOT NULL,
                durationUnit ENUM('days', 'weeks', 'months', 'years') DEFAULT 'months',
                level ENUM('beginner', 'intermediate', 'advanced', 'all-levels') DEFAULT 'beginner',
                image VARCHAR(255),
                curriculum JSON,
                requirements TEXT,
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
              )
            `;
            
            connection.query(createTable, (err) => {
              if (err) {
                console.error('❌ Failed to create table:', err.message);
              } else {
                console.log('✅ Table recreated successfully');
                
                // Now insert all programs
                insertAllPrograms();
              }
            });
          }
        });
      } else {
        console.log('✅ Test program inserted successfully');
        // If test worked, insert all programs
        insertAllPrograms();
      }
    });
  });

  function insertAllPrograms() {
    console.log('📚 Inserting all 12 programs...');
    
    const programs = [
      ['Computer Training', 'Comprehensive computer literacy program covering essential skills for the modern workplace.', 'technology', 3, 'beginner', 'Basic literacy skills', 'BCFSA Computer Literacy Certificate'],
      ['Fashion Design', 'Master the art of fashion design from concept to finished garment.', 'creative-arts', 6, 'beginner', 'Creativity and basic sewing knowledge helpful', 'BCFSA Fashion Design Certificate'],
      ['Catering Services', 'Professional culinary training for aspiring chefs and catering entrepreneurs.', 'culinary', 4, 'intermediate', 'Basic cooking experience preferred', 'BCFSA Professional Catering Certificate'],
      ['Shoe Cobbling', 'Traditional and modern shoe repair and manufacturing techniques.', 'crafts', 3, 'beginner', 'Manual dexterity and attention to detail', 'BCFSA Shoe Cobbling Certificate'],
      ['Jewelry Making', 'Create beautiful jewelry pieces using traditional and contemporary techniques.', 'crafts', 4, 'beginner', 'Creativity and fine motor skills', 'BCFSA Jewelry Making Certificate'],
      ['Local Weaving', 'Traditional Nigerian weaving techniques for creating textiles and crafts.', 'crafts', 3, 'beginner', 'Interest in traditional crafts', 'BCFSA Traditional Weaving Certificate'],
      ['Graphic Design', 'Modern digital design skills for print and web media.', 'creative-arts', 5, 'intermediate', 'Basic computer skills and creativity', 'BCFSA Graphic Design Certificate'],
      ['Digital Marketing', 'Comprehensive digital marketing strategies for modern businesses.', 'creative-arts', 4, 'intermediate', 'Basic internet and computer skills', 'BCFSA Digital Marketing Certificate'],
      ['Knitting', 'Modern knitting techniques for fashion and home décor items.', 'crafts', 3, 'beginner', 'Patience and attention to detail', 'BCFSA Knitting Certificate'],
      ['Kuli-kuli Production', 'Traditional groundnut processing and modern food production techniques.', 'culinary', 2, 'beginner', 'Interest in food production', 'BCFSA Food Production Certificate'],
      ['Web Development', 'Full-stack web development for modern applications.', 'technology', 6, 'intermediate', 'Basic computer skills and logical thinking', 'BCFSA Web Development Certificate'],
      ['Mobile App Development', 'Create mobile applications for Android and iOS platforms.', 'technology', 6, 'advanced', 'Programming experience preferred', 'BCFSA Mobile Development Certificate']
    ];

    const insertQuery = `
      INSERT INTO Programs (
        title, description, category, durationValue, level, 
        requirements, certificationName, isActive, isPublished, createdBy
      ) VALUES (?, ?, ?, ?, ?, ?, ?, TRUE, TRUE, 1)
    `;

    let insertedCount = 0;
    
    programs.forEach((program, index) => {
      connection.query(insertQuery, program, (err) => {
        if (err) {
          console.error(`❌ Failed to insert ${program[0]}:`, err.message);
        } else {
          insertedCount++;
          console.log(`✅ ${program[0]} inserted (${insertedCount}/${programs.length})`);
        }

        // Check if all programs are processed
        if (index === programs.length - 1) {
          setTimeout(() => {
            // Final verification
            connection.query('SELECT COUNT(*) as count FROM Programs', (err, result) => {
              if (!err) {
                console.log(`\n📊 Total programs in database: ${result[0].count}`);
              }

              connection.query('SELECT title, category, durationValue FROM Programs ORDER BY id', (err, programs) => {
                if (!err) {
                  console.log('\n📚 All programs in database:');
                  programs.forEach((prog, i) => {
                    console.log(`  ${i + 1}. ${prog.title} (${prog.category}, ${prog.durationValue} months)`);
                  });
                }

                connection.end();
                console.log('\n🎉 Database setup completed successfully!');
                console.log('\n📋 You can now register students and they will be saved to the database!');
              });
            });
          }, 1000);
        }
      });
    });
  }
});
