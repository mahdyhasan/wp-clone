# Augmex Admin Dashboard - Setup Instructions

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

#### Option 1: Automated Setup
```bash
# 1. Extract the archive
tar -xzf augmex-dashboard-complete.tar.gz
cd my-project

# 2. Install dependencies
npm install

# 3. Setup database
npx prisma generate
npm run db:push
npx tsx prisma/seed.ts

# 4. Start development server
npm run dev
```

#### Option 2: Manual Setup
```bash
# 1. Extract the archive
tar -xzf augmex-dashboard-complete.tar.gz
cd my-project

# 2. Install dependencies
npm install

# 3. Create environment file
echo 'DATABASE_URL="file:./dev.db"' > .env.local
echo 'JWT_SECRET="your-super-secret-jwt-key"' >> .env.local
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env.local

# 4. Setup database
npx prisma generate
npm run db:push
npx tsx prisma/seed.ts

# 5. Start development server
npm run dev
```

## 🔐 Default Admin Account
- **Email**: `admin@augmex.io`
- **Password**: `admin123`

## 🌐 Access URLs
- **Frontend**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login

## 📋 Available Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npx prisma studio    # View database
```

## 🛠️ Troubleshooting

### Common Issues

1. **Login Redirect Loop**
   - Clear browser cookies and cache
   - Ensure database is seeded: `npx tsx prisma/seed.ts`
   - Check that JWT_SECRET is set in .env.local

2. **Database Connection Issues**
   - Verify DATABASE_URL in .env.local
   - Run `npm run db:push` to ensure schema is up to date
   - Check file permissions for database file

3. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Clear .next folder: `rm -rf .next`
   - Run `npm run build` again

### Development Tips
- Use `npm run lint` to check code quality
- Monitor console for error messages
- Use browser dev tools to debug authentication issues
- Check network tab for API request failures

## 📁 Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── prisma/               # Database schema and migrations
```

## 🎯 Key Features
- ✅ Complete authentication system
- ✅ Content management (posts, pages)
- ✅ Media library with file upload
- ✅ Category and tag management
- ✅ Responsive admin dashboard
- ✅ Modern UI with shadcn/ui components

## 📞 Support
If you encounter any issues:
1. Check the troubleshooting section above
2. Review console logs for error messages
3. Ensure all dependencies are properly installed
4. Verify database configuration and connectivity

---

**Happy coding! 🚀**