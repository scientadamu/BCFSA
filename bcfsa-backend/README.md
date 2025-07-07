# BCFSA Backend API

Backend API for the Bago Center For Skills Acquisition (BCFSA) learning management system.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Admin, Trainer, Trainee, and Corp Member roles
- **Program Management**: CRUD operations for training programs
- **Enrollment System**: Student enrollment and progress tracking
- **Assessment System**: Create and manage assessments and quizzes
- **File Upload**: Avatar and document upload functionality
- **Reporting**: Dashboard statistics and analytics
- **Security**: Rate limiting, input validation, and secure headers

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bcfsa-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   - MySQL database credentials
   - JWT secrets
   - Email configuration (optional)
   - File upload settings

4. **Setup MySQL Database**
   ```bash
   npm run setup:mysql
   ```
   This will create the database if it doesn't exist.

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (Admin only)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)
- `GET /api/users/admin/stats` - Get user statistics (Admin only)

### Programs
- `GET /api/programs` - Get all programs
- `GET /api/programs/:id` - Get program by ID
- `POST /api/programs` - Create program (Admin only)
- `PUT /api/programs/:id` - Update program (Admin only)
- `DELETE /api/programs/:id` - Delete program (Admin only)

### Enrollments
- `GET /api/enrollments` - Get enrollments
- `POST /api/enrollments` - Create enrollment

### Assessments
- `GET /api/assessments` - Get assessments
- `POST /api/assessments` - Create assessment

### Reports
- `GET /api/reports/dashboard` - Get dashboard statistics

### Uploads
- `POST /api/uploads/avatar` - Upload user avatar

## Default Users

After seeding the database, you can use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@bcfsa.org | admin123 |
| Trainer | trainer@bcfsa.org | trainer123 |
| Student | student@bcfsa.org | student123 |
| Corp Member | corp@bcfsa.org | corp123 |

## User Roles & Permissions

### Admin
- Full system access
- User management
- Program management
- System configuration
- View all reports and analytics

### Trainer
- View assigned programs
- Manage students in their programs
- Create and grade assessments
- View student progress

### Trainee (Student)
- View enrolled programs
- Submit assessments
- Track personal progress
- Report issues with trainers

### Corp Member (NYSC)
- Basic portal access
- Generate monthly clearance certificates
- View service records

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse and brute force attacks
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet Security**: Security headers for protection
- **Password Hashing**: Bcrypt for secure password storage

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run setup:mysql` - Setup MySQL database
- `npm run seed` - Seed database with initial data
- `npm test` - Run tests (when implemented)

### Project Structure
```
bcfsa-backend/
├── models/           # Database models
├── routes/           # API routes
├── middleware/       # Custom middleware
├── scripts/          # Utility scripts
├── uploads/          # File upload directory
├── server.js         # Main server file
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| DB_HOST | MySQL host | localhost |
| DB_PORT | MySQL port | 3306 |
| DB_NAME | Database name | bcfsa |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | - |
| DB_DIALECT | Database dialect | mysql |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |
| MAX_FILE_SIZE | Maximum file upload size | 5242880 (5MB) |

## MySQL Setup Troubleshooting

### Common Issues

1. **Connection refused**: Make sure MySQL is running
   ```bash
   # On Windows (if using XAMPP)
   Start XAMPP and enable MySQL

   # On Linux/Mac
   sudo systemctl start mysql
   # or
   brew services start mysql
   ```

2. **Access denied**: Check your MySQL credentials
   ```bash
   mysql -u root -p
   ```

3. **Database doesn't exist**: Run the setup script
   ```bash
   npm run setup:mysql
   ```

4. **Port already in use**: Change the port in `.env`
   ```
   DB_PORT=3307
   ```

### Prerequisites

- MySQL 8.0 or higher
- Node.js 14 or higher
- npm or yarn

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
