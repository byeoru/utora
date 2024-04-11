"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { EDebateCategory, Prisma } from "@prisma/client";
import { OrderByKeyType } from "@/components/order-by-group";

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
        like_count: true,
        dislike_count: true,
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
    return console.log(`error: ${error}`);
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
        like_count: {
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
        like_count: {
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
        dislike_count: {
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
        dislike_count: {
          increment: -1,
        },
      },
    });
  } catch (error) {}
}
