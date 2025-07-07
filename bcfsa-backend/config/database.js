const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'bcfsa',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  },
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true,
    typeCast: true
  },
  timezone: '+01:00' // West Africa Time
};

// Create Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL database connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error.message);
    
    // Provide helpful error messages
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure MySQL server is running (start XAMPP MySQL service)');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Check your database credentials in .env file');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Database does not exist. Run: npm run setup:mysql');
    }
    
    return false;
  }
};

// Sync database (create tables)
const syncDatabase = async (force = false) => {
  try {
    if (force) {
      console.log('⚠️  Force syncing database (this will drop existing tables)');
    }
    
    await sequelize.sync({ force });
    
    if (force) {
      console.log('✅ Database force synced successfully (tables recreated)');
    } else {
      console.log('✅ Database synced successfully (tables created/updated)');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
    return false;
  }
};

// Close database connection
const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error.message);
  }
};

// Database health check
const healthCheck = async () => {
  try {
    await sequelize.authenticate();
    const [results] = await sequelize.query('SELECT 1 as health');
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: config.database,
      host: config.host,
      port: config.port
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// Get database info
const getDatabaseInfo = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        COUNT(*) as table_count
      FROM information_schema.tables 
      WHERE table_schema = '${config.database}'
    `);
    
    const [userCount] = await sequelize.query(`
      SELECT COUNT(*) as count FROM Users WHERE 1=1
    `).catch(() => [{ count: 0 }]);
    
    const [programCount] = await sequelize.query(`
      SELECT COUNT(*) as count FROM Programs WHERE 1=1
    `).catch(() => [{ count: 0 }]);
    
    return {
      database: config.database,
      tables: results[0]?.table_count || 0,
      users: userCount[0]?.count || 0,
      programs: programCount[0]?.count || 0,
      connected: true
    };
  } catch (error) {
    return {
      database: config.database,
      connected: false,
      error: error.message
    };
  }
};

// Export functions and sequelize instance
module.exports = {
  sequelize,
  testConnection,
  syncDatabase,
  closeConnection,
  healthCheck,
  getDatabaseInfo,
  config
};
