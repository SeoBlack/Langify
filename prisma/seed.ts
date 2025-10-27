import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Skip seeding in production unless explicitly enabled
  if (process.env.NODE_ENV === "production" && !process.env.ENABLE_SEEDING) {
    console.log("⏭️  Skipping database seed in production mode");
    console.log("💡 To enable seeding in production, set ENABLE_SEEDING=true");
    return;
  }

  console.log("🌱 Starting database seed...");

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@langy.app" },
    update: {},
    create: {
      id: "demo-user-1",
      email: "demo@langy.app",
      name: "Language Learner",
      password: "demo123", // This should be hashed in production
      streak: 5,
      totalWords: 0,
      masteredWords: 0,
      nativeLanguage: "en",
      targetLanguage: "es",
      profileSetupCompleted: true,
      onboardingCompleted: true,
    },
  });
  console.log("✅ Created demo user:", user.email);

  // Create categories
  const categories = [
    {
      name: "Verbs",
      description: "Action words and verbs",
      color: "#3B82F6",
      icon: "🏃",
    },
    {
      name: "Nouns",
      description: "People, places, and things",
      color: "#10B981",
      icon: "📦",
    },
    {
      name: "Adjectives",
      description: "Descriptive words",
      color: "#F59E0B",
      icon: "🎨",
    },
    {
      name: "Food & Dining",
      description: "Food and restaurant vocabulary",
      color: "#EF4444",
      icon: "🍕",
    },
    {
      name: "Travel",
      description: "Travel and transportation",
      color: "#8B5CF6",
      icon: "✈️",
    },
    {
      name: "Daily Life",
      description: "Everyday vocabulary",
      color: "#EC4899",
      icon: "🏠",
    },
    {
      name: "Business",
      description: "Professional vocabulary",
      color: "#14B8A6",
      icon: "💼",
    },
    {
      name: "Nature",
      description: "Natural world vocabulary",
      color: "#22C55E",
      icon: "🌳",
    },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    createdCategories.push(category);
    console.log("✅ Created category:", category.name);
  }

  // Sample Spanish words
  const sampleWords = [
    // Verbs
    {
      original: "hablar",
      translation: "to speak",
      category: "Verbs",
      targetLanguage: "es",
      context: "Used for communication",
      masteryLevel: 3,
    },
    {
      original: "comer",
      translation: "to eat",
      category: "Verbs",
      targetLanguage: "es",
      context: "Related to dining",
      masteryLevel: 4,
    },
    {
      original: "vivir",
      translation: "to live",
      category: "Verbs",
      targetLanguage: "es",
      context: "Used for residence or lifestyle",
      masteryLevel: 2,
    },
    {
      original: "trabajar",
      translation: "to work",
      category: "Verbs",
      targetLanguage: "es",
      context: "Professional activity",
      masteryLevel: 3,
    },
    {
      original: "estudiar",
      translation: "to study",
      category: "Verbs",
      targetLanguage: "es",
      context: "Learning activity",
      masteryLevel: 5,
    },

    // Nouns
    {
      original: "casa",
      translation: "house",
      category: "Nouns",
      targetLanguage: "es",
      context: "Place of residence",
      masteryLevel: 5,
    },
    {
      original: "libro",
      translation: "book",
      category: "Nouns",
      targetLanguage: "es",
      context: "Reading material",
      masteryLevel: 4,
    },
    {
      original: "amigo",
      translation: "friend",
      category: "Nouns",
      targetLanguage: "es",
      context: "Personal relationship",
      masteryLevel: 5,
    },
    {
      original: "familia",
      translation: "family",
      category: "Nouns",
      targetLanguage: "es",
      context: "Close relatives",
      masteryLevel: 4,
    },
    {
      original: "ciudad",
      translation: "city",
      category: "Nouns",
      targetLanguage: "es",
      context: "Urban area",
      masteryLevel: 3,
    },

    // Adjectives
    {
      original: "grande",
      translation: "big",
      category: "Adjectives",
      targetLanguage: "es",
      context: "Size descriptor",
      masteryLevel: 4,
    },
    {
      original: "pequeño",
      translation: "small",
      category: "Adjectives",
      targetLanguage: "es",
      context: "Size descriptor",
      masteryLevel: 4,
    },
    {
      original: "bonito",
      translation: "beautiful",
      category: "Adjectives",
      targetLanguage: "es",
      context: "Appearance descriptor",
      masteryLevel: 3,
    },
    {
      original: "rápido",
      translation: "fast",
      category: "Adjectives",
      targetLanguage: "es",
      context: "Speed descriptor",
      masteryLevel: 2,
    },
    {
      original: "feliz",
      translation: "happy",
      category: "Adjectives",
      targetLanguage: "es",
      context: "Emotion descriptor",
      masteryLevel: 5,
    },

    // Food & Dining
    {
      original: "comida",
      translation: "food",
      category: "Food & Dining",
      targetLanguage: "es",
      context: "General term for food",
      masteryLevel: 5,
    },
    {
      original: "agua",
      translation: "water",
      category: "Food & Dining",
      targetLanguage: "es",
      context: "Beverage",
      masteryLevel: 5,
    },
    {
      original: "pan",
      translation: "bread",
      category: "Food & Dining",
      targetLanguage: "es",
      context: "Staple food",
      masteryLevel: 4,
    },
    {
      original: "restaurante",
      translation: "restaurant",
      category: "Food & Dining",
      targetLanguage: "es",
      context: "Dining establishment",
      masteryLevel: 4,
    },
    {
      original: "desayuno",
      translation: "breakfast",
      category: "Food & Dining",
      targetLanguage: "es",
      context: "Morning meal",
      masteryLevel: 3,
    },

    // Travel
    {
      original: "viaje",
      translation: "trip",
      category: "Travel",
      targetLanguage: "es",
      context: "Journey or expedition",
      masteryLevel: 3,
    },
    {
      original: "avión",
      translation: "airplane",
      category: "Travel",
      targetLanguage: "es",
      context: "Air transportation",
      masteryLevel: 4,
    },
    {
      original: "hotel",
      translation: "hotel",
      category: "Travel",
      targetLanguage: "es",
      context: "Accommodation",
      masteryLevel: 4,
    },
    {
      original: "playa",
      translation: "beach",
      category: "Travel",
      targetLanguage: "es",
      context: "Coastal destination",
      masteryLevel: 3,
    },
    {
      original: "pasaporte",
      translation: "passport",
      category: "Travel",
      targetLanguage: "es",
      context: "Travel document",
      masteryLevel: 2,
    },

    // Daily Life
    {
      original: "día",
      translation: "day",
      category: "Daily Life",
      targetLanguage: "es",
      context: "Time period",
      masteryLevel: 5,
    },
    {
      original: "noche",
      translation: "night",
      category: "Daily Life",
      targetLanguage: "es",
      context: "Time period",
      masteryLevel: 5,
    },
    {
      original: "tiempo",
      translation: "time",
      category: "Daily Life",
      targetLanguage: "es",
      context: "Temporal concept",
      masteryLevel: 4,
    },
    {
      original: "persona",
      translation: "person",
      category: "Daily Life",
      targetLanguage: "es",
      context: "Individual human",
      masteryLevel: 4,
    },
    {
      original: "teléfono",
      translation: "phone",
      category: "Daily Life",
      targetLanguage: "es",
      context: "Communication device",
      masteryLevel: 3,
    },
  ];

  let wordCount = 0;
  let masteredCount = 0;

  for (const wordData of sampleWords) {
    const category = createdCategories.find(
      (c) => c.name === wordData.category
    );
    if (!category) continue;

    const word = await prisma.word.create({
      data: {
        userId: user.id,
        categoryId: category.id,
        original: wordData.original,
        translation: wordData.translation,
        targetLanguage: wordData.targetLanguage,
        sourceLanguage: "en",
        context: wordData.context,
        masteryLevel: wordData.masteryLevel,
        correctCount: wordData.masteryLevel * 2,
        incorrectCount: Math.max(0, 5 - wordData.masteryLevel),
        lastPracticed: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ), // Random date within last week
      },
    });

    wordCount++;
    if (word.masteryLevel === 5) masteredCount++;
    console.log("✅ Created word:", word.original, "->", word.translation);
  }

  // Update user stats
  await prisma.user.update({
    where: { id: user.id },
    data: {
      totalWords: wordCount,
      masteredWords: masteredCount,
    },
  });

  // Create sample practice logs
  const practiceLogs = [
    {
      activityType: "quiz",
      score: 80,
      wordsCount: 5,
      durationMinutes: 10,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      activityType: "quiz",
      score: 90,
      wordsCount: 5,
      durationMinutes: 8,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      activityType: "feedback",
      score: 75,
      wordsCount: 12,
      durationMinutes: 15,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      activityType: "quiz",
      score: 100,
      wordsCount: 5,
      durationMinutes: 12,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      activityType: "sentence_practice",
      score: 85,
      wordsCount: 8,
      durationMinutes: 20,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const log of practiceLogs) {
    await prisma.practiceLog.create({
      data: {
        userId: user.id,
        ...log,
      },
    });
    console.log("✅ Created practice log:", log.activityType);
  }

  console.log("🎉 Database seeded successfully!");
  console.log(
    `📊 Created ${wordCount} words across ${createdCategories.length} categories`
  );
  console.log(`🏆 ${masteredCount} words marked as mastered`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
