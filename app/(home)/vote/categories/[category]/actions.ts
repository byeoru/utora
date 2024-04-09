"use server";

import getSession from "@/lib/session";
import { topicProposeSchema } from "./schema";
import db from "@/lib/db";
import { EDebateCategory, Prisma } from "@prisma/client";
import { OrderByKeyType } from "@/components/order-by-group";

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

export type GetTopicsType = Prisma.PromiseReturnType<typeof getTopics>;
export async function getTopics(
  category: EDebateCategory,
  orderBy: OrderByKeyType
) {
  const session = await getSession();
  try {
    let orderByObj = {};
    if (orderBy === "popular") {
      orderByObj = { likeCount: "desc" };
    } else if (orderBy === "latest") {
      orderByObj = { created_at: "desc" };
    }
    const topics = await db.proposedTopic.findMany({
      where: {
        category: EDebateCategory[category],
      },
      select: {
        id: true,
        topic: true,
        propose_reason: true,
        created_at: true,
        likeCount: true,
        dislikeCount: true,
        proposed_topic_likes: {
          where: {
            user_id: session.id,
          },
          select: {
            user_id: true,
          },
        },
        proposed_topic_dislikes: {
          where: {
            user_id: session.id,
          },
          select: {
            user_id: true,
          },
        },
        user: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: orderByObj,
    });
    return topics;
  } catch (error) {
    return null;
  }
}

export async function likeTopic(topicId: number) {
  const session = await getSession();
  try {
    await db.proposedTopicLike.create({
      data: {
        user_id: session.id,
        proposed_topic_id: topicId,
      },
    });
    await db.proposedTopic.update({
      where: {
        id: topicId,
      },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });
  } catch (error) {}
}

export async function cancelLikeTopic(topicId: number) {
  const session = await getSession();
  try {
    await db.proposedTopicLike.delete({
      where: {
        id: {
          user_id: session.id,
          proposed_topic_id: topicId,
        },
      },
    });
    await db.proposedTopic.update({
      where: {
        id: topicId,
      },
      data: {
        likeCount: {
          increment: -1,
        },
      },
    });
  } catch (error) {}
}

export async function dislikeTopic(topicId: number) {
  const session = await getSession();
  try {
    await db.proposedTopicDislike.create({
      data: {
        user_id: session.id,
        proposed_topic_id: topicId,
      },
    });
    await db.proposedTopic.update({
      where: {
        id: topicId,
      },
      data: {
        dislikeCount: {
          increment: 1,
        },
      },
    });
  } catch (error) {}
}

export async function cancelDislikeTopic(topicId: number) {
  const session = await getSession();
  try {
    await db.proposedTopicDislike.delete({
      where: {
        id: {
          user_id: session.id,
          proposed_topic_id: topicId,
        },
      },
    });
    await db.proposedTopic.update({
      where: {
        id: topicId,
      },
      data: {
        dislikeCount: {
          increment: -1,
        },
      },
    });
  } catch (error) {}
}
