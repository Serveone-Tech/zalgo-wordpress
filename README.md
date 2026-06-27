# 🚀 Zalgo Infotech Portfolio Website

Professional portfolio website for Zalgo Infotech showcasing WordPress expertise and digital solutions.

## 📋 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Neon.tech recommended)
- Gmail account with 2FA enabled

### ⚡ Super Fast Setup (3 Commands)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Then:**
1. Go to `http://localhost:3000/contact`
2. Fill out the contact form
3. Check `sales@zalgoinfotech.in` for the submission

That's it! 🎉

---

## 📝 Configuration

### Backend Setup (backend/.env)
```env
DATABASE_URL=postgresql://user:password@host:5432/database
EMAIL_USER=sales@zalgoinfotech.in
EMAIL_PASSWORD=your_gmail_app_password
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Get Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate App Password for Mail
4. Use 16-character password in .env

### Frontend Setup (frontend/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## 📁 Project Structure

```
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── server.ts          # Express server
│   │   ├── db/schema.ts       # Database schema
│   │   ├── services/          # Email service
│   │   └── routes/            # API routes
│   ├── package.json
│   ├── .env
│   └── drizzle.config.ts
│
├── frontend/                   # Next.js 14 React app
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── services/          # Services page
│   │   ├── portfolio/         # Portfolio page
│   │   ├── testimonials/      # Testimonials page
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── globals.css        # Dark theme
│   ├── components/            # Reusable components
│   ├── lib/api.ts            # API client
│   ├── package.json
│   └── .env.local
│
└── README.md                   # This file
```

---

## 🎯 Features

✅ **Dark Professional Theme** - Modern design with teal accents
✅ **Contact Form** - Full validation, database storage, email notifications
✅ **6 Pages** - Home, Services, Portfolio, Testimonials, About, Contact
✅ **Responsive Design** - Mobile-first, works on all devices
✅ **Email Integration** - Nodemailer with Gmail SMTP
✅ **Database** - PostgreSQL with Drizzle ORM
✅ **TypeScript** - Full type safety
✅ **API** - RESTful contact submission endpoint

---

## 📧 Contact Form Flow

1. User submits form on `/contact`
2. Frontend validates data
3. Sends to backend API
4. Backend validates again
5. Saves to PostgreSQL database
6. Sends email to office (`sales@zalgoinfotech.in`)
7. Sends confirmation to user
8. Returns success response

---

## 🗄️ Database Schema

**contacts table:**
- id (primary key)
- name (required)
- email (required)
- website (optional)
- mobile (required)
- message (required)
- created_at (timestamp)
- updated_at (timestamp)

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Push to GitHub and connect to Vercel
# Add env variable: NEXT_PUBLIC_API_URL=your_backend_url
```

### Backend (Railway/Render)
```bash
# Push code to GitHub
# Connect to Railway/Render
# Add environment variables from .env
# Deploy
```

### Database (Neon)
1. Create free account at [neon.tech](https://neon.tech)
2. Create PostgreSQL database
3. Copy connection string
4. Paste in backend .env as DATABASE_URL

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8080 in use | `lsof -i :8080` then `kill -9 <PID>` |
| DB connection error | Check DATABASE_URL format and credentials |
| Emails not sending | Verify Gmail App Password (16 chars) |
| CORS errors | Check FRONTEND_URL in backend .env |
| Form not submitting | Check browser console and backend logs |

---

## 📚 Tech Stack

**Frontend:**
- Next.js 14 (React framework)
- TypeScript
- TailwindCSS
- Axios

**Backend:**
- Node.js + Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- Nodemailer

---

## 🎨 Customization

### Update Website Content
- Edit pages in `frontend/app/`
- Services: `app/services/page.tsx`
- Portfolio: `app/portfolio/page.tsx`
- Testimonials: `app/testimonials/page.tsx`
- Team: `app/about/page.tsx`

### Change Colors
Edit CSS variables in `frontend/app/globals.css`:
```css
:root {
  --primary: 0 153 153;      /* Teal */
  --background: 15 15 26;    /* Dark */
  --foreground: 245 245 250; /* Light */
}
```

### Update Company Info
- Email: Search for `sales@zalgoinfotech.in` and replace
- Phone: Update in Footer component
- Address: Update in Footer component

---

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the documentation
- Check browser console for errors
- Check server logs: `npm run dev` output

---

## 📄 License

Built for Zalgo Infotech Private Limited

---

**Happy coding! 🚀**
