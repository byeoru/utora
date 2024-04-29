import { categories } from "@/lib/constants";
import db from "@/lib/db";
import { toFlattenArray } from "@/lib/utils";
import { EDebateCategory, Prisma } from "@prisma/client";

export type GetSelectedTopicsType = Prisma.PromiseReturnType<
  typeof getSelectedTopics
>;
const getSelectedTopics = async () => {
  return await Promise.all(
    Object.keys(categories).map((category) =>
      db.proposedTopic.findMany({
        where: {
          category: category as EDebateCategory,
          vote_count: {
            gt: 0,
          },
        },
        select: {
          topic: true,
          propose_reason: true,
          category: true,
          vote_count: true,
          user_id: true,
        },
        take: 3,
        orderBy: {
          vote_count: "desc",
        },
      })
    )
  );
};

export async function POST() {
  let selectedTopics: GetSelectedTopicsType | null = null;
  try {
    selectedTopics = await getSelectedTopics();
  } catch (error) {
    selectedTopics = await getSelectedTopics();
    if (!selectedTopics) {
      return Response.error();
    }
  }
  try {
    await db.thisWeekTopic.createMany({
      data: [...toFlattenArray(selectedTopics)],
    });
  } catch (error) {
    try {
      await db.thisWeekTopic.createMany({
        data: [...toFlattenArray(selectedTopics)],
      });
    } catch (error) {
      return Response.error();
    }
  }
  try {
    const thisWeekTopics = await db.thisWeekTopic.findMany({
      select: {
        id: true,
      },
    });
    await db.debateRoom.createMany({
      data: [
        ...thisWeekTopics.map((topic) => {
          return { this_week_topic_id: topic.id };
        }),
      ],
    });
    return Response.json({ ok: true });
  } catch (error) {
    return Response.error();
  }
}
