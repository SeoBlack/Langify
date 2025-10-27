# Environment Variables Setup

This document lists all the environment variables required for the Langy application.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/langy?schema=public"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Gemini AI (for quiz generation and contextual sentences)
GEMINI_API_KEY="your-gemini-api-key"

# Google Translate API
GOOGLE_TRANSLATE_API_KEY="your-google-translate-api-key"
```

## Environment Variables Explained

### DATABASE_URL

- PostgreSQL database connection string
- For development: Local PostgreSQL instance
- For production: Your Vercel Postgres or other cloud database URL

### JWT_SECRET

- Secret key for JWT token signing and verification
- Generate a strong random string for production
- Used for user authentication

### GEMINI_API_KEY

- Google Gemini AI API key
- Used for generating quiz questions and contextual sentences
- Get your key from: https://ai.google.dev/

### GOOGLE_TRANSLATE_API_KEY

- Google Cloud Translate API key
- Used for word translation functionality
- Enable in Google Cloud Console

## Vercel Deployment

When deploying to Vercel, add these environment variables in your project settings:

1. Go to your Vercel project
2. Navigate to Settings → Environment Variables
3. Add each variable with its corresponding value
4. Redeploy your application

## Generating Strong Secrets

For JWT_SECRET, generate a strong random string:

```bash
# On macOS/Linux
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## API Key Setup

### Gemini API Key

1. Visit https://ai.google.dev/
2. Sign in with your Google account
3. Create a new API key
4. Add it to your environment variables

### Google Translate API Key

1. Go to Google Cloud Console
2. Enable the Cloud Translation API
3. Create credentials (API Key)
4. Add it to your environment variables
