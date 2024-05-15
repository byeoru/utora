"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { EDebateCategory, Prisma } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { TOPICS_FETCH_SIZE } from "@/lib/constants";
import { TopicOrderByType } from "@/components/debate/vote/topic-pagination";

export type GetTopicsType = Prisma.PromiseReturnType<typeof getTopics>;
export async function getTopics(
  page: number,
  category: EDebateCategory,
  orderBy: TopicOrderByType
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
        debate_type: true,
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
            id: true,
            nickname: true,
          },
        },
      },
      take: TOPICS_FETCH_SIZE,
      skip: (page - 1) * TOPICS_FETCH_SIZE,
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
        debate_type: true,
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

export async function getMyProposeTopic(category: EDebateCategory) {
  const session = await getSession();
  try {
    const topic = await db.proposedTopic.findFirst({
      where: {
        category,
        user_id: session.id,
      },
      select: {
        topic: true,
        propose_reason: true,
        debate_type: true,
        created_at: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    return topic;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function getTotalTopicsCountOfCategory(category: EDebateCategory) {
  try {
    const count = await db.proposedTopic.count({
      where: {
        category,
      },
    });
    return count;
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
    await db.$transaction([
      db.proposedTopicBallet.create({
        data: {
          user_id: session.id,
          user_id_copy: session.id,
          proposed_topic_id: topicId,
          gender: user.gender,
          ageGroup: user.age_group,
        },
      }),
      db.proposedTopic.update({
        where: {
          id: topicId,
        },
        data: {
          vote_count: {
            increment: 1,
          },
        },
      }),
    ]);
  } catch (error) {}
}
