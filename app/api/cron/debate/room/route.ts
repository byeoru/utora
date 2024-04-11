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
        select: {
          topic: true,
          propose_reason: true,
          category: true,
          like_count: true,
          dislike_count: true,
          user_id: true,
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
      data: [...toFlattenArray(selectedTopics), {}],
    });
    return Response.json({ ok: true });
  } catch (error) {
    try {
      await db.thisWeekTopic.createMany({
        data: [...toFlattenArray(selectedTopics)],
      });
      return Response.json({ ok: true });
    } catch (error) {
      return Response.error();
    }
  }
}
