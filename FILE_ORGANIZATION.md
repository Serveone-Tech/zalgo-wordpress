# Zalgo Infotech Portfolio Website - File Organization Guide

## 📦 Complete File List

### BACKEND FILES (Node.js + Express + PostgreSQL)

```
backend/
├── src/
│   ├── server.ts                 ← Main Express server
│   ├── db/
│   │   └── schema.ts            ← Database schema (Drizzle ORM)
│   ├── services/
│   │   └── emailService.ts      ← Nodemailer configuration
│   └── routes/
│       └── contact.ts           ← Contact form API endpoint
├── .env                          ← Environment variables
├── package.json                  ← Dependencies
├── tsconfig.json                 ← TypeScript config
└── drizzle.config.ts            ← Database migration config
```

**Backend Files to Create:**
1. `backend_server.ts` → `src/server.ts`
2. `backend_schema.ts` → `src/db/schema.ts`
3. `backend_emailService.ts` → `src/services/emailService.ts`
4. `backend_contactRoute.ts` → `src/routes/contact.ts`
5. `backend_package.json` → `package.json`
6. `backend_.env` → `.env`
7. `backend_tsconfig.json` → `tsconfig.json`
8. `backend_drizzle.config.ts` → `drizzle.config.ts`

---

### FRONTEND FILES (Next.js 14 + TailwindCSS + TypeScript)

```
frontend/
├── app/
│   ├── layout.tsx               ← Root layout with Nav & Footer
│   ├── page.tsx                 ← Home page (Hero + Services)
│   ├── globals.css              ← Global styles (Dark theme)
│   ├── services/page.tsx        ← Services listing page
│   ├── portfolio/page.tsx        ← Portfolio/Case Studies page
│   ├── testimonials/page.tsx     ← Client testimonials page
│   ├── about/page.tsx           ← About company page
│   └── contact/page.tsx         ← Contact form page
├── components/
│   ├── ContactForm.tsx          ← Form component with validation
│   ├── Navigation.tsx           ← Header/Navigation component
│   └── Footer.tsx               ← Footer component
├── lib/
│   └── api.ts                   ← API client for backend
├── .env.local                   ← Frontend env variables
├── package.json                 ← Dependencies
├── tailwind.config.ts           ← TailwindCSS configuration
└── next.config.js              ← Next.js configuration
```

**Frontend Files to Create:**
1. `frontend_layout.tsx` → `app/layout.tsx`
2. `frontend_page.tsx` → `app/page.tsx`
3. `frontend_globals.css` → `app/globals.css`
4. `frontend_services_page.tsx` → `app/services/page.tsx`
5. `frontend_portfolio_page.tsx` → `app/portfolio/page.tsx`
6. `frontend_testimonials_page.tsx` → `app/testimonials/page.tsx`
7. `frontend_about_page.tsx` → `app/about/page.tsx`
8. `frontend_contact_page.tsx` → `app/contact/page.tsx`
9. `frontend_ContactForm.tsx` → `components/ContactForm.tsx`
10. `frontend_Navigation.tsx` → `components/Navigation.tsx`
11. `frontend_Footer.tsx` → `components/Footer.tsx`
12. `frontend_api.ts` → `lib/api.ts`
13. `frontend_.env.local` → `.env.local`
14. `frontend_package.json` → `package.json`
15. `frontend_tailwind.config.ts` → `tailwind.config.ts`
16. `frontend_next.config.js` → `next.config.js`

---

## 🚀 Quick Setup Checklist

### Before You Start
- [ ] Node.js 18+ installed
- [ ] Gmail account with 2FA enabled
- [ ] PostgreSQL database ready (Neon recommended)
- [ ] Gmail App Password generated

### Backend Setup
- [ ] Create `backend/` directory
- [ ] Run `npm init -y`
- [ ] Install dependencies from `backend_package.json`
- [ ] Create directory structure: `src/db`, `src/services`, `src/routes`
- [ ] Copy all 8 backend files to correct locations
- [ ] Update `.env` with your credentials
- [ ] Run `npm run db:push` to create database tables
- [ ] Start with `npm run dev` (should run on port 8080)

### Frontend Setup
- [ ] Create Next.js project with `npx create-next-app`
- [ ] Install dependencies from `frontend_package.json`
- [ ] Create directory structure: `components/`, `lib/`
- [ ] Create subdirectories: `app/services/`, `app/portfolio/`, etc.
- [ ] Copy all 16 frontend files to correct locations
- [ ] Update `.env.local` if needed
- [ ] Start with `npm run dev` (should run on port 3000)

### Testing
- [ ] Backend running on `http://localhost:8080`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Contact form appears on `/contact` page
- [ ] Submit test form and verify:
  - [ ] Email received at sales@zalgoinfotech.com
  - [ ] Confirmation email sent to test email
  - [ ] Entry created in database

---

## 🎨 Design Features

- **Dark Theme:** Professional dark background (#0f0f1a) with teal accents (#009999)
- **Responsive:** Mobile-first design that works on all devices
- **Modern UI:** Glassmorphism effects, smooth animations, gradient text
- **Performance:** Optimized images, code splitting, lazy loading
- **Accessibility:** Semantic HTML, proper color contrast, keyboard navigation

---

## 📊 Pages Overview

| Page | Purpose | Key Components |
|------|---------|-----------------|
| Home (`/`) | Hero section, service overview | Hero, Services grid, CTA |
| Services | Detailed service offerings | 6 services with features |
| Portfolio | Case studies and projects | 6 featured projects |
| Testimonials | Client reviews and feedback | 6 testimonials with ratings |
| About | Company story and values | Mission, Vision, Team, Values |
| Contact | Contact form and info | Form, Contact methods, FAQ |

---

## 🔐 Security Checklist

- [ ] Never commit `.env` files to Git
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Update CORS origins for production domain
- [ ] Use Gmail App Password (not main password)
- [ ] Keep email credentials secure
- [ ] Validate all form inputs (backend already includes this)
- [ ] Use CSRF protection in production

---

## 📧 Email Configuration

**Contact Form Emails:**
- Send to: `sales@zalgoinfotech.com`
- Template: Professional HTML with form details
- Confirmation: Auto-reply to user's email

**Email Service:**
- Provider: Gmail via Nodemailer
- Requires: App Password (16 characters)
- Fallback: None (test with your own Gmail)

---

## 🗄️ Database Schema

**Table: contacts**
```sql
- id (primary key)
- name (varchar 255)
- email (varchar 255)
- website (varchar 255, nullable)
- mobile (varchar 20)
- message (text)
- created_at (timestamp)
- updated_at (timestamp)
```

---

## 🚀 API Endpoints

### Contact Routes
- **POST** `/api/contact/submit` - Submit contact form
  - Request: `{name, email, website?, mobile, message}`
  - Response: `{success, message, data}`

- **GET** `/api/contact/submissions` - Fetch all submissions (admin)
  - Response: `{success, data: [contacts]}`

### Health Check
- **GET** `/health` - Server status check
  - Response: `{status, timestamp}`

---

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

All components use Tailwind's responsive utilities (sm:, md:, lg:)

---

## ⚡ Performance Optimizations

- Next.js Image optimization
- Code splitting and lazy loading
- CSS minification with Tailwind
- Database connection pooling
- GZIP compression
- Caching headers configured

---

## 📞 Support Information

**For Zalgo Infotech Contact:**
- Email: `sales@zalgoinfotech.com`
- Phone: Update in footer.tsx
- Address: Update in footer.tsx
- Business Hours: Update in contact page

---

## 📝 Content Customization

All website content can be easily customized:

1. **Services** - Edit in `app/services/page.tsx`
2. **Portfolio** - Edit in `app/portfolio/page.tsx`
3. **Testimonials** - Edit in `app/testimonials/page.tsx`
4. **Team** - Edit in `app/about/page.tsx`
5. **Company Info** - Edit in footer.tsx and about page
6. **Colors** - Edit in `app/globals.css` (CSS variables)

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 8080 already in use | Use different port or kill existing process |
| Database connection fails | Verify DATABASE_URL format and credentials |
| Emails not sending | Check Gmail App Password (16 chars, no spaces) |
| CORS errors | Update FRONTEND_URL in backend .env |
| Form not submitting | Check browser console, verify backend running |

---

## 📚 Tech Stack Summary

**Frontend:**
- Next.js 14 (React framework)
- TypeScript (Type safety)
- TailwindCSS (Styling)
- Axios (HTTP client)

**Backend:**
- Node.js + Express (Server)
- TypeScript (Type safety)
- Drizzle ORM (Database access)
- PostgreSQL (Database)
- Nodemailer (Email service)

**Infrastructure:**
- Vercel (Frontend hosting)
- Railway/Render (Backend hosting)
- Neon (PostgreSQL database)
- Gmail SMTP (Email service)

---

Generated for: Zalgo Infotech Private Limited
Date: 2024
Version: 1.0
