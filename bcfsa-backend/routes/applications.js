const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bcfsa'
});

// @route   POST /api/applications
// @desc    Submit new application
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      applicationType,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      programId,
      education,
      experience,
      position,
      qualifications,
      experience_years,
      specializations,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelationship,
      hasDisability,
      disabilityDetails
    } = req.body;

    console.log('Received application:', req.body);

    // Check if email already exists in applications
    const checkEmailQuery = 'SELECT id FROM Applications WHERE email = ?';
    
    connection.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error occurred'
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'An application with this email already exists'
        });
      }

      // Insert new application
      const insertQuery = `
        INSERT INTO Applications (
          applicationType, firstName, lastName, email, phone, dateOfBirth, gender, address,
          programId, education, experience, position, qualifications, experience_years, 
          specializations, emergencyContactName, emergencyContactPhone, emergencyContactRelationship,
          hasDisability, disabilityDetails, status, applicationDate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
      `;

      const values = [
        applicationType,
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        gender,
        address,
        programId || null,
        education || null,
        experience || null,
        position || null,
        qualifications ? JSON.stringify(qualifications) : null,
        experience_years || null,
        specializations ? JSON.stringify(specializations) : null,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelationship,
        hasDisability || false,
        disabilityDetails || null
      ];

      connection.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to submit application'
          });
        }

        // Create notification for admin
        const notificationQuery = `
          INSERT INTO Notifications (userId, title, message, type, relatedId, relatedType)
          SELECT id, ?, ?, 'info', ?, 'application'
          FROM Users WHERE role = 'admin'
        `;

        const notificationValues = [
          'New Application Received',
          `A new ${applicationType} application has been submitted by ${firstName} ${lastName}`,
          result.insertId
        ];

        connection.query(notificationQuery, notificationValues, (notifErr) => {
          if (notifErr) {
            console.error('Notification error:', notifErr);
          }
        });

        res.status(201).json({
          success: true,
          message: 'Application submitted successfully',
          data: {
            id: result.insertId,
            applicationType,
            status: 'pending'
          }
        });
      });
    });

  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during application submission'
    });
  }
});

// @route   GET /api/applications
// @desc    Get all applications (Admin only)
// @access  Private
router.get('/', (req, res) => {
  try {
    const { type, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const queryParams = [];

    if (type) {
      whereClause += ' AND applicationType = ?';
      queryParams.push(type);
    }

    if (status) {
      whereClause += ' AND status = ?';
      queryParams.push(status);
    }

    const query = `
      SELECT 
        a.*,
        p.title as programTitle
      FROM Applications a
      LEFT JOIN Programs p ON a.programId = p.id
      ${whereClause}
      ORDER BY a.applicationDate DESC
      LIMIT ? OFFSET ?
    `;

    queryParams.push(parseInt(limit), parseInt(offset));

    connection.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Get applications error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch applications'
        });
      }

      // Get total count
      const countQuery = `SELECT COUNT(*) as total FROM Applications ${whereClause}`;
      const countParams = queryParams.slice(0, -2); // Remove limit and offset

      connection.query(countQuery, countParams, (countErr, countResults) => {
        if (countErr) {
          console.error('Count error:', countErr);
          return res.status(500).json({
            success: false,
            message: 'Failed to get application count'
          });
        }

        res.json({
          success: true,
          data: results,
          pagination: {
            total: countResults[0].total,
            page: parseInt(page),
            pages: Math.ceil(countResults[0].total / limit),
            limit: parseInt(limit)
          }
        });
      });
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status (Admin only)
// @access  Private
router.put('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewNotes } = req.body;
    const reviewedBy = 1; // Should come from authenticated user

    const updateQuery = `
      UPDATE Applications 
      SET status = ?, reviewedBy = ?, reviewDate = NOW(), reviewNotes = ?
      WHERE id = ?
    `;

    connection.query(updateQuery, [status, reviewedBy, reviewNotes, id], (err, result) => {
      if (err) {
        console.error('Update status error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to update application status'
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }

      // If approved, create user account
      if (status === 'approved') {
        // Get application details
        const getAppQuery = 'SELECT * FROM Applications WHERE id = ?';
        
        connection.query(getAppQuery, [id], (getErr, appResults) => {
          if (getErr || appResults.length === 0) {
            console.error('Get application error:', getErr);
            return res.json({
              success: true,
              message: 'Application status updated but failed to create user account'
            });
          }

          const app = appResults[0];
          
          // Create user account
          const createUserQuery = `
            INSERT INTO Users (name, email, password, role, phone, gender, dateOfBirth, address, 
                             emergencyContactName, emergencyContactPhone, emergencyContactRelationship, isActive, isEmailVerified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE, FALSE)
          `;

          const defaultPassword = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu'; // Default: user123
          const userRole = app.applicationType === 'trainee' ? 'trainee' : app.applicationType === 'trainer' ? 'trainer' : 'admin';

          const userValues = [
            `${app.firstName} ${app.lastName}`,
            app.email,
            defaultPassword,
            userRole,
            app.phone,
            app.gender,
            app.dateOfBirth,
            app.address,
            app.emergencyContactName,
            app.emergencyContactPhone,
            app.emergencyContactRelationship
          ];

          connection.query(createUserQuery, userValues, (userErr, userResult) => {
            if (userErr) {
              console.error('Create user error:', userErr);
              return res.json({
                success: true,
                message: 'Application approved but failed to create user account'
              });
            }

            // Update application with userId
            const updateAppQuery = 'UPDATE Applications SET userId = ? WHERE id = ?';
            connection.query(updateAppQuery, [userResult.insertId, id], () => {
              // Create enrollment if trainee
              if (app.applicationType === 'trainee' && app.programId) {
                // Create student record first
                const createStudentQuery = `
                  INSERT INTO Students (userId, studentId, enrollmentDate, status)
                  VALUES (?, ?, CURDATE(), 'active')
                `;
                
                const studentId = `BCFSA-STU-${new Date().getFullYear()}-${String(userResult.insertId).padStart(3, '0')}`;
                
                connection.query(createStudentQuery, [userResult.insertId, studentId], (studentErr, studentResult) => {
                  if (!studentErr) {
                    // Create enrollment
                    const createEnrollmentQuery = `
                      INSERT INTO Enrollments (studentId, programId, status)
                      VALUES (?, ?, 'pending')
                    `;
                    
                    connection.query(createEnrollmentQuery, [studentResult.insertId, app.programId], () => {
                      console.log('Enrollment created for approved trainee');
                    });
                  }
                });
              }

              res.json({
                success: true,
                message: 'Application approved and user account created successfully'
              });
            });
          });
        });
      } else {
        res.json({
          success: true,
          message: 'Application status updated successfully'
        });
      }
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
