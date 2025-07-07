const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bcfsa'
};

console.log('🚀 Starting BCFSA Backend Server...');

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get programs
app.get('/api/programs', async (req, res) => {
  try {
    console.log('📚 Fetching programs...');

    // Return hardcoded programs for now (can be moved to database later)
    const programs = [
      { id: 1, title: 'Computer Training', description: 'Learn basic computer skills, Microsoft Office, and internet usage', duration: '3 months', status: 'active' },
      { id: 2, title: 'Fashion Design', description: 'Learn fashion design, pattern making, and garment construction', duration: '6 months', status: 'active' },
      { id: 3, title: 'Catering Services', description: 'Learn professional cooking, food safety, and catering business', duration: '4 months', status: 'active' },
      { id: 4, title: 'Shoe Cobbling', description: 'Learn shoe making, repair, and leather work', duration: '3 months', status: 'active' },
      { id: 5, title: 'Jewelry Making', description: 'Learn jewelry design, beading, and metalwork', duration: '2 months', status: 'active' },
      { id: 6, title: 'Local Weaving', description: 'Learn traditional weaving techniques and textile production', duration: '4 months', status: 'active' },
      { id: 7, title: 'Knitting', description: 'Learn knitting techniques and pattern creation', duration: '2 months', status: 'active' },
      { id: 8, title: 'Kuli-kuli Production', description: 'Learn groundnut processing and kuli-kuli production', duration: '1 month', status: 'active' }
    ];

    console.log(`✅ Found ${programs.length} programs`);
    res.json({
      success: true,
      data: programs
    });
  } catch (error) {
    console.error('❌ Error fetching programs:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch programs',
      error: error.message
    });
  }
});

// Get applicants
app.get('/api/applicants', async (req, res) => {
  try {
    console.log('📋 Fetching applicants...');
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM applicants ORDER BY createdAt DESC');
    await connection.end();

    console.log(`✅ Found ${rows.length} applicants`);
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error fetching applicants:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applicants',
      error: error.message
    });
  }
});

// Create new applicant
app.post('/api/applicants', async (req, res) => {
  try {
    console.log('📝 Creating new applicant...');
    console.log('Received data:', req.body);

    const {
      firstName, lastName, email, phone, dateOfBirth, gender, address,
      education, experience, motivation, program, emergencyContactName,
      emergencyContactPhone, hasDisability, disabilityDetails
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !program) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: firstName, lastName, email, phone, program'
      });
    }

    const connection = await mysql.createConnection(dbConfig);

    // Check if email already exists
    const [existing] = await connection.execute('SELECT id FROM applicants WHERE email = ?', [email]);
    if (existing.length > 0) {
      await connection.end();
      return res.status(400).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

    // Insert new applicant
    const insertQuery = `
      INSERT INTO applicants (
        firstName, lastName, email, phone, dateOfBirth, gender, address,
        education, experience, motivation, program, emergencyContactName,
        emergencyContactPhone, hasDisability, disabilityDetails, status, applicationDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', CURDATE())
    `;

    const [result] = await connection.execute(insertQuery, [
      firstName, lastName, email, phone, dateOfBirth, gender, address,
      education, experience, motivation, program, emergencyContactName,
      emergencyContactPhone, hasDisability || false, disabilityDetails
    ]);

    // Get the created applicant
    const [newApplicant] = await connection.execute('SELECT * FROM applicants WHERE id = ?', [result.insertId]);
    await connection.end();

    console.log(`✅ Applicant created with ID: ${result.insertId}`);
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: newApplicant[0]
    });
  } catch (error) {
    console.error('❌ Error creating applicant:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});

// Update applicant
app.put('/api/applicants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    console.log(`📝 Updating applicant ${id}...`);
    const connection = await mysql.createConnection(dbConfig);
    
    const updateFields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
    const updateValues = Object.values(updateData);
    
    await connection.execute(
      `UPDATE applicants SET ${updateFields} WHERE id = ?`,
      [...updateValues, id]
    );
    
    const [updated] = await connection.execute('SELECT * FROM applicants WHERE id = ?', [id]);
    await connection.end();
    
    console.log(`✅ Applicant ${id} updated successfully`);
    res.json({
      success: true,
      message: 'Applicant updated successfully',
      data: updated[0]
    });
  } catch (error) {
    console.error('❌ Error updating applicant:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update applicant',
      error: error.message
    });
  }
});

// Admit applicant
app.post('/api/applicants/:id/admit', async (req, res) => {
  try {
    const { id } = req.params;
    const { admissionNumber } = req.body;
    
    console.log(`🎓 Admitting applicant ${id}...`);
    const connection = await mysql.createConnection(dbConfig);
    
    await connection.execute(
      'UPDATE applicants SET status = ?, admittedAt = ?, admissionNumber = ? WHERE id = ?',
      ['admitted', new Date(), admissionNumber, id]
    );
    
    const [updated] = await connection.execute('SELECT * FROM applicants WHERE id = ?', [id]);
    await connection.end();
    
    console.log(`✅ Applicant ${id} admitted with number ${admissionNumber}`);
    res.json({
      success: true,
      message: 'Applicant admitted successfully',
      data: updated[0]
    });
  } catch (error) {
    console.error('❌ Error admitting applicant:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to admit applicant',
      error: error.message
    });
  }
});

// Auth endpoints for compatibility
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`🔐 Login attempt for: ${email}`);
    
    const connection = await mysql.createConnection(dbConfig);
    const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    await connection.end();
    
    if (users.length > 0) {
      const user = users[0];
      // Simple password check (in real app, use bcrypt)
      if (password === 'admin123' || password === 'Ad@sdg2341') {
        console.log(`✅ Login successful for: ${email}`);
        res.json({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: 'mock-jwt-token'
        });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📋 Test applicants: http://localhost:${PORT}/api/applicants`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Server shutting down...');
  process.exit(0);
});
