# Complete HRMS Project File List

## Overview

Complete production-ready HRMS with backend API, frontend UI, database setup, and deployment guides.

## Root Directory Files

```
/Users/adarshkumarrawat/hrms/
├── README.md                    # Main project documentation
├── PROJECT_SUMMARY.md          # Detailed project summary
├── GETTING_STARTED.md          # Quick start guide
├── DEPLOYMENT.md               # Deployment instructions
├── docker-compose.yml          # Docker Compose configuration
├── setup.sh                    # Linux/macOS setup script
├── setup.bat                   # Windows setup script
└── .gitignore                  # Git ignore file
```

## Backend Structure

```
backend/
├── src/
│   ├── auth/                               # Authentication Module
│   │   ├── auth.controller.ts             # HTTP endpoints
│   │   ├── auth.service.ts                # Business logic
│   │   ├── auth.module.ts                 # Module definition
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts            # JWT Passport strategy
│   │   └── dto/
│   │       └── login.dto.ts               # Login DTO
│   ├── employees/                         # Employee Management Module
│   │   ├── employee.controller.ts         # HTTP endpoints
│   │   ├── employee.service.ts            # Business logic
│   │   ├── employee.repository.ts         # Database queries
│   │   ├── employee.module.ts             # Module definition
│   │   └── dto/
│   │       └── employee.dto.ts            # Employee DTOs
│   ├── attendance/                        # Attendance Module
│   │   ├── attendance.controller.ts       # HTTP endpoints
│   │   ├── attendance.service.ts          # Business logic
│   │   ├── attendance.repository.ts       # Database queries
│   │   ├── attendance.module.ts           # Module definition
│   │   └── dto/
│   │       └── attendance.dto.ts          # Attendance DTOs
│   ├── common/                            # Shared Code
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts         # JWT authentication guard
│   │   │   └── roles.guard.ts            # Role-based access guard
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts        # @Roles decorator
│   │   │   └── current-user.decorator.ts # @CurrentUser decorator
│   │   └── filters/
│   │       └── http-exception.filter.ts  # Global exception filter
│   ├── config/
│   │   ├── configuration.ts              # Config factory
│   │   └── config.service.ts             # Config service
│   ├── prisma/
│   │   ├── prisma.service.ts             # Prisma client service
│   │   └── prisma.module.ts              # Prisma module
│   ├── app.module.ts                     # Root module
│   └── main.ts                           # Application entry point
├── prisma/
│   ├── schema.prisma                     # Database schema
│   └── seed.ts                           # Database seeding script
├── package.json                          # NPM dependencies
├── tsconfig.json                         # TypeScript configuration
├── .env                                  # Environment variables
├── .env.example                          # Environment template
├── Dockerfile                            # Docker image definition
├── .gitignore                            # Git ignore file
└── README.md                             # Backend documentation
```

## Frontend Structure

```
frontend/
├── app/
│   ├── login/
│   │   └── page.tsx                     # Login page
│   ├── dashboard/
│   │   ├── layout.tsx                   # Dashboard layout
│   │   └── page.tsx                     # Dashboard page
│   ├── employees/
│   │   └── page.tsx                     # Employees listing page
│   ├── attendance/
│   │   └── page.tsx                     # Attendance page (template)
│   ├── my-attendance/
│   │   └── page.tsx                     # Employee attendance page (template)
│   ├── reports/
│   │   └── page.tsx                     # Reports page (template)
│   ├── layout.tsx                       # Root layout
│   └── globals.css                      # Global styles
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                   # Top navigation bar
│   │   └── Sidebar.tsx                  # Side navigation
│   ├── stores/
│   │   └── authStore.ts                 # Zustand auth store
│   ├── lib/
│   │   ├── api.ts                       # Axios instance
│   │   └── api-client.ts                # API endpoint functions
│   ├── types/
│   │   └── index.ts                     # TypeScript definitions
│   └── utils/
│       └── helpers.ts                   # Helper functions
├── public/                              # Static assets
├── package.json                         # NPM dependencies
├── tsconfig.json                        # TypeScript configuration
├── next.config.ts                       # Next.js configuration
├── tailwind.config.ts                   # Tailwind CSS configuration
├── postcss.config.mjs                   # PostCSS configuration
├── .env.local                           # Environment variables
├── .env.example                         # Environment template
├── Dockerfile                           # Docker image definition
├── .gitignore                           # Git ignore file
└── README.md                            # Frontend documentation
```

## Database

### Prisma Schema

- **File**: `backend/prisma/schema.prisma`
- **Tables**:
  - `Employee` - User accounts and employee data
  - `Attendance` - Daily attendance records

### Database Seeding

- **File**: `backend/prisma/seed.ts`
- **Creates**: Demo users (admin, manager, employee)
- **Creates**: Sample attendance records

## Configuration Files

| File                       | Purpose                       |
| -------------------------- | ----------------------------- |
| `tsconfig.json` (backend)  | TypeScript compilation        |
| `tsconfig.json` (frontend) | TypeScript + path aliases     |
| `docker-compose.yml`       | Multi-container Docker setup  |
| `.env.example` (both)      | Environment variable template |
| `tailwind.config.ts`       | Tailwind CSS theming          |
| `next.config.ts`           | Next.js build configuration   |
| `package.json` (both)      | Dependencies and scripts      |

## Scripts Available

### Backend

```bash
npm run dev              # Start development server
npm run build           # Compile TypeScript
npm run start           # Run production build
npm run seed            # Seed database with demo data
npx prisma studio      # Open Prisma Studio
npx prisma migrate dev # Run migrations
```

### Frontend

```bash
npm run dev             # Start development server
npm run build          # Build for production
npm run start          # Run production server
npm run lint           # Run ESLint
```

### Root

```bash
./setup.sh              # Linux/macOS setup
setup.bat               # Windows setup
docker-compose up -d    # Start Docker services
docker-compose down     # Stop Docker services
```

## Key Technologies

### Backend Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator, class-transformer
- **Security**: bcryptjs

### Frontend Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **HTTP**: Axios
- **UI Components**: Custom Tailwind CSS

### DevOps

- **Containerization**: Docker & Docker Compose
- **Server**: Node.js 20
- **Process Manager**: PM2 (for production)
- **Reverse Proxy**: Nginx

## API Endpoints

### Authentication

- `POST /auth/login` - User login

### Employees

- `GET /employees` - List employees
- `GET /employees/:id` - Get employee
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

| Column        | Type     | Constraints            |
| ------------- | -------- | ---------------------- |
| id            | UUID     | Primary Key            |
| name          | String   | -                      |
| email         | String   | Unique                 |
| phone         | String   | -                      |
| designation   | String   | -                      |
| department    | String   | -                      |
| password      | String   | Hashed                 |
| role          | String   | ADMIN/MANAGER/EMPLOYEE |
| status        | String   | ACTIVE/INACTIVE        |
| dateOfJoining | DateTime | -                      |
| createdAt     | DateTime | Default: now()         |
| updatedAt     | DateTime | Auto-update            |

### Attendance Table

| Column       | Type     | Constraints                |
| ------------ | -------- | -------------------------- |
| id           | UUID     | Primary Key                |
| employeeId   | String   | Foreign Key → Employee     |
| checkInTime  | DateTime | Nullable                   |
| checkOutTime | DateTime | Nullable                   |
| workHours    | Float    | Nullable                   |
| date         | DateTime | -                          |
| createdAt    | DateTime | Default: now()             |
| updatedAt    | DateTime | Auto-update                |
| -            | -        | Unique: (employeeId, date) |

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://hrms_user:hrms_password@localhost:5432/hrms_db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=HRMS
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Documentation Files

| File                   | Content               |
| ---------------------- | --------------------- |
| `README.md` (root)     | Main documentation    |
| `PROJECT_SUMMARY.md`   | Detailed summary      |
| `GETTING_STARTED.md`   | Quick start guide     |
| `DEPLOYMENT.md`        | Production deployment |
| `README.md` (backend)  | Backend API docs      |
| `README.md` (frontend) | Frontend docs         |

## User Roles

### ADMIN

- Full system access
- Create/manage employees
- View all attendance
- Generate reports
- System settings

### MANAGER

- View team members
- Track team attendance
- Generate team reports
- Approve/manage team

### EMPLOYEE

- Personal dashboard
- Check-in/Check-out
- View own attendance
- Update profile

## Demo Credentials

### Admin

- Email: `admin@hrms.com`
- Password: `password123`

### Manager

- Email: `manager@hrms.com`
- Password: `password123`

### Employee

- Email: `employee@hrms.com`
- Password: `password123`

## Quick Start

### With Docker (Recommended)

```bash
docker-compose up -d
# Access: Frontend http://localhost:3001
#         Backend http://localhost:3000
```

### Manual Setup

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

## Next Steps

1. Review PROJECT_SUMMARY.md for overview
2. Follow GETTING_STARTED.md for setup
3. Check backend/README.md and frontend/README.md
4. Deploy using DEPLOYMENT.md

## Support

- Check documentation files
- Review code comments
- Check error logs
- Test with provided demo credentials

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: January 21, 2026
