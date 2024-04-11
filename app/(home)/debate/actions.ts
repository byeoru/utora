"use server";

import db from "@/lib/db";

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
    return null;
  }
}
