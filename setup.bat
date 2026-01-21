@echo off
REM HRMS Setup Script for Windows

echo.
echo 🚀 HRMS - Setup Script
echo ========================
echo.

REM Check Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Node.js is installed

REM Backend Setup
echo.
echo 📦 Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✅ Backend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please update .env with your database credentials
)

echo 📊 Running Prisma migrations...
call npx prisma generate
call npx prisma migrate dev --name init

cd ..

REM Frontend Setup
echo.
echo 🎨 Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✅ Frontend dependencies already installed
)

if not exist ".env.local" (
    echo Creating .env.local file from .env.example...
    copy .env.example .env.local
)

cd ..

echo.
echo ✅ Setup completed!
echo.
echo 📝 Next steps:
echo 1. Update backend\.env with your database credentials
echo 2. Update frontend\.env.local if needed
echo 3. Run the backend: cd backend ^& npm run dev
echo 4. Run the frontend: cd frontend ^& npm run dev
echo.
echo Or use Docker Compose:
echo   docker-compose up -d
echo.
