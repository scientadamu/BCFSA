const mysql = require('mysql2/promise');

async function insertCompleteData() {
  console.log('📊 Inserting Complete BCFSA Data...\n');

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'bcfsa'
    });

    console.log('✅ Connected to database\n');

    // Hash for default password (admin123)
    const defaultPassword = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu';

    // Insert Users
    console.log('👥 Inserting Users...');
    await connection.execute(`
      INSERT INTO Users (name, email, password, role, phone, gender, isActive, isEmailVerified) VALUES
      ('System Administrator', 'admin@bcfsa.org', ?, 'admin', '+234-800-BCFSA-01', 'male', TRUE, TRUE),
      ('John Smith', 'john.smith@bcfsa.org', ?, 'trainer', '+234-801-234-5678', 'male', TRUE, TRUE),
      ('Sarah Johnson', 'sarah.johnson@bcfsa.org', ?, 'trainer', '+234-802-345-6789', 'female', TRUE, TRUE),
      ('Mary Wilson', 'mary.wilson@bcfsa.org', ?, 'trainer', '+234-803-456-7890', 'female', TRUE, TRUE),
      ('David Brown', 'david.brown@bcfsa.org', ?, 'trainer', '+234-804-567-8901', 'male', TRUE, TRUE),
      ('Grace Adamu', 'grace.adamu@bcfsa.org', ?, 'trainer', '+234-805-678-9012', 'female', TRUE, TRUE),
      ('Ibrahim Musa', 'ibrahim.musa@bcfsa.org', ?, 'trainer', '+234-806-789-0123', 'male', TRUE, TRUE),
      ('Alice Cooper', 'alice.cooper@email.com', ?, 'trainee', '+234-807-890-1234', 'female', TRUE, TRUE),
      ('Bob Johnson', 'bob.johnson@email.com', ?, 'trainee', '+234-808-901-2345', 'male', TRUE, TRUE),
      ('Carol Davis', 'carol.davis@email.com', ?, 'trainee', '+234-809-012-3456', 'female', TRUE, TRUE),
      ('Daniel Wilson', 'daniel.wilson@email.com', ?, 'trainee', '+234-810-123-4567', 'male', TRUE, TRUE),
      ('Eva Martinez', 'eva.martinez@email.com', ?, 'trainee', '+234-811-234-5678', 'female', TRUE, TRUE),
      ('Mike Anderson', 'mike.anderson@email.com', ?, 'corp_member', '+234-812-345-6789', 'male', TRUE, TRUE)
    `, Array(13).fill(defaultPassword));
    console.log('✅ Users inserted');

    // Insert Staff
    console.log('👨‍🏫 Inserting Staff...');
    await connection.execute(`
      INSERT INTO Staff (userId, staffId, department, position, specializations, experience, hireDate, status) VALUES
      (1, 'BCFSA-ADMIN-001', 'Administration', 'System Administrator', ?, 10, '2020-01-01', 'active'),
      (2, 'BCFSA-TRAIN-001', 'Technology', 'Senior Trainer', ?, 5, '2021-03-15', 'active'),
      (3, 'BCFSA-TRAIN-002', 'Creative Arts', 'Senior Trainer', ?, 3, '2021-06-01', 'active'),
      (4, 'BCFSA-TRAIN-003', 'Creative Arts', 'Fashion Design Instructor', ?, 7, '2020-09-01', 'active'),
      (5, 'BCFSA-TRAIN-004', 'Culinary', 'Culinary Arts Instructor', ?, 4, '2021-01-15', 'active'),
      (6, 'BCFSA-TRAIN-005', 'Crafts', 'Crafts Instructor', ?, 6, '2020-11-01', 'active'),
      (7, 'BCFSA-TRAIN-006', 'Technology', 'IT Instructor', ?, 8, '2020-05-01', 'active')
    `, [
      JSON.stringify(['System Administration', 'Database Management']),
      JSON.stringify(['Web Development', 'JavaScript', 'React', 'Node.js']),
      JSON.stringify(['Digital Marketing', 'SEO', 'Social Media', 'Content Creation']),
      JSON.stringify(['Fashion Design', 'Pattern Making', 'Garment Construction']),
      JSON.stringify(['Culinary Arts', 'Food Safety', 'Catering Management']),
      JSON.stringify(['Knitting', 'Jewelry Making', 'Local Weaving']),
      JSON.stringify(['Computer Training', 'Hardware Troubleshooting', 'Software Installation'])
    ]);
    console.log('✅ Staff inserted');

    // Insert Students
    console.log('🎓 Inserting Students...');
    await connection.execute(`
      INSERT INTO Students (userId, studentId, enrollmentDate, status, guardianName, guardianPhone) VALUES
      (8, 'BCFSA-STU-2024-001', '2024-01-15', 'active', 'Mrs. Cooper', '+234-901-234-5678'),
      (9, 'BCFSA-STU-2024-002', '2024-01-20', 'active', 'Mr. Johnson Sr.', '+234-902-345-6789'),
      (10, 'BCFSA-STU-2024-003', '2024-02-01', 'active', 'Mrs. Davis', '+234-903-456-7890'),
      (11, 'BCFSA-STU-2024-004', '2024-02-15', 'active', 'Mr. Wilson', '+234-904-567-8901'),
      (12, 'BCFSA-STU-2024-005', '2024-03-01', 'active', 'Mrs. Martinez', '+234-905-678-9012')
    `);
    console.log('✅ Students inserted');

    // Insert All Programs from UI
    console.log('📚 Inserting All Programs...');
    const programsData = [
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
        category: 'creative',
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
        category: 'creative',
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
        category: 'business',
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

    for (const program of programsData) {
      await connection.execute(`
        INSERT INTO Programs (title, description, category, durationValue, level, curriculum, requirements, careerPaths, certificationName, isActive, isPublished, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE, TRUE, 1)
      `, [
        program.title,
        program.description,
        program.category,
        program.duration,
        program.level,
        JSON.stringify(program.curriculum),
        program.requirements,
        JSON.stringify(program.careerPaths),
        program.certification
      ]);
    }
    console.log('✅ All 12 programs inserted');

    await connection.end();
    console.log('\n🎉 Complete data insertion successful!');

  } catch (error) {
    console.error('❌ Data insertion failed:', error.message);
    process.exit(1);
  }
}

insertCompleteData();
