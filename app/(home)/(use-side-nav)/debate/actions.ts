"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export async function getThisWeekTopics() {
  try {
    interface SortedThisWeekTopicType {
      [key: string]: typeof thisWeekTopics;
    }
    const thisWeekTopics = await db.thisWeekTopic.findMany({
      select: {
        id: true,
        topic: true,
        like_count: true,
        dislike_count: true,
        category: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    const sortedTopics: SortedThisWeekTopicType = {};
    thisWeekTopics.forEach((topic) => {
      if (!sortedTopics[topic.category]) {
        sortedTopics[topic.category] = [];
      }
      sortedTopics[topic.category].push(topic);
    });
    return sortedTopics;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function checkDebateRoom(thisWeekTopicId: number) {
  try {
    const thisWeekTopic = await db.thisWeekTopic.findUnique({
      where: {
        id: thisWeekTopicId,
      },
      select: {
        debate_room: true,
      },
    });
    return thisWeekTopic?.debate_room?.id;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function createDebateRoom(thisWeekTopicId: number) {
  try {
    const room = await db.debateRoom.create({
      data: {
        this_week_topic: {
          connect: {
            id: thisWeekTopicId,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return room.id;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
