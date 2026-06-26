#!/bin/bash

echo "🚀 Zalgo Infotech Portfolio - Quick Start"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Ask for database URL
read -p "Enter your PostgreSQL Database URL (from Neon): " DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Database URL is required!"
    exit 1
fi

# Ask for Gmail App Password
read -p "Enter your Gmail App Password: " EMAIL_PASSWORD
if [ -z "$EMAIL_PASSWORD" ]; then
    echo "❌ Email password is required!"
    exit 1
fi

echo ""
echo "📁 Setting up backend..."

# Setup backend
cd backend
cp .env.example .env 2>/dev/null || true

# Update .env with user inputs
sed -i.bak "s|DATABASE_URL=.*|DATABASE_URL=$DATABASE_URL|" .env
sed -i.bak "s|EMAIL_PASSWORD=.*|EMAIL_PASSWORD=$EMAIL_PASSWORD|" .env
rm -f .env.bak

echo "📦 Installing backend dependencies..."
npm install > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "✅ Backend setup complete!"
echo ""

# Go back to root
cd ..

echo "📁 Setting up frontend..."

# Setup frontend
cd frontend
echo "📦 Installing frontend dependencies..."
npm install > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "✅ Frontend setup complete!"
echo ""

# Go back to root
cd ..

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "🎯 To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "📧 Test the contact form at: http://localhost:3000/contact"
echo ""
echo "💡 For detailed setup, check README.md or SETUP_GUIDE.md"
echo ""
