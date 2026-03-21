import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const checkUser = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  try {
    let user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    // ✅ CREATE USER IF NOT EXISTS (CRITICAL FIX)
    if (!user) {
      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email: null,
          name: null,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("checkUser error:", error);
    return null; // prevent crash
  }
};