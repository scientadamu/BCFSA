# BCFSA Database Setup Guide

## 🗄️ MySQL Database Setup for BCFSA

This guide will help you set up the MySQL database for the Bago Center For Skills Acquisition & Orphanage Home application.

## Prerequisites

- XAMPP installed (already available at C:\xampp)
- Node.js and npm installed
- BCFSA backend project

## Step 1: Start XAMPP MySQL Service

### Option A: Using XAMPP Control Panel (Recommended)
1. Open XAMPP Control Panel: `C:\xampp\xampp-control.exe`
2. Click "Start" next to MySQL
3. Wait for the status to show "Running"

### Option B: Using Command Line
```bash
# Start MySQL service
C:\xampp\mysql\bin\mysqld.exe --defaults-file=C:\xampp\mysql\bin\my.ini --standalone

# Or use the batch file
C:\xampp\mysql_start.bat
```

## Step 2: Access MySQL

### Using phpMyAdmin (Web Interface)
1. Open your browser
2. Go to: `http://localhost/phpmyadmin`
3. Login with:
   - Username: `root`
   - Password: (leave empty)

### Using MySQL Command Line
```bash
C:\xampp\mysql\bin\mysql.exe -u root -p
# Press Enter when prompted for password (no password by default)
```

## Step 3: Create Database and Tables

### Method 1: Using phpMyAdmin
1. Open phpMyAdmin (`http://localhost/phpmyadmin`)
2. Click "Import" tab
3. Choose file: `bcfsa-backend/database/schema.sql`
4. Click "Go" to execute
5. Import sample data: `bcfsa-backend/database/sample_data.sql`

### Method 2: Using MySQL Command Line
```bash
# Connect to MySQL
C:\xampp\mysql\bin\mysql.exe -u root

# Run the schema file
source C:/Users/USER/Desktop/BCFSC/bcfsa-backend/database/schema.sql

# Run the sample data file
source C:/Users/USER/Desktop/BCFSC/bcfsa-backend/database/sample_data.sql
```

### Method 3: Using Node.js Setup Script
```bash
cd bcfsa-backend
npm run setup:mysql
```

## Step 4: Verify Database Setup

### Check Tables Created
```sql
USE bcfsa;
SHOW TABLES;
```

You should see these tables:
- Users
- Programs
- Enrollments
- OrphanageChildren
- Projects
- Assessments
- AssessmentSubmissions
- Attendance
- Notifications
- SystemSettings

### Check Sample Data
```sql
-- Check users
SELECT id, name, email, role FROM Users;

-- Check programs
SELECT id, title, category, level FROM Programs;

-- Check enrollments
SELECT e.id, u.name as student_name, p.title as program_title, e.status 
FROM Enrollments e 
JOIN Users u ON e.studentId = u.id 
JOIN Programs p ON e.programId = p.id;
```

## Step 5: Configure Backend Environment

Ensure your `.env` file has the correct database settings:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bcfsa
DB_USER=root
DB_PASSWORD=
DB_DIALECT=mysql
```

## Step 6: Start Backend Server

```bash
cd bcfsa-backend
npm run dev
```

The server should start and connect to the database successfully.

## Database Schema Overview

### Core Tables

#### Users Table
- **Purpose**: Store all user types (admin, trainer, trainee, corp_member)
- **Key Fields**: name, email, password, role, studentId
- **Features**: Emergency contacts, specializations, service records

#### Programs Table
- **Purpose**: Training programs and courses
- **Key Fields**: title, description, category, duration, curriculum
- **Features**: Enrollment tracking, certification, scheduling

#### Enrollments Table
- **Purpose**: Student-program relationships
- **Key Fields**: studentId, programId, status, progress
- **Features**: Progress tracking, attendance, assessments

#### OrphanageChildren Table
- **Purpose**: Children in orphanage care
- **Key Fields**: name, dateOfBirth, admissionDate, status
- **Features**: Guardian info, medical records, education tracking

#### Projects Table
- **Purpose**: Organizational projects (like orphanage home)
- **Key Fields**: title, category, status, budget, fundsRaised
- **Features**: Timeline tracking, milestone management

### Supporting Tables

- **Assessments**: Quizzes, assignments, exams
- **AssessmentSubmissions**: Student assessment attempts
- **Attendance**: Daily attendance records
- **Notifications**: System notifications
- **SystemSettings**: Application configuration

## Default Login Credentials

After setup, you can login with:

### Admin Account
- **Email**: admin@bcfsa.org
- **Password**: admin123

### Sample Trainer Accounts
- **Email**: john.smith@bcfsa.org
- **Password**: trainer123

### Sample Student Accounts
- **Email**: alice.cooper@email.com
- **Password**: student123

## Troubleshooting

### MySQL Won't Start
1. Check if port 3306 is already in use
2. Try running XAMPP as Administrator
3. Check XAMPP error logs in `C:\xampp\mysql\data\`

### Connection Refused
1. Ensure MySQL service is running
2. Check firewall settings
3. Verify port 3306 is open

### Permission Denied
1. Run XAMPP Control Panel as Administrator
2. Check folder permissions for `C:\xampp\mysql\data\`

### Database Already Exists
```sql
DROP DATABASE IF EXISTS bcfsa;
```
Then re-run the schema.sql file.

## Backup and Restore

### Create Backup
```bash
C:\xampp\mysql\bin\mysqldump.exe -u root bcfsa > bcfsa_backup.sql
```

### Restore from Backup
```bash
C:\xampp\mysql\bin\mysql.exe -u root bcfsa < bcfsa_backup.sql
```

## Production Considerations

For production deployment:

1. **Change default passwords**
2. **Create dedicated MySQL user**
3. **Enable SSL connections**
4. **Set up regular backups**
5. **Configure proper user permissions**

```sql
-- Create dedicated user for production
CREATE USER 'bcfsa_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON bcfsa.* TO 'bcfsa_user'@'localhost';
FLUSH PRIVILEGES;
```

## Support

If you encounter issues:

1. Check XAMPP error logs
2. Verify .env configuration
3. Ensure all dependencies are installed
4. Check Node.js console for error messages

The database is now ready for the BCFSA application! 🎉
