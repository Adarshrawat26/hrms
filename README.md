# HRMS - Human Resource Management System

A production-level, full-stack Human Resource Management System built with modern technologies.

## System Architecture

```
┌─────────────┐         ┌─────────────┐
│   Frontend  │ ◄────► │   Backend   │
│  (Next.js)  │         │  (NestJS)   │
└─────────────┘         └──────┬──────┘
                                │
                        ┌──────▼──────┐
                        │  PostgreSQL │
                        │  (Database) │
                        └─────────────┘
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 13+ (or Docker)
- Git

### Option 1: Using Docker (Recommended)

```bash
# Clone the repository
git clone <repo-url>
cd hrms

# Start all services with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:3001
# Backend: http://localhost:3000
# Database: localhost:5432
```

### Option 2: Manual Setup

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Setup Prisma
npm run prisma:migrate

# Start development server
npm run dev
```

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Update NEXT_PUBLIC_API_URL if needed

# Start development server
npm run dev
```

#### 3. Access the Application

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api

## Default Login Credentials

```
Email: admin@hrms.com
Password: password123
Role: ADMIN
```

## Project Structure

```
hrms/
├── backend/                 # NestJS Backend API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── employees/      # Employee management
│   │   ├── attendance/     # Attendance tracking
│   │   ├── common/         # Guards, decorators, filters
│   │   ├── config/         # Configuration
│   │   └── prisma/         # Database service
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                # Next.js Frontend
│   ├── app/
│   │   ├── login/          # Login page
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── employees/      # Employee management
│   │   └── layout.tsx      # Root layout
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── stores/         # Zustand state
│   │   ├── lib/            # Utilities
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Helper functions
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml       # Docker Compose configuration
└── README.md               # This file
```

## Tech Stack

### Backend

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Security**: bcryptjs for password hashing

### Frontend

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: Recharts
- **UI Components**: Custom Tailwind CSS

## Features

### Authentication & Authorization

- Email/password login
- JWT token-based authentication
- Role-based access control (RBAC)
- Auto-logout on token expiration

### Employee Management

- Create/Read/Update/Delete employees
- Employee profile management
- Department and designation tracking
- Employment status management

### Attendance Management

- Daily check-in/check-out
- Work hours calculation
- Attendance reports and analytics
- Daily and monthly summaries

### Dashboards

- **Admin Dashboard**: System-wide statistics and controls
- **Manager Dashboard**: Team overview and reports
- **Employee Dashboard**: Personal attendance and profile

## User Roles

### Admin

- Full system access
- Create/manage employees
- View all attendance records
- Generate comprehensive reports
- System configuration

### Manager

- View team members
- Track team attendance
- Generate team reports
- Approve leave requests

### Employee

- Personal dashboard
- Check-in/Check-out
- View own attendance
- Update profile

## API Endpoints

### Authentication

- `POST /auth/login` - Login

### Employees

- `GET /employees` - List all employees
- `GET /employees/:id` - Get employee details
- `POST /employees` - Create employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Attendance

- `POST /attendance/check-in` - Check in
- `POST /attendance/check-out` - Check out
- `GET /attendance/today` - Today's attendance
- `GET /attendance/report` - Attendance report
- `GET /attendance/daily-report/:date` - Daily report

## Database Schema

### Employee Table

```sql
- id (UUID)
- name (String)
- email (String, unique)
- phone (String)
- designation (String)
- department (String)
- password (String, hashed)
- role (ADMIN/MANAGER/EMPLOYEE)
- status (ACTIVE/INACTIVE)
- dateOfJoining (DateTime)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Attendance Table

```sql
- id (UUID)
- employeeId (FK)
- checkInTime (DateTime)
- checkOutTime (DateTime)
- workHours (Float)
- date (DateTime)
- createdAt (DateTime)
- updatedAt (DateTime)
```

## Development Commands

### Backend

```bash
cd backend
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run test            # Run tests
npx prisma studio      # Open Prisma Studio
npx prisma migrate dev # Run migrations
```

### Frontend

```bash
cd frontend
npm run dev             # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run linter
```

## Deployment

### Docker Deployment

```bash
# Build images
docker-compose build

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Manual Deployment

#### Backend (AWS EC2/DigitalOcean)

```bash
cd backend
npm run build
npm start
```

#### Frontend (Vercel)

```bash
# Connect GitHub repository to Vercel
# Automatic builds and deployments on push
```

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=HRMS
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Security Best Practices

- ✅ JWT authentication with secure secret
- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ Role-based access control on backend
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variables for sensitive data
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection (React/Next.js)

## Performance Optimization

- Server-side rendering with Next.js
- Database indexing on frequently queried fields
- Pagination for list endpoints
- Caching strategies
- Optimized images and assets
- Code splitting by route

## Logging & Monitoring

- Application logging (Winston/CloudWatch)
- Error tracking (Sentry)
- Performance monitoring
- Database query logs
- API request/response logs

## Testing

- Unit tests (Jest)
- Integration tests
- E2E tests (Cypress/Playwright)
- Load testing (k6)

## Troubleshooting

### Database Connection Failed

- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database credentials
- Check network connectivity

### API Not Responding

- Verify backend is running
- Check port 3000 availability
- Review backend logs
- Check CORS configuration

### Frontend Not Loading

- Verify frontend is running
- Check NEXT_PUBLIC_API_URL
- Clear browser cache
- Check frontend logs

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, email support@hrms.com or create an issue on GitHub.

## Roadmap

- [ ] Advanced reporting and analytics
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Mobile app (React Native)
- [ ] Two-factor authentication
- [ ] Audit logs
- [ ] Bulk employee import/export
- [ ] Leave management
- [ ] Performance appraisals
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Real-time notifications (WebSocket)

## Credits

Built with ❤️ using modern web technologies.

---

**Last Updated**: January 2026
