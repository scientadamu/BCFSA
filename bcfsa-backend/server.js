const express = require('express');
const { testConnection, syncDatabase, sequelize } = require('./config/database');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import models to ensure they're loaded
require('./models');

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static files
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/applicants', require('./routes/applicants'));
app.use('/api/assessments', require('./routes/assessments'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/uploads', require('./routes/uploads'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'BCFSA API Server',
    version: '1.0.0',
    description: 'Bago Center For Skills Acquisition & Orphanage Home API',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
      programs: '/api/programs',
      enrollments: '/api/enrollments',
      assessments: '/api/assessments',
      reports: '/api/reports',
      uploads: '/api/uploads'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry',
      field: err.errors[0]?.path
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Database connection
const connectDB = async () => {
  try {
    // Test database connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Failed to connect to MySQL database');
      process.exit(1);
    }

    // Sync database (create tables if they don't exist)
    const isSynced = await syncDatabase();
    
    if (!isSynced) {
      console.error('❌ Failed to sync database');
      process.exit(1);
    }

    console.log('✅ MySQL database connected and synchronized successfully');

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 BCFSA Server running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(async () => {
        console.log('Process terminated');
        await sequelize.close();
        console.log('Database connection closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('\nSIGINT received. Shutting down gracefully...');
      server.close(async () => {
        console.log('Process terminated');
        await sequelize.close();
        console.log('Database connection closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
