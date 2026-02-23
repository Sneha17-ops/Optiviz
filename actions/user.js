"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/* ============================= */
/*        UPDATE USER            */
/* ============================= */

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Find user by Clerk ID
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  // Auto-create user if not exists
  if (!user) {
    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: "",
        name: "",
      },
    });
  }

  try {
    const result = await db.$transaction(async (tx) => {
      // Check if industry exists
      let industryInsight = await tx.industryInsight.findUnique({
        where: {
          industry: data.industry,
        },
      });

      // Create industry if not exists
      if (!industryInsight) {
        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
            growthRate: "Medium",
            demandLevel: "High",
            salaryRange: "Data not available",
            marketOutlook: "Stable growth expected",
            nextUpdate: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
          },
        });
      }

      // Update user
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          industry: data.industry,
          experience: Number(data.experience),
          bio: data.bio,
          skills: Array.isArray(data.skills)
            ? data.skills.join(", ")
            : data.skills,
        },
      });

      return updatedUser;
    });

    revalidatePath("/");
    return result;
  } catch (error) {
    console.error("Profile update error:", error);
    throw new Error("Failed to update profile");
  }
}

/* ============================= */
/*     ONBOARDING STATUS         */
/* ============================= */

export async function getUserOnboardingStatus() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { isOnboarded: false };
    }

    let user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    // Auto-create user if missing
    if (!user) {
      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email: "",
          name: "",
        },
      });

      return { isOnboarded: false };
    }

    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.error("Onboarding status error:", error);
    return { isOnboarded: false };
  }
}