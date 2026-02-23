"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateAIInsights = async (industry) => {
  const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
  try {
    const { userId } = await auth();
    if (!userId) {
      // Return mock data for unauthenticated users
      return getMockInsights();
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        industryInsight: true,
      },
    });

    if (!user) {
      // Return mock data for users not in database
      return getMockInsights();
    }

    // If no insights exist, generate them
    if (!user.industryInsight) {
      const insights = await generateAIInsights(user.industry);

      const industryInsight = await db.industryInsight.create({
        data: {
          industry: user.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return industryInsight;
    }

    return user.industryInsight;
  } catch (error) {
    console.error("Database connection error, returning mock data:", error);
    // Return mock data when database is not available
    return getMockInsights();
  }
}

// Mock data for when database is not available
function getMockInsights() {
  return {
    industry: "Technology",
    salaryRanges: [
      { role: "Software Engineer", min: 70000, max: 150000, median: 110000, location: "San Francisco" },
      { role: "Product Manager", min: 90000, max: 180000, median: 135000, location: "San Francisco" },
      { role: "Data Scientist", min: 80000, max: 160000, median: 120000, location: "San Francisco" },
      { role: "UX Designer", min: 60000, max: 130000, median: 95000, location: "San Francisco" },
      { role: "DevOps Engineer", min: 75000, max: 140000, median: 105000, location: "San Francisco" }
    ],
    growthRate: 8.5,
    demandLevel: "High",
    topSkills: ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker"],
    marketOutlook: "Positive",
    keyTrends: ["AI/ML Integration", "Remote Work", "Cloud Computing", "Cybersecurity", "Mobile Development"],
    recommendedSkills: ["TypeScript", "Kubernetes", "Machine Learning", "GraphQL", "Microservices"],
    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
}