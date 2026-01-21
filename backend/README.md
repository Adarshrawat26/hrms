# HRMS Backend API

Production-level Human Resource Management System Backend built with NestJS, PostgreSQL, and Prisma.

## Architecture

```
src/
├── auth/              # Authentication & JWT
├── employees/         # Employee Management
├── attendance/        # Attendance & Check-in/out
├── common/            # Guards, Decorators, Filters
├── config/            # Configuration
├── prisma/            # Database Service
└── main.ts           # Entry Point
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup PostgreSQL Database

```bash
# Using Docker (Optional)
docker run --name hrms-postgres -e POSTGRES_USER=hrms_user -e POSTGRES_PASSWORD=hrms_password -e POSTGRES_DB=hrms_db -p 5432:5432 -d postgres:15

# Or create database manually in your PostgreSQL instance
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
# Update DATABASE_URL and JWT_SECRET in .env
```

### 4. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /auth/login` - Login with email and password

### Employees (Role-based)

- `GET /employees` - Get all employees (ADMIN, MANAGER)
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee (ADMIN)
- `PUT /employees/:id` - Update employee (ADMIN, MANAGER)
- `DELETE /employees/:id` - Delete employee (ADMIN)

### Attendance (Role-based)

- `POST /attendance/check-in` - Employee check-in
- `POST /attendance/check-out` - Employee check-out
- `GET /attendance/today` - Get today's attendance
- `GET /attendance/report?startDate=&endDate=&employeeId=` - Attendance report (ADMIN, MANAGER)
- `GET /attendance/daily-report/:date` - Daily report (ADMIN, MANAGER)

## Authentication

All endpoints except `/auth/login` require JWT token in header:

```
Authorization: Bearer <token>
```

## Roles & Permissions

- **ADMIN**: Full access to all features
- **MANAGER**: View team attendance, manage employees
- **EMPLOYEE**: View own profile and attendance

## Database Schema

### Employee

```sql
- id (UUID)
- name
- email (unique)
- phone
- designation
- department
- password (hashed)
- role (ADMIN/MANAGER/EMPLOYEE)
- status (ACTIVE/INACTIVE)
- dateOfJoining
```

### Attendance

```sql
- id (UUID)
- employeeId (FK)
- checkInTime
- checkOutTime
- workHours
- date
```

## Technologies Used

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Password Hashing**: bcryptjs

## Production Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Update DATABASE_URL with production database
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Setup logging (Winston/CloudWatch)
- [ ] Configure API rate limiting
- [ ] Setup database backups
- [ ] Configure error monitoring (Sentry)
- [ ] Setup CI/CD pipeline
- [ ] Configure Docker & deployment

## Development Commands

```bash
npm run dev              # Start dev server
npm run build           # Build production
npm run start           # Start production server
npx prisma studio      # Open Prisma Studio
npx prisma generate    # Generate Prisma Client
npx prisma migrate dev # Run migrations
```
