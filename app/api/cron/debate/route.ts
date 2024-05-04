import { categories } from "@/lib/constants";
import db from "@/lib/db";
import { toFlattenArray } from "@/lib/utils";
import { EDebateCategory, EDebateStatus, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

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

/**
 *
 * this week topic, 토론방 생성, proposed topic 모두 삭제
 */
export async function POST(req: NextRequest) {
  // upstash를 통한 요청만 허가
  const apiKey = req.headers.get("utora-apikey");
  if (apiKey !== process.env.UTORA_API_KEY!) {
    return Response.json(
      {
        success: false,
        error: "허가되지 않은 요청입니다.",
      },
      { status: 401 }
    );
  }

  let selectedTopics: GetSelectedTopicsType | null = null;
  // 최상위 3개 topic fetch
  try {
    selectedTopics = await getSelectedTopics();
  } catch (error) {
    selectedTopics = await getSelectedTopics();
    if (!selectedTopics) {
      return Response.json({ success: false, error }, { status: 500 });
    }
  }
  // 최상위 3개의 topic으로 thisWeekTopic 생성
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
      return Response.json({ success: false, error }, { status: 500 });
    }
  }
  // debate room 생성
  try {
    const thisWeekTopics = await db.thisWeekTopic.findMany({
      select: {
        id: true,
      },
    });
    await db.debateRoom.createMany({
      data: [
        ...thisWeekTopics.map((topic) => {
          return {
            this_week_topic_id: topic.id,
            status: EDebateStatus.in_debate,
          };
        }),
      ],
    });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
  // proposed topic 모두 삭제
  try {
    await db.proposedTopic.deleteMany();
    return Response.json({ success: true });
  } catch (error) {
    try {
      await db.proposedTopic.deleteMany();
    } catch (error) {
      return Response.json({ success: false, error }, { status: 500 });
    }
  }
}

/**
 *
 * this week topic, 토론방(메시지 포함) 모두 삭제
 */
export async function DELETE(req: NextRequest) {
  // upstash를 통한 요청만 허가
  const apiKey = req.headers.get("utora-apikey");
  if (apiKey !== process.env.UTORA_API_KEY!) {
    return Response.json(
      {
        success: false,
        error: "허가되지 않은 요청입니다.",
      },
      { status: 401 }
    );
  }

  // Delete all this week topics (with debate room)
  try {
    await db.thisWeekTopic.deleteMany();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
