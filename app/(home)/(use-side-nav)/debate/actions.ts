"use server";

import db from "@/lib/db";
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

export async function getDebateRoomId(thisWeekTopicId: number) {
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
