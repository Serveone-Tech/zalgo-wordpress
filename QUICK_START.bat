@echo off
cls
echo 🚀 Zalgo Infotech Portfolio - Quick Start
echo ==========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

echo 📁 Setting up backend...
cd backend

echo 📦 Installing backend dependencies...
call npm install >nul 2>&1
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo ✅ Backend setup complete!
echo.

cd ..

echo 📁 Setting up frontend...
cd frontend

echo 📦 Installing frontend dependencies...
call npm install >nul 2>&1
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✅ Frontend setup complete!
echo.

cd ..

echo.
echo ==========================================
echo ✅ Setup Complete!
echo ==========================================
echo.
echo 🎯 To start the application:
echo.
echo Terminal 1 (Backend^):
echo   cd backend ^&^& npm run dev
echo.
echo Terminal 2 (Frontend^):
echo   cd frontend ^&^& npm run dev
echo.
echo Then visit: http://localhost:3000
echo.
echo 📧 Test the contact form at: http://localhost:3000/contact
echo.
echo 💡 For detailed setup, check README.md or SETUP_GUIDE.md
echo.
echo ⚠️  Note: You need to update backend\.env with:
echo    - DATABASE_URL (from Neon.tech)
echo    - EMAIL_PASSWORD (Gmail App Password)
echo.
pause
