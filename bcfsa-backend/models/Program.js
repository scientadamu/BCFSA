const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Program = sequelize.define('Program', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Program title is required' },
      len: { args: [3, 100], msg: 'Title must be between 3 and 100 characters' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Program description is required' }
    }
  },
  category: {
    type: DataTypes.ENUM('technology', 'creative-arts', 'culinary', 'crafts'),
    allowNull: false
  },
  durationValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: 1, msg: 'Duration must be at least 1' }
    }
  },
  durationUnit: {
    type: DataTypes.ENUM('days', 'weeks', 'months', 'years'),
    defaultValue: 'months'
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'all-levels'),
    defaultValue: 'beginner'
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  curriculum: {
    type: DataTypes.JSON,
    allowNull: true
  },
  requirements: {
    type: DataTypes.JSON,
    allowNull: true
  },
  careerPaths: {
    type: DataTypes.JSON,
    allowNull: true
  },
  certificationName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  certificationDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  certificationAuthority: {
    type: DataTypes.STRING(255),
    defaultValue: 'Bago Center For Skills Acquisition'
  },
  trainers: {
    type: DataTypes.JSON,
    allowNull: true
  },
  maxStudents: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  },
  currentEnrollment: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  feeAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  feeCurrency: {
    type: DataTypes.STRING(3),
    defaultValue: 'NGN'
  },
  isFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  scheduleStartDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  scheduleEndDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  classTime: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  classDays: {
    type: DataTypes.JSON,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  tableName: 'Programs',
  timestamps: true
});

// Instance methods
Program.prototype.getDurationString = function() {
  return `${this.durationValue} ${this.durationUnit}`;
};

Program.prototype.getEnrollmentStatus = function() {
  const percentage = (this.currentEnrollment / this.maxStudents) * 100;
  if (percentage >= 100) return 'full';
  if (percentage >= 80) return 'almost-full';
  if (percentage >= 50) return 'half-full';
  return 'available';
};

module.exports = Program;
