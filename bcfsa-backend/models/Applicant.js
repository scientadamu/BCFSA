const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Applicant = sequelize.define('Applicant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  education: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  experience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  motivation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  program: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'admitted', 'rejected'),
    defaultValue: 'pending'
  },
  applicationDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  reviewedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  admittedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  admissionNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  emergencyContactName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  emergencyContactPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  emergencyContactRelationship: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  hasDisability: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  disabilityDetails: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'applicants',
  timestamps: true,
  indexes: [
    {
      fields: ['email']
    },
    {
      fields: ['status']
    },
    {
      fields: ['program']
    },
    {
      fields: ['applicationDate']
    }
  ]
});

// Define associations
Applicant.associate = (models) => {
  // Applicant belongs to User (reviewer)
  Applicant.belongsTo(models.User, {
    foreignKey: 'reviewedBy',
    as: 'reviewer'
  });
};

module.exports = Applicant;
