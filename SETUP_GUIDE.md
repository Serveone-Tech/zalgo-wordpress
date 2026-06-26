# Zalgo Infotech Portfolio Website - Complete Setup Guide

## 📋 Project Overview

This is a professional portfolio website for Zalgo Infotech showcasing WordPress expertise and custom development services. Built with Next.js (frontend), Node.js/Express (backend), PostgreSQL database, and Nodemailer for email functionality.

---

## 🚀 Quick Start Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- Gmail account with 2FA enabled and App Password generated

---

## 📁 Project Structure

```
zalgo-portfolio/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── schema.ts
│   │   ├── services/
│   │   │   └── emailService.ts
│   │   ├── routes/
│   │   │   └── contact.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── drizzle.config.ts
│
└── frontend/
    ├── app/
    │   ├── page.tsx (Home)
    │   ├── services/page.tsx
    │   ├── portfolio/page.tsx
    │   ├── testimonials/page.tsx
    │   ├── about/page.tsx
    │   ├── contact/page.tsx
    │   ├── layout.tsx
    │   └── globals.css
    ├── components/
    │   ├── ContactForm.tsx
    │   ├── Navigation.tsx
    │   └── Footer.tsx
    ├── lib/
    │   └── api.ts
    ├── .env.local
    ├── package.json
    ├── tailwind.config.ts
    └── next.config.js
```

---

## 🔧 Backend Setup

### Step 1: Create Backend Directory
```bash
mkdir zalgo-portfolio-backend
cd zalgo-portfolio-backend
npm init -y
```

### Step 2: Install Dependencies
```bash
npm install express cors dotenv drizzle-orm pg nodemailer @types/express @types/node @types/nodemailer typescript tsx
npm install -D drizzle-kit
```

### Step 3: Create Directory Structure
```bash
mkdir -p src/db src/services src/routes
```

### Step 4: Add Files
- Copy `backend_server.ts` → `src/server.ts`
- Copy `backend_schema.ts` → `src/db/schema.ts`
- Copy `backend_emailService.ts` → `src/services/emailService.ts`
- Copy `backend_contactRoute.ts` → `src/routes/contact.ts`
- Copy `backend_package.json` → `package.json` (update if exists)
- Copy `backend_.env` → `.env`
- Copy `backend_tsconfig.json` → `tsconfig.json`
- Copy `backend_drizzle.config.ts` → `drizzle.config.ts`

### Step 5: Update .env File
```env
DATABASE_URL=postgresql://user:password@hostname/database_name
EMAIL_USER=sales@zalgoinfotech.com
EMAIL_PASSWORD=your_gmail_app_password
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace with your actual Neon PostgreSQL URL and Gmail App Password

### Step 6: Setup Database
```bash
npm run db:push
```

This creates the `contacts` table in your PostgreSQL database.

### Step 7: Start Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:8080`

✅ **Backend is ready!**

---

## 🎨 Frontend Setup

### Step 1: Create Next.js Project
```bash
npx create-next-app@latest zalgo-portfolio-frontend --typescript --tailwind
cd zalgo-portfolio-frontend
```

### Step 2: Install Additional Dependencies
```bash
npm install axios
```

### Step 3: Create Directory Structure
```bash
mkdir -p components lib
```

### Step 4: Add Files

**App Files:**
- Copy `frontend_layout.tsx` → `app/layout.tsx`
- Copy `frontend_page.tsx` → `app/page.tsx`
- Copy `frontend_globals.css` → `app/globals.css`

**Pages:**
- Create `app/services/` and copy `frontend_services_page.tsx` → `app/services/page.tsx`
- Create `app/portfolio/` and copy `frontend_portfolio_page.tsx` → `app/portfolio/page.tsx`
- Create `app/testimonials/` and copy `frontend_testimonials_page.tsx` → `app/testimonials/page.tsx`
- Create `app/about/` and copy `frontend_about_page.tsx` → `app/about/page.tsx`
- Create `app/contact/` and copy `frontend_contact_page.tsx` → `app/contact/page.tsx`

**Components:**
- Copy `frontend_ContactForm.tsx` → `components/ContactForm.tsx`
- Copy `frontend_Navigation.tsx` → `components/Navigation.tsx`
- Copy `frontend_Footer.tsx` → `components/Footer.tsx`

**Library:**
- Copy `frontend_api.ts` → `lib/api.ts`

**Config:**
- Copy `frontend_.env.local` → `.env.local`
- Copy `frontend_tailwind.config.ts` → `tailwind.config.ts`
- Copy `frontend_next.config.js` → `next.config.js`

### Step 5: Update .env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

For production, change to your backend URL:
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### Step 6: Start Frontend Server
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

✅ **Frontend is ready!**

---

## 🧪 Testing the Contact Form

1. Go to `http://localhost:3000/contact`
2. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Website: https://example.com (optional)
   - Mobile: +91 98765 43210
   - Message: Test message

3. Click "Send Message"

4. Check results:
   - ✅ Form submission success message
   - ✅ Check `sales@zalgoinfotech.com` inbox for the submission
   - ✅ Check your email for confirmation message
   - ✅ Verify entry in database (check Neon console)

---

## 📧 Gmail App Password Setup

If you don't have an App Password yet:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification (if not already enabled)
3. Go to "App passwords" section
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Use this password in your `.env` file as `EMAIL_PASSWORD`

---

## 🗄️ Database Setup with Neon

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Paste it in backend `.env` as `DATABASE_URL`

Example:
```
postgresql://username:password@ep-xyz.us-east-1.neon.tech/dbname?sslmode=require
```

---

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your frontend repository
4. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
   ```
5. Deploy

### Backend Deployment (Railway/Render)

#### Using Railway:
1. Push backend code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub
4. Add environment variables:
   ```
   DATABASE_URL=your_neon_url
   EMAIL_USER=sales@zalgoinfotech.com
   EMAIL_PASSWORD=your_gmail_app_password
   PORT=8080
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
5. Railway will auto-deploy

#### Using Render:
1. Push backend code to GitHub
2. Go to [render.com](https://render.com)
3. Create new web service from GitHub
4. Set build command: `npm install && npm run build`
5. Set start command: `node dist/server.js`
6. Add environment variables (same as above)
7. Deploy

---

## 📝 Important Notes

### Email Configuration
- Contact form emails are sent to: `sales@zalgoinfotech.com`
- Users receive automatic confirmation emails
- Requires Gmail App Password (not your main password)

### Database
- PostgreSQL required (not MySQL)
- Neon recommended for production
- Automatic backup recommended for production

### Security
- Update email credentials in production
- Use HTTPS in production
- Enable CORS only for your domain in production
- Keep `.env` files secure and never commit to git

### Performance
- Frontend optimized with Next.js (Image optimization, Code splitting)
- Backend optimized with connection pooling
- Consider adding caching layer (Redis) for scale

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 8080 is in use
- Verify DATABASE_URL is correct
- Ensure all dependencies are installed

### Contact form not submitting
- Check browser console for API errors
- Verify backend is running
- Check CORS configuration in backend

### Emails not sending
- Verify EMAIL_USER and EMAIL_PASSWORD in .env
- Check Gmail "Less secure app access" is enabled
- Verify Gmail App Password is correct (16 characters)
- Check email logs in browser console

### Database connection error
- Verify DATABASE_URL format
- Check if PostgreSQL is accessible
- Test connection with: `psql your_database_url`

---

## 📞 Support & Contact Info

For updates to the website:
- Email: sales@zalgoinfotech.com
- Website pages can be edited in `app/` directory
- Services/testimonials content can be updated in respective page files

---

## 🎯 Next Steps

1. ✅ Complete backend and frontend setup
2. ✅ Test contact form locally
3. ✅ Deploy frontend to Vercel
4. ✅ Deploy backend to Railway/Render
5. ✅ Update domain names in production
6. ✅ Setup email forwarding
7. ✅ Monitor and maintain

---

## 📦 File Manifest

**Backend Files:**
- backend_server.ts
- backend_schema.ts
- backend_emailService.ts
- backend_contactRoute.ts
- backend_package.json
- backend_.env
- backend_tsconfig.json
- backend_drizzle.config.ts

**Frontend Files:**
- frontend_package.json
- frontend_layout.tsx
- frontend_page.tsx
- frontend_globals.css
- frontend_services_page.tsx
- frontend_portfolio_page.tsx
- frontend_testimonials_page.tsx
- frontend_about_page.tsx
- frontend_contact_page.tsx
- frontend_ContactForm.tsx
- frontend_Navigation.tsx
- frontend_Footer.tsx
- frontend_api.ts
- frontend_.env.local
- frontend_tailwind.config.ts
- frontend_next.config.js

Good luck! 🚀
