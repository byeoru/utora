"use server";

import getSession from "@/lib/session";
import { topicProposeSchema } from "./schema";
import db from "@/lib/db";
import { EDebateCategory } from "@prisma/client";

export async function createTopic(_: any, formData: FormData) {
  const validation = topicProposeSchema.safeParse({
    topic: formData.get("topic"),
    proposeReason: formData.get("proposeReason"),
    category: formData.get("category"),
  });

  if (!validation.success) {
    return validation.error.flatten();
  }

  const session = await getSession();
  try {
    await db.proposedTopic.create({
      data: {
        topic: validation.data.topic,
        propose_reason: validation.data.proposeReason,
        user_id: session.id,
        category: validation.data.category,
      },
    });
  } catch (error) {
    return null;
  }
}

export async function getTopics(category: EDebateCategory) {
  try {
    const topics = await db.proposedTopic.findMany({
      where: {
        category: EDebateCategory[category],
      },
      select: {
        topic: true,
        propose_reason: true,
        created_at: true,
        like: true,
        dislike: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    return topics;
  } catch (error) {
    console.log(error);
    return null;
  }
}
