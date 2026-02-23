"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/* ============================= */
/*         GET RESUME            */
/* ============================= */

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 🔥 Find or create user
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: "",
        name: "",
      },
    });
  }

  return await db.resume.findFirst({
    where: {
      userId: user.id,
    },
  });
}

/* ============================= */
/*        SAVE / UPDATE          */
/* ============================= */

export async function saveResume(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 🔥 Find or create user
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

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
    const existingResume = await db.resume.findFirst({
      where: { userId: user.id },
    });

    if (existingResume) {
      const updated = await db.resume.update({
        where: { id: existingResume.id },
        data: {
          title: data.title,
          content: data.content,
        },
      });

      revalidatePath("/resume");
      return updated;
    } else {
      const created = await db.resume.create({
        data: {
          userId: user.id,
          title: data.title,
          content: data.content,
        },
      });

      revalidatePath("/resume");
      return created;
    }
  } catch (error) {
    console.error("Resume save error:", error);
    throw new Error("Failed to save resume");
  }
}