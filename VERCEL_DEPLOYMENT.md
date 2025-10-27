# Vercel Deployment Guide for Langy

This guide will walk you through deploying the Langy application to Vercel.

## Prerequisites

1. A Vercel account ([sign up](https://vercel.com))
2. A GitHub/GitLab/Bitbucket account
3. API keys for:
   - Gemini AI ([Get API Key](https://ai.google.dev/))
   - Google Cloud Translate API ([Enable in Google Cloud](https://console.cloud.google.com/))

## Step 1: Prepare Your Repository

1. Push your code to GitHub, GitLab, or Bitbucket
2. Ensure all changes are committed:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

## Step 2: Set Up Database

### Option A: Vercel Postgres (Recommended)

1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Create a new Postgres database
3. Copy the connection string (DATABASE_URL)
4. You'll add this as an environment variable later

### Option B: External PostgreSQL Database

You can use any PostgreSQL database (e.g., Supabase, Railway, Neon, etc.)

1. Set up your PostgreSQL database
2. Copy the connection string
3. You'll add this as an environment variable

## Step 3: Deploy to Vercel

### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (for preview)
vercel

# Deploy to production
vercel --prod
```

## Step 4: Configure Environment Variables

Go to your project settings on Vercel:

1. Navigate to **Settings** → **Environment Variables**
2. Add the following variables:

### Required Variables

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-change-this
GEMINI_API_KEY=your-gemini-api-key
GOOGLE_TRANSLATE_API_KEY=your-google-translate-api-key
```

### Setting Up Environment Variables

1. **DATABASE_URL**

   - If using Vercel Postgres: Use the connection string from your Vercel database
   - Format: `postgresql://user:password@host:port/database`

2. **JWT_SECRET**

   - Generate a secure random string:

   ```bash
   openssl rand -base64 32
   ```

   - Or:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

3. **GEMINI_API_KEY**

   - Get from: https://ai.google.dev/
   - Create a new project and API key
   - Enable the Generative AI API

4. **GOOGLE_TRANSLATE_API_KEY**
   - Enable Google Cloud Translation API
   - Create credentials at: https://console.cloud.google.com/
   - Enable billing (translations have a small cost)

### Environment Variable Scope

Set each variable for all three environments:

- **Production** ✅
- **Preview** ✅
- **Development** ✅

## Step 5: Run Database Migrations

After deploying, you need to run database migrations:

### Option A: Via Vercel CLI

```bash
# Install tsx globally
npm install -g tsx

# Run migration (you'll need to add DATABASE_URL for this command)
DATABASE_URL="your-database-url" npx prisma db push
```

### Option B: Via Vercel Functions

You can also create a migration endpoint in your Next.js app:

```typescript
// app/api/migrate/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (
    process.env.NODE_ENV === "production" &&
    req.headers.get("authorization") !== `Bearer ${process.env.MIGRATE_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Prisma will automatically sync schema on first connection
  return NextResponse.json({ success: true });
}
```

## Step 6: Deploy and Verify

1. After setting environment variables, trigger a new deployment:

   - Go to **Deployments** tab
   - Click **Redeploy** on the latest deployment

2. Monitor the deployment:
   - Check **Build Logs** for any errors
   - Ensure Prisma Client generation completes successfully
   - Verify the build completes without errors

## Step 7: Post-Deployment

### Seed the Database (Optional)

If you want to add initial data:

```bash
# Connect to your production database
DATABASE_URL="your-production-database-url" npm run db:seed
```

### Verify the Application

1. Visit your deployment URL
2. Test user registration and login
3. Test word translation
4. Test quiz generation
5. Check that all features work correctly

## Common Issues and Solutions

### Issue: Database Connection Error

**Solution**:

- Verify DATABASE_URL is correct
- Ensure PostgreSQL database is accessible
- Check firewall settings if using external database
- For Vercel Postgres, ensure the database is in the same project

### Issue: Prisma Client Not Generated

**Solution**:

- The postinstall script should generate it automatically
- Check build logs for Prisma generation errors
- Try redeploying after setting environment variables

### Issue: Build Fails

**Solution**:

- Check build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version is compatible (Vercel uses Node 20.x by default)

### Issue: Environment Variables Not Found

**Solution**:

- Verify variables are set in Vercel dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after adding variables

## Monitoring and Updates

### View Logs

```bash
vercel logs
```

Or view in Vercel dashboard under your deployment.

### Updating Your Application

1. Make changes locally
2. Commit and push to your repository
3. Vercel will automatically deploy preview
4. If changes look good, merge to main branch
5. Production will auto-deploy

## Performance Optimization

The application is already configured with:

- ✅ Prisma connection pooling
- ✅ Next.js standalone output
- ✅ SWC minification
- ✅ Production-optimized builds

## Security Checklist

Before going to production:

- [ ] Use strong JWT_SECRET (minimum 32 characters, random)
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up rate limiting (consider adding middleware)
- [ ] Review API key security
- [ ] Enable database backups (if using external DB)
- [ ] Review error logging and monitoring
- [ ] Consider adding Vercel Analytics for production monitoring

## Next Steps

After successful deployment:

1. Set up a custom domain (optional)
2. Configure SSL certificates (automatic with Vercel)
3. Set up monitoring and alerts
4. Consider adding Vercel Analytics
5. Review and update SEO settings

## Support

If you encounter issues:

1. Check [Vercel documentation](https://vercel.com/docs)
2. Check [Next.js documentation](https://nextjs.org/docs)
3. Check [Prisma documentation](https://www.prisma.io/docs)
4. Review application logs in Vercel dashboard

## Cost Estimation

### Vercel

- Free tier: 100GB bandwidth, unlimited static requests
- May upgrade for higher limits

### Database (Vercel Postgres)

- Free tier: Up to 256MB storage
- Pay as you go for additional storage

### API Costs

- Gemini AI: Pay per use
- Google Translate: Pay per character

Check current pricing on respective websites.
