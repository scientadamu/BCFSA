const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5002;

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

// Test database connection
async function testConnection() {
  try {
    console.log('🔧 Testing database connection...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully!');
    await connection.end();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BCFSA API Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test applicants endpoint
app.get('/api/applicants', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM applicants ORDER BY createdAt DESC');
    await connection.end();
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applicants',
      error: error.message
    });
  }
});

// Start server
async function startServer() {
  try {
    console.log('🚀 Starting BCFSA Test Server...');
    
    // Test database connection first
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Cannot start server: Database connection failed');
      process.exit(1);
    }
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
      console.log(`👥 Applicants: http://localhost:${PORT}/api/applicants`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
