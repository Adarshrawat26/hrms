# Getting Started with HRMS

Complete step-by-step guide to get HRMS running locally or in production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start with Docker](#quick-start-with-docker)
3. [Manual Setup](#manual-setup)
4. [Verification](#verification)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

### Minimum Requirements

- Node.js 18 or higher
- npm or yarn
- PostgreSQL 13+ (or Docker)
- Git
- 2 GB RAM minimum

### Recommended

- Node.js 20 LTS
- PostgreSQL 15
- Docker & Docker Compose
- VS Code with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prisma
  - Thunder Client or Postman

## Quick Start with Docker

The easiest way to get HRMS running is with Docker Compose.

### Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/yourusername/hrms.git
   cd hrms
   ```

2. **Start Services**

   ```bash
   docker-compose up -d
   ```

   This will:
   - Start PostgreSQL database
   - Build and run backend API
   - Build and run frontend

3. **Wait for Services**

   ```bash
   docker-compose logs -f
   # Wait until you see "HRMS Backend is running on http://localhost:3000"
   ```

4. **Access Application**
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000
   - Database: localhost:5432

5. **Login with Demo Credentials**

   ```
   Email: admin@hrms.com
   Password: password123
   ```

6. **Stop Services**
   ```bash
   docker-compose down
   ```

## Manual Setup

### Backend Setup

1. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Setup PostgreSQL Database**

   **Option A: Using Docker**

   ```bash
   docker run --name hrms-postgres -e POSTGRES_USER=hrms_user -e POSTGRES_PASSWORD=hrms_password -e POSTGRES_DB=hrms_db -p 5432:5432 -d postgres:15
   ```

   **Option B: Manual Installation**
   - Download from https://www.postgresql.org/download/
   - Create database: `hrms_db`
   - Create user: `hrms_user` with password `hrms_password`

3. **Configure Environment**

   ```bash
   cp .env.example .env
   ```

   Update `.env`:

   ```env
   DATABASE_URL="postgresql://hrms_user:hrms_password@localhost:5432/hrms_db"
   JWT_SECRET="your-secret-key-here"
   PORT=3000
   ```

4. **Run Database Migrations**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Seed Database (Optional)**

   ```bash
   npm run seed
   ```

6. **Start Backend Server**

   ```bash
   npm run dev
   ```

   You should see:

   ```
   HRMS Backend is running on http://localhost:3000
   ```

### Frontend Setup

1. **Install Frontend Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env.local
   ```

   `.env.local` should contain:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Start Frontend Server**

   ```bash
   npm run dev
   ```

   You should see:

   ```
   ▲ Next.js 16.1.4
   - Local: http://localhost:3001
   ```

4. **Open in Browser**
   - Go to http://localhost:3001

## Verification

### Backend API Check

1. **Health Check**

   ```bash
   curl http://localhost:3000/auth/login
   ```

2. **Login Test**

   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@hrms.com","password":"password123"}'
   ```

   Should return:

   ```json
   {
     "access_token": "eyJhbGc...",
     "user": {
       "id": "...",
       "email": "admin@hrms.com",
       "name": "Admin User",
       "role": "ADMIN"
     }
   }
   ```

### Frontend Check

1. Open http://localhost:3001
2. Login with `admin@hrms.com` / `password123`
3. See dashboard with employee count
4. Try navigation to different pages

### Database Check

1. **Using Prisma Studio**

   ```bash
   cd backend
   npx prisma studio
   ```

   Opens at http://localhost:5555

2. **Using psql**
   ```bash
   psql -U hrms_user -d hrms_db -h localhost
   ```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>

# For Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Failed

1. **Check PostgreSQL is Running**

   ```bash
   # macOS
   brew services list

   # Linux
   sudo systemctl status postgresql

   # Windows
   Services -> PostgreSQL
   ```

2. **Verify Credentials**

   ```bash
   psql -U hrms_user -d hrms_db -h localhost
   ```

3. **Reset Database**
   ```bash
   # Drop and recreate
   dropdb -U hrms_user hrms_db
   createdb -U hrms_user hrms_db
   npm run prisma:migrate
   npm run seed
   ```

### API Not Responding

1. **Check if Backend is Running**

   ```bash
   curl http://localhost:3000
   ```

2. **Check Logs**

   ```bash
   cd backend
   npm run dev
   # Look for errors in output
   ```

3. **Verify Environment Variables**
   ```bash
   cat .env
   ```

### Frontend Not Loading

1. **Check if Frontend is Running**

   ```bash
   curl http://localhost:3001
   ```

2. **Clear Next.js Cache**

   ```bash
   cd frontend
   rm -rf .next
   npm run dev
   ```

3. **Check Console for Errors**
   - Open browser DevTools (F12)
   - Check Console and Network tabs
   - Verify NEXT_PUBLIC_API_URL is correct

### Docker Issues

1. **Containers Not Starting**

   ```bash
   docker-compose logs
   ```

2. **Network Issues**

   ```bash
   docker-compose down
   docker-compose up --build -d
   ```

3. **Remove Everything and Start Fresh**
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

## Next Steps

### Basic Usage

1. **Login as Admin**
   - Email: `admin@hrms.com`
   - Password: `password123`

2. **Explore Admin Dashboard**
   - View total employees
   - Create new employees
   - View attendance

3. **Login as Employee**
   - Email: `employee@hrms.com`
   - Password: `password123`
   - Check in/out

### Development

- Review [Backend README](backend/README.md)
- Review [Frontend README](frontend/README.md)
- Check [Deployment Guide](DEPLOYMENT.md)
- Read [Architecture Documentation](ARCHITECTURE.md)

### Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to:

- AWS EC2
- DigitalOcean
- Vercel
- Docker
- Self-hosted servers

## Feature Checklist

### Authentication

- ✅ Email/password login
- ✅ JWT token generation
- ✅ Token refresh (can be implemented)
- ⏳ Two-factor authentication (future)

### Employee Management

- ✅ Create employees
- ✅ View employees
- ✅ Update employees
- ✅ Delete employees
- ⏳ Bulk import (future)

### Attendance

- ✅ Check-in/Check-out
- ✅ View attendance history
- ✅ Generate attendance reports
- ⏳ Geolocation tracking (future)

### Dashboards

- ✅ Admin dashboard
- ✅ Manager dashboard
- ✅ Employee dashboard
- ⏳ Advanced analytics (future)

## Support & Documentation

- **API Documentation**: http://localhost:3000 (after running backend)
- **Prisma Studio**: http://localhost:5555 (after running `npx prisma studio`)
- **GitHub Issues**: Report bugs and feature requests

## Quick Commands Reference

### Backend

```bash
cd backend
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm start               # Run production build
npm run seed            # Seed database with demo data
npx prisma studio      # Open Prisma Studio
npx prisma migrate dev # Run migrations
```

### Frontend

```bash
cd frontend
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm start               # Run production build
npm run lint            # Run ESLint
```

### Docker

```bash
docker-compose up -d    # Start services
docker-compose down     # Stop services
docker-compose logs     # View logs
docker-compose restart  # Restart services
```

## Performance Tips

1. **Development**
   - Use React DevTools browser extension
   - Use Network tab in DevTools to monitor API calls
   - Use Prisma Studio for database inspection

2. **Database**
   - Run migrations during off-peak hours
   - Backup database regularly
   - Monitor query performance

3. **Frontend**
   - Use lazy loading for routes
   - Optimize images
   - Monitor bundle size

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT_SECRET
   - Rotate secrets regularly

2. **Database**
   - Use strong passwords
   - Enable SSL connections
   - Regular backups

3. **API**
   - Enable CORS properly
   - Validate all inputs
   - Implement rate limiting

## FAQ

**Q: How do I reset my password?**
A: Contact admin or reset in database directly (not implemented yet)

**Q: Can I use MySQL instead of PostgreSQL?**
A: Update DATABASE_URL in Prisma schema and .env

**Q: How do I backup my data?**
A: Use PostgreSQL pg_dump or enable automated backups in cloud provider

**Q: Where are logs stored?**
A: Backend logs to console; consider setting up Winston for file logging

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

ISC License - see LICENSE file

---

**Last Updated**: January 2026
**Version**: 1.0.0
