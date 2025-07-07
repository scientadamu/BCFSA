const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name is required' },
      len: { args: [2, 100], msg: 'Name must be between 2 and 100 characters' }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Please enter a valid email address' }
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: { args: [6, 255], msg: 'Password must be at least 6 characters' }
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'trainer', 'trainee', 'corp_member'),
    defaultValue: 'trainee'
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
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
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  passwordResetToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  emailVerificationToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  emailVerificationExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  studentId: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true
  },
  enrollmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  specializations: {
    type: DataTypes.JSON,
    allowNull: true
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stateCode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  batchYear: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  serviceStartDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  serviceEndDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'Users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance methods
User.prototype.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

User.prototype.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this.id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

User.prototype.getPublicProfile = function() {
  const { password, passwordResetToken, emailVerificationToken, ...publicProfile } = this.toJSON();
  return publicProfile;
};

module.exports = User;
