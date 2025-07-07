const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bcfsa'
});

console.log('🔧 Fixing Programs table and inserting all programs...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }

  console.log('✅ Connected to MySQL database!');

  // First, let's check the current structure
  connection.query('DESCRIBE Programs', (err, result) => {
    if (err) {
      console.error('❌ Failed to describe Programs table:', err.message);
    } else {
      console.log('📋 Current Programs table structure:');
      result.forEach(column => {
        console.log(`  - ${column.Field}: ${column.Type}`);
      });
    }

    // Clear existing programs
    connection.query('DELETE FROM Programs', (err) => {
      if (err) {
        console.error('❌ Failed to clear programs:', err.message);
      } else {
        console.log('✅ Existing programs cleared');

        // Insert programs one by one to avoid constraint issues
        const programs = [
          {
            title: 'Computer Training',
            description: 'Comprehensive computer literacy program covering essential skills for the modern workplace.',
            category: 'technology',
            duration: 3,
            level: 'beginner',
            curriculum: ['Microsoft Office Suite (Word, Excel, PowerPoint)', 'Internet and Email Usage', 'Basic Computer Troubleshooting', 'Introduction to Programming', 'Digital Literacy and Online Safety'],
            requirements: 'Basic literacy skills',
            careerPaths: ['Office Assistant', 'Data Entry Clerk', 'Computer Operator', 'IT Support'],
            certification: 'BCFSA Computer Literacy Certificate'
          },
          {
            title: 'Fashion Design',
            description: 'Master the art of fashion design from concept to finished garment.',
            category: 'creative-arts',
            duration: 6,
            level: 'beginner',
            curriculum: ['Fashion Design Principles', 'Pattern Making and Drafting', 'Garment Construction Techniques', 'Fabric Selection and Care', 'Fashion Business and Marketing'],
            requirements: 'Creativity and basic sewing knowledge helpful',
            careerPaths: ['Fashion Designer', 'Tailor', 'Fashion Entrepreneur', 'Costume Designer'],
            certification: 'BCFSA Fashion Design Certificate'
          },
          {
            title: 'Catering Services',
            description: 'Professional culinary training for aspiring chefs and catering entrepreneurs.',
            category: 'culinary',
            duration: 4,
            level: 'intermediate',
            curriculum: ['Professional Cooking Techniques', 'Menu Planning and Costing', 'Food Safety and Hygiene', 'Catering Business Management', 'International Cuisine'],
            requirements: 'Basic cooking experience preferred',
            careerPaths: ['Professional Chef', 'Catering Business Owner', 'Restaurant Manager', 'Food Service Supervisor'],
            certification: 'BCFSA Professional Catering Certificate'
          },
          {
            title: 'Shoe Cobbling',
            description: 'Traditional and modern shoe repair and manufacturing techniques.',
            category: 'crafts',
            duration: 3,
            level: 'beginner',
            curriculum: ['Shoe Anatomy and Materials', 'Repair Techniques', 'Sole Replacement', 'Leather Working', 'Business Skills for Cobblers'],
            requirements: 'Manual dexterity and attention to detail',
            careerPaths: ['Shoe Repair Specialist', 'Leather Craftsperson', 'Footwear Entrepreneur'],
            certification: 'BCFSA Shoe Cobbling Certificate'
          },
          {
            title: 'Jewelry Making',
            description: 'Create beautiful jewelry pieces using traditional and contemporary techniques.',
            category: 'crafts',
            duration: 4,
            level: 'beginner',
            curriculum: ['Jewelry Design Principles', 'Metalworking Techniques', 'Beadwork and Wire Wrapping', 'Gemstone Setting', 'Jewelry Business and Marketing'],
            requirements: 'Creativity and fine motor skills',
            careerPaths: ['Jewelry Designer', 'Artisan Craftsperson', 'Jewelry Business Owner'],
            certification: 'BCFSA Jewelry Making Certificate'
          },
          {
            title: 'Local Weaving',
            description: 'Traditional Nigerian weaving techniques for creating textiles and crafts.',
            category: 'crafts',
            duration: 3,
            level: 'beginner',
            curriculum: ['Traditional Weaving Patterns', 'Loom Operation', 'Fiber Preparation', 'Color and Design', 'Marketing Handwoven Products'],
            requirements: 'Interest in traditional crafts',
            careerPaths: ['Textile Artisan', 'Cultural Craft Specialist', 'Handwoven Products Entrepreneur'],
            certification: 'BCFSA Traditional Weaving Certificate'
          },
          {
            title: 'Graphic Design',
            description: 'Modern digital design skills for print and web media.',
            category: 'creative-arts',
            duration: 5,
            level: 'intermediate',
            curriculum: ['Design Principles and Theory', 'Adobe Creative Suite', 'Logo and Brand Design', 'Web Design Basics', 'Print Design and Production'],
            requirements: 'Basic computer skills and creativity',
            careerPaths: ['Graphic Designer', 'Web Designer', 'Brand Designer', 'Freelance Designer'],
            certification: 'BCFSA Graphic Design Certificate'
          },
          {
            title: 'Digital Marketing',
            description: 'Comprehensive digital marketing strategies for modern businesses.',
            category: 'creative-arts',
            duration: 4,
            level: 'intermediate',
            curriculum: ['Social Media Marketing', 'Search Engine Optimization', 'Content Marketing', 'Email Marketing', 'Analytics and Reporting'],
            requirements: 'Basic internet and computer skills',
            careerPaths: ['Digital Marketing Specialist', 'Social Media Manager', 'SEO Specialist', 'Marketing Consultant'],
            certification: 'BCFSA Digital Marketing Certificate'
          },
          {
            title: 'Knitting',
            description: 'Modern knitting techniques for fashion and home décor items.',
            category: 'crafts',
            duration: 3,
            level: 'beginner',
            curriculum: ['Basic Knitting Stitches', 'Pattern Reading', 'Garment Construction', 'Machine Knitting', 'Knitting Business Basics'],
            requirements: 'Patience and attention to detail',
            careerPaths: ['Knitwear Designer', 'Custom Knitting Service', 'Knitting Instructor'],
            certification: 'BCFSA Knitting Certificate'
          },
          {
            title: 'Kuli-kuli Production',
            description: 'Traditional groundnut processing and modern food production techniques.',
            category: 'culinary',
            duration: 2,
            level: 'beginner',
            curriculum: ['Groundnut Processing', 'Food Safety Standards', 'Packaging and Preservation', 'Quality Control', 'Food Business Management'],
            requirements: 'Interest in food production',
            careerPaths: ['Food Processor', 'Snack Food Entrepreneur', 'Food Production Manager'],
            certification: 'BCFSA Food Production Certificate'
          },
          {
            title: 'Web Development',
            description: 'Full-stack web development for modern applications.',
            category: 'technology',
            duration: 6,
            level: 'intermediate',
            curriculum: ['HTML, CSS, JavaScript', 'React.js Framework', 'Node.js Backend', 'Database Management', 'Web Deployment'],
            requirements: 'Basic computer skills and logical thinking',
            careerPaths: ['Web Developer', 'Frontend Developer', 'Full-stack Developer', 'Freelance Developer'],
            certification: 'BCFSA Web Development Certificate'
          },
          {
            title: 'Mobile App Development',
            description: 'Create mobile applications for Android and iOS platforms.',
            category: 'technology',
            duration: 6,
            level: 'advanced',
            curriculum: ['Mobile App Design', 'React Native Development', 'App Store Deployment', 'Mobile UI/UX', 'App Monetization'],
            requirements: 'Programming experience preferred',
            careerPaths: ['Mobile App Developer', 'App Entrepreneur', 'Mobile UI Designer'],
            certification: 'BCFSA Mobile Development Certificate'
          }
        ];

        let insertedCount = 0;
        
        programs.forEach((program, index) => {
          const insertQuery = `
            INSERT INTO Programs (
              title, description, category, durationValue, durationUnit, level, 
              curriculum, requirements, careerPaths, certificationName, 
              isActive, isPublished, createdBy
            ) VALUES (?, ?, ?, ?, 'months', ?, ?, ?, ?, ?, TRUE, TRUE, 1)
          `;

          const values = [
            program.title,
            program.description,
            program.category,
            program.duration,
            program.level,
            JSON.stringify(program.curriculum),
            program.requirements,
            JSON.stringify(program.careerPaths),
            program.certification
          ];

          connection.query(insertQuery, values, (err) => {
            if (err) {
              console.error(`❌ Failed to insert ${program.title}:`, err.message);
            } else {
              insertedCount++;
              console.log(`✅ ${program.title} inserted (${insertedCount}/${programs.length})`);
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
                    console.log('\n🎉 All programs successfully added to database!');
                  });
                });
              }, 1000);
            }
          });
        });
      }
    });
  });
});
