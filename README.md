# 🚀 Developer Portfolio & CMS

A high-performance, SaaS-style developer portfolio built with **Next.js 16**, **React 19**, and **Prisma**. This project features a full-featured admin dashboard, blog engine, project showcase, and a robust communication system.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Key Features

### 💻 Public Portfolio
- **Modern UI/UX**: Premium glassmorphism design with smooth **Framer Motion** transitions.
- **Project Showcase**: Dynamic project gallery with detailed case studies.
- **Responsive Blog**: SEO-optimized blog with markdown support and reading time estimates.
- **Newsletter System**: Interactive subscription modal with real-time feedback.
- **Contact Workflow**: Hardened contact form with email notifications via **Resend**.

### 🛡️ Admin Dashboard
- **Secure Authentication**: Protected via **NextAuth.js**.
- **Content Management**: Complete CRUD for blog posts and portfolio projects.
- **Message Center**: Inbox for contact inquiries with a direct **threaded reply system**.
- **Real-time Stats**: Quick overview of site engagement and content growth.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL (via Prisma ORM)
- **Animations**: Framer Motion
- **Emails**: Resend
- **Icons**: Lucide React & React Icons
- **Notifications**: Sonner

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-postgresql-url"
RESEND_API_KEY="your-resend-key"
AUTH_SECRET="your-secret-key"
```

### 4. Database Sync & Seed
```bash
npx prisma db push
npm run prisma:seed
```

### 5. Run locally
```bash
npm run dev
```

---

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your repository to Vercel.
2. Add the environment variables listed above.
3. Vercel will automatically run the build and deploy your site.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by **Mohammad Al Samiul**
