# Quick Start Guide

Get Langy up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL running locally
- Google Gemini API key

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Create a `.env` file:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/langy?schema=public"
GEMINI_API_KEY="your-gemini-api-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Replace `password` with your PostgreSQL password and add your Google Gemini API key.

### 3. Set Up Database

```bash
# Create the database
createdb langy

# Push the schema
npm run db:push

# Seed with sample data (optional but recommended)
npm run db:seed
```

### 4. Start the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## What's Included in Seed Data

- **Demo User**: Email `demo@langy.app`
- **30 Spanish Words**: Across 8 categories
- **Sample Practice History**: 5 practice sessions
- **All Categories**: Verbs, Nouns, Adjectives, Food, Travel, Daily Life, Business, Nature

## First Steps

1. **Dashboard** - See your progress overview
2. **Translate** - Add a new word (e.g., "hello" → Spanish)
3. **Practice** - Generate a quiz from your words
4. **Feedback** - Write a sentence and get AI feedback
5. **Profile** - View your detailed stats

## Troubleshooting

### Database Connection Error

Make sure PostgreSQL is running:

```bash
# macOS
brew services start postgresql

# Linux
sudo service postgresql start

# Windows
net start postgresql
```

### Gemini API Error

- Check your API key is valid
- Ensure you have an active Google Cloud account with Gemini API enabled
- Verify the key is in `.env` file

### Port Already in Use

Change the port:

```bash
npm run dev -- -p 3001
```

## Need Help?

- Check the full [README.md](README.md)
- View the [Prisma Schema](prisma/schema.prisma)
- Explore the [API Routes](app/api/)

Happy learning! 🚀
