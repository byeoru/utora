import { categories } from "@/app/(home)/vote/categories/page";
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
          likeCount: {
            gt: 0,
          },
        },
        take: 3,
        orderBy: {
          likeCount: "desc",
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
            likeCount: selectedTopic.likeCount,
            dislikeCount: selectedTopic.dislikeCount,
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
              likeCount: selectedTopic.likeCount,
              dislikeCount: selectedTopic.dislikeCount,
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
