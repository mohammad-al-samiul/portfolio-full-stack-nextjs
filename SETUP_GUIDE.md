# Setup & Troubleshooting Guide

## 🚀 Quick Start

### 1. Environment Setup (CRITICAL)

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual database and auth credentials:

```env
# DATABASE_URL must be a valid PostgreSQL connection string
# Example: postgresql://user:password@localhost:5432/portfolio_db
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db

# Generate a secret: openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-secret-here

# Your app URL (localhost for development)
NEXTAUTH_URL=http://localhost:3000
```

### 2. Database Setup

#### Option A: Local PostgreSQL

```bash
# Start PostgreSQL
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql
# Windows: Start PostgreSQL from Services

# Create database
createdb portfolio_db

# Update DATABASE_URL in .env.local with your local credentials
```

#### Option B: Cloud Database (Neon, Supabase)

1. Create a PostgreSQL database at [Neon](https://neon.tech) or [Supabase](https://supabase.com)
2. Copy the connection string
3. Paste into `DATABASE_URL` in `.env.local`

### 3. Initialize Prisma

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Create database schema
npx prisma migrate dev

# Seed database (optional)
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🔧 Troubleshooting

### "Can't reach database server at base"

**Cause:** Missing `DATABASE_URL` in `.env.local`

**Fix:**

1. Verify `.env.local` exists (not `.env`)
2. Check `DATABASE_URL` is set and valid
3. Ensure database server is running
4. Test connection: `psql <your-connection-string>`

### "There was a problem with the server configuration"

**Cause:** Missing or invalid NextAuth environment variables

**Fix:**

1. Verify `NEXTAUTH_SECRET` is set (generate with `openssl rand -base64 32`)
2. Verify `NEXTAUTH_URL=http://localhost:3000` (development)
3. Restart dev server: `npm run dev`

### Theme Provider Script Warning

**Status:** ✅ Fixed - The component now properly handles server/client rendering

### Navbar Flickering

**Status:** ✅ Fixed - Active state now correctly initialized and hydration mismatch resolved

### Build Errors

```bash
# Clean build and regenerate
rm -rf .next node_modules
npm install
npx prisma generate
npm run build
```

---

## ✅ Verification Checklist

- [ ] `.env.local` file exists with all required variables
- [ ] Database server is running
- [ ] `DATABASE_URL` is valid and tested
- [ ] `NEXTAUTH_SECRET` is generated and set
- [ ] `NEXTAUTH_URL` matches your environment
- [ ] `npx prisma generate` runs without errors
- [ ] `npm run dev` starts successfully
- [ ] Can access `http://localhost:3000`
- [ ] Database queries work (blog posts, projects visible)
- [ ] Admin login page loads without errors

---

## 📝 Database Connection Test

```bash
# Test Prisma connection
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

If Prisma Studio opens at `http://localhost:5555`, your connection is working!

---

## 🚨 Common Issues

| Error                              | Solution                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `Module not found: @prisma/client` | Run `npm install` and `npx prisma generate`                                  |
| `ECONNREFUSED` on localhost        | Database not running - start PostgreSQL                                      |
| `SSL certificate problem`          | Use `?sslmode=disable` in cloud connection strings or configure SSL properly |
| `Authentication failed`            | Check `DATABASE_URL` credentials are correct                                 |

---

## 📚 Documentation

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth.js v5 Beta Documentation](https://authjs.dev)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)

---

## 🎯 What Was Fixed

1. ✅ **Prisma Schema** - Added missing `url = env("DATABASE_URL")` to datasource
2. ✅ **API Error Handling** - All routes now return proper error messages
3. ✅ **Navbar Flicker** - Fixed hydration mismatch and state initialization
4. ✅ **ThemeProvider** - Removed hidden div approach for cleaner SSR handling
5. ✅ **NextAuth Configuration** - Added error logging and improved error messages
6. ✅ **Query Optimization** - Added field selection to reduce data transfer

---

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL` (your production database)
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET` (new secret for production)
4. Deploy!

For other platforms, ensure all environment variables are set before deploying.
