"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { EDebateCategory, Prisma } from "@prisma/client";
import { OrderByKeyType } from "@/components/order-by-group";
import { notFound } from "next/navigation";

export type GetTopicsType = Prisma.PromiseReturnType<typeof getTopics>;
export async function getTopics(
  category: EDebateCategory,
  orderBy: OrderByKeyType
) {
  const session = await getSession();
  try {
    let orderByObj = {};
    if (orderBy === "popular") {
      orderByObj = { like_count: "desc" };
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
        like_count: true,
        dislike_count: true,
        created_at: true,
        proposed_topic_reactions: {
          where: {
            user_id: session.id,
          },
          select: {
            reaction: true,
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
    return notFound();
  }
}

export async function likeTopic(topicId: number) {
  const session = await getSession();
  try {
    await db.proposedTopicReaction.create({
      data: {
        user_id: session.id,
        proposed_topic_id: topicId,
        reaction: "like",
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
    await db.proposedTopicReaction.delete({
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
    await db.proposedTopicReaction.create({
      data: {
        user_id: session.id,
        proposed_topic_id: topicId,
        reaction: "dislike",
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
    await db.proposedTopicReaction.delete({
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
