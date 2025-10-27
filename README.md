# Langy - Smart Language Learning MVP

A modern, AI-powered language learning application built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and PostgreSQL. Langy helps users learn languages through intelligent word translation, automatic categorization, AI-generated quizzes, contextual sentences, and personalized feedback.

![Langy](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-316192)

## ✨ Features

### 🏠 Dashboard

- **Progress Overview**: Track total words learned, mastered words, and current streak
- **Weekly Stats**: Monitor practice sessions and activity
- **Recent Words**: Quick access to recently added vocabulary
- **Quick Actions**: Easy navigation to key features

### 📚 Translation Page

- **Instant Translation**: Translate words from English to 10+ languages
- **AI Categorization**: Automatically organize words into smart categories
- **Context Notes**: Get usage context for better understanding
- **Auto-Save**: Words are automatically saved to your vocabulary
- **Multi-Language Support**: Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Korean, Russian, Arabic

### 🧠 Practice Zone

- **AI-Generated Quizzes**: Personalized multiple-choice quizzes based on your saved words
- **Adaptive Learning**: Questions prioritize words with lower mastery levels
- **Contextual Sentences**: Generate real-world usage examples for any word
- **Real-time Scoring**: Track your progress and accuracy
- **Mastery Tracking**: Words advance through 6 mastery levels (0-5)

### 💬 Feedback Page

- **Sentence Analysis**: Submit sentences for AI-powered grammar checking
- **Detailed Feedback**: Get comprehensive analysis of your writing
- **Corrections**: Receive specific corrections for errors
- **Improvement Suggestions**: Learn better ways to express yourself
- **Score Rating**: Numerical score (0-100) for your writing quality

### 👤 Profile & Stats

- **Comprehensive Stats**: View all your learning metrics
- **Mastery Breakdown**: See distribution across proficiency levels
- **Top Words**: Track your most mastered vocabulary
- **Recent Practice**: Review your practice history
- **Achievements**: Celebrate milestones and accomplishments

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand + React Query
- **Translation**: Google Translate API
- **AI Integration**: Google Gemini AI API (for categorization, quizzes, and feedback)
- **UI Components**: Radix UI primitives

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.x or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL**: 12.x or higher
- **Google Gemini API Key**: Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Google Translate API Key**: Get one from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Langy
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/langy?schema=public"

# Google Gemini API Key (Required for AI features)
GEMINI_API_KEY="your-gemini-api-key-here"

# Google Translate API Key (Required for translation)
GOOGLE_TRANSLATE_API_KEY="your-google-translate-api-key-here"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Important**: Replace `username`, `password`, and both API keys with your actual values.

### 4. Set Up the Database

First, create a PostgreSQL database named `langy`:

```bash
# Using psql
psql -U postgres
CREATE DATABASE langy;
\q
```

Then, push the Prisma schema to your database:

```bash
npm run db:push
```

### 5. Seed the Database (Optional)

Populate the database with sample data:

```bash
npm run db:seed
```

This will create:

- A demo user account
- 8 categories (Verbs, Nouns, Adjectives, Food & Dining, Travel, Daily Life, Business, Nature)
- 30 sample Spanish words
- Practice history logs

**Demo User Credentials:**

- Email: `demo@langy.app`
- Name: Language Learner

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Langy/
├── app/
│   ├── api/                    # API Routes
│   │   ├── translate/          # Translation endpoint
│   │   ├── quiz/               # Quiz generation & submission
│   │   ├── feedback/           # Sentence feedback
│   │   ├── words/              # Word management
│   │   ├── categories/         # Category listing
│   │   ├── stats/              # User statistics
│   │   └── contextual-sentence/# Contextual sentence generation
│   ├── feedback/               # Feedback page
│   ├── practice/               # Practice page
│   ├── profile/                # Profile page
│   ├── translate/              # Translation page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard/Home page
│   ├── providers.tsx           # React Query provider
│   └── globals.css             # Global styles
├── components/
│   ├── layout/
│   │   └── navigation.tsx      # Main navigation
│   └── ui/                     # shadcn/ui components
├── hooks/
│   └── use-toast.ts            # Toast notifications hook
├── lib/
│   ├── db.ts                   # Prisma client
│   ├── gemini.ts               # Google Gemini AI integration
│   ├── translate.ts            # Google Translate API integration
│   └── utils.ts                # Utility functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
├── store/
│   └── user-store.ts           # User state management
├── .env.example                # Environment variables template
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main models:

- **User**: User accounts with streak and progress tracking
- **Category**: Word categories with metadata
- **Word**: Vocabulary items with mastery levels
- **Quiz**: Generated quiz questions
- **QuizResult**: Quiz attempt results
- **PracticeLog**: User activity tracking

View the complete schema in `prisma/schema.prisma`.

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (database GUI)

# Linting
npm run lint         # Run ESLint
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on top of Radix UI primitives:

- Button
- Card
- Input
- Label
- Textarea
- Progress
- Tabs
- Toast
- Dialog
- Select
- Avatar
- Separator

All components are customizable through Tailwind CSS and follow accessibility best practices.

## 🤖 AI Features

### Translation & Categorization

- Uses Google Translate API for accurate word translation
- Uses Google Gemini AI for intelligent word categorization
- Provides contextual usage notes
- Supports 10+ target languages

### Quiz Generation

- AI generates contextually appropriate multiple-choice questions
- Adapts to user's vocabulary level
- Prioritizes words that need more practice

### Contextual Sentences

- Creates real-world usage examples
- Includes translations and explanations
- Helps understand word usage in context

### Feedback System

- Analyzes grammar and vocabulary usage
- Provides specific corrections
- Offers suggestions for improvement
- Assigns numerical scores (0-100)

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Database Setup for Production

For production, use a managed PostgreSQL service:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)

Update your `DATABASE_URL` environment variable with the production database URL.

## 🔐 Environment Variables

| Variable                   | Required | Description                                      |
| -------------------------- | -------- | ------------------------------------------------ |
| `DATABASE_URL`             | Yes      | PostgreSQL connection string                     |
| `GEMINI_API_KEY`           | Yes      | Google Gemini API key for AI features            |
| `GOOGLE_TRANSLATE_API_KEY` | Yes      | Google Translate API key for translation         |
| `NEXT_PUBLIC_APP_URL`      | No       | Application URL (default: http://localhost:3000) |

## 🎯 Future Enhancements

- [ ] User authentication (NextAuth.js)
- [ ] Voice pronunciation using Text-to-Speech
- [ ] Spaced repetition algorithm (SRS)
- [ ] Flashcard mode
- [ ] Progress charts and analytics
- [ ] Social features (compete with friends)
- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Export vocabulary lists
- [ ] Multiple language learning paths

## 🐛 Known Issues

- Translation requires an active Google Translate API key
- AI features require an active Google Gemini API key
- Initial AI responses may be slow depending on Gemini API latency
- Database must be running for the app to function

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email support@langy.app or open an issue on GitHub.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Google Translate API](https://cloud.google.com/translate) for accurate translations
- [Google Gemini AI](https://ai.google.dev/) for powerful AI capabilities
- [Prisma](https://www.prisma.io/) for excellent database tooling
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

**Built with ❤️ for language learners worldwide**

🌟 Star this repo if you find it helpful!
