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
          like_count: {
            gt: 0,
          },
        },
        take: 3,
        orderBy: {
          like_count: "desc",
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
      data: [
        ...toFlattenArray(selectedTopics).map((selectedTopic) => {
          return {
            topic: selectedTopic.topic,
            propose_reason: selectedTopic.propose_reason,
            category: selectedTopic.category,
            like_count: selectedTopic.likeCount,
            dislike_count: selectedTopic.dislikeCount,
            user_id: selectedTopic.user_id,
          };
        }),
      ],
    });
    return Response.json({ ok: true });
  } catch (error) {
    try {
      await db.thisWeekTopic.createMany({
        data: [
          ...toFlattenArray(selectedTopics).map((selectedTopic) => {
            return {
              topic: selectedTopic.topic,
              propose_reason: selectedTopic.propose_reason,
              category: selectedTopic.category,
              like_count: selectedTopic.likeCount,
              dislike_count: selectedTopic.dislikeCount,
              user_id: selectedTopic.user_id,
            };
          }),
        ],
      });
      return Response.json({ ok: true });
    } catch (error) {
      return Response.error();
    }
  }
}
