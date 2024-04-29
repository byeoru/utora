"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { EDebateCategory, Prisma } from "@prisma/client";
import { OrderByKeyType } from "@/components/order-by-group";
import { notFound, redirect } from "next/navigation";

export type GetTopicsType = Prisma.PromiseReturnType<typeof getTopics>;
export async function getTopics(
  category: EDebateCategory,
  orderBy: OrderByKeyType
) {
  const session = await getSession();
  try {
    let orderByObj = {};
    if (orderBy === "popular") {
      orderByObj = { vote_count: "desc" };
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
        vote_count: true,
        created_at: true,
        proposed_topic_ballets: {
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
    console.log(error);
    return notFound();
  }
}

export type GetTopicsTopRankType = Prisma.PromiseReturnType<
  typeof getTopicsTopRank
>;
export async function getTopicsTopRank(category: EDebateCategory) {
  try {
    const topics = await db.proposedTopic.findMany({
      where: {
        category: EDebateCategory[category],
        vote_count: {
          gt: 0,
        },
      },
      select: {
        id: true,
        topic: true,
        propose_reason: true,
        vote_count: true,
        created_at: true,
        proposed_topic_ballets: {
          select: {
            gender: true,
            ageGroup: true,
          },
        },
        user: {
          select: {
            nickname: true,
          },
        },
      },
      take: 3,
      orderBy: {
        vote_count: "desc",
      },
    });
    return topics;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export type VoteTopicType = Prisma.PromiseReturnType<typeof voteTopic>;
export async function voteTopic(topicId: number) {
  const session = await getSession();
  try {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        gender: true,
        age_group: true,
      },
    });
    if (!user) {
      session.destroy();
      redirect("/login");
    }
    if (!user.gender || !user.age_group) {
      return;
    }
    await db.proposedTopicBallet.create({
      data: {
        user_id: session.id,
        user_id_copy: session.id,
        proposed_topic_id: topicId,
        gender: user.gender,
        ageGroup: user.age_group,
      },
    });
    await db.proposedTopic.update({
      where: {
        id: topicId,
      },
      data: {
        vote_count: {
          increment: 1,
        },
      },
    });
  } catch (error) {}
}

export type CancelVoteTopicType = Prisma.PromiseReturnType<
  typeof cancelVoteTopic
>;
export async function cancelVoteTopic(topicId: number) {
  const session = await getSession();
  try {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        gender: true,
        age_group: true,
      },
    });
    if (!user) {
      session.destroy();
      redirect("/login");
    }
    if (!user.gender || !user.age_group) {
      return;
    }
    await db.proposedTopicBallet.delete({
      where: {
        id: {
          user_id_copy: session.id,
          proposed_topic_id: topicId,
        },
      },
    });
    await db.proposedTopic.update({
      where: {
        id: topicId,
      },
      data: {
        vote_count: {
          increment: -1,
        },
      },
    });
  } catch (error) {}
}
