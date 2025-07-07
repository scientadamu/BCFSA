const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  programId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Programs',
      key: 'id'
    }
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'completed', 'dropped', 'suspended'),
    defaultValue: 'pending'
  },
  overallProgress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: { args: 0, msg: 'Progress cannot be negative' },
      max: { args: 100, msg: 'Progress cannot exceed 100%' }
    }
  },
  currentModule: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lastActivity: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completedModules: {
    type: DataTypes.JSON,
    allowNull: true
  },
  attendance: {
    type: DataTypes.JSON,
    allowNull: true
  },
  assessments: {
    type: DataTypes.JSON,
    allowNull: true
  },
  grades: {
    type: DataTypes.JSON,
    allowNull: true
  },
  certificateIssued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  certificateIssuedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  certificateNumber: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  certificateDownloadUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  notes: {
    type: DataTypes.JSON,
    allowNull: true
  },
  completionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dropoutReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dropoutDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'Enrollments',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['studentId', 'programId']
    }
  ]
});

// Instance methods
Enrollment.prototype.getProgressStatus = function() {
  if (this.overallProgress === 100) return 'completed';
  if (this.overallProgress >= 75) return 'excellent';
  if (this.overallProgress >= 50) return 'good';
  if (this.overallProgress >= 25) return 'fair';
  return 'poor';
};

Enrollment.prototype.updateProgress = function(newProgress) {
  this.overallProgress = Math.max(0, Math.min(100, newProgress));
  this.lastActivity = new Date();
  
  if (this.overallProgress === 100 && this.status === 'active') {
    this.status = 'completed';
    this.completionDate = new Date();
  }
  
  return this.save();
};

module.exports = Enrollment;
