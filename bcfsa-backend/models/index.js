const { sequelize } = require('../config/database');

// Import all models
const User = require('./User');
const Program = require('./Program');
const Enrollment = require('./Enrollment');
const Applicant = require('./Applicant');

// Define associations
User.hasMany(Enrollment, { foreignKey: 'studentId', as: 'enrollments' });
Program.hasMany(Enrollment, { foreignKey: 'programId', as: 'enrollments' });
User.hasMany(Applicant, { foreignKey: 'reviewedBy', as: 'reviewedApplicants' });

Enrollment.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
Enrollment.belongsTo(Program, { foreignKey: 'programId', as: 'program' });
Applicant.belongsTo(User, { foreignKey: 'reviewedBy', as: 'reviewer' });

// Export models
module.exports = {
  sequelize,
  User,
  Program,
  Enrollment,
  Applicant
};
