import db from "@/lib/db";
import { NextRequest } from "next/server";

const getAllDebateRoomInfos = async () => {
  return await db.debateRoom.findMany({
    select: {
      id: true,
      this_week_topic: {
        select: {
          topic: true,
          propose_reason: true,
          user_id: true,
        },
      },
      _count: {
        select: {
          debate_messages: true,
          debate_support_messages: true,
        },
      },
    },
  });
};

const createArchive = async (
  title: string,
  propose_reason: string,
  proposer_id: number | null
) => {
  return await db.debateArchive.create({
    data: {
      title,
      propose_reason,
      proposer_id,
    },
    select: {
      id: true,
    },
  });
};

const getDebateMessages = async (debate_room_id: string, index: number) => {
  return await db.debateMessage.findMany({
    where: {
      debate_room_id,
    },
    select: {
      payload: true,
      user_id: true,
      debate_role: true,
      debate_role_kr: true,
    },
    take: BATCH_SIZE,
    skip: index * BATCH_SIZE,
  });
};

const getSupportMessages = async (debate_room_id: string, index: number) => {
  return await db.debateSupportMessage.findMany({
    where: {
      debate_room_id,
    },
    select: {
      payload: true,
      user_id: true,
      debate_role: true,
    },
    take: BATCH_SIZE,
    skip: index * BATCH_SIZE,
  });
};

const BATCH_SIZE = 50;

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

  try {
    const DebateRooms = await getAllDebateRoomInfos();

    DebateRooms.forEach(async (debateRoomInfo) => {
      // debate room => archive
      const debateArchive = await createArchive(
        debateRoomInfo.this_week_topic.topic,
        debateRoomInfo.this_week_topic.propose_reason,
        debateRoomInfo.this_week_topic.user_id
      );
      const debateMsgLoofCount = Math.ceil(
        debateRoomInfo._count.debate_messages / BATCH_SIZE
      );
      // debate messages => archive
      for (let index = 0; index < debateMsgLoofCount; index++) {
        // find debate messages
        const debateMessages = await getDebateMessages(
          debateRoomInfo.id,
          index
        );
        // move debate messages to archive
        await db.debateMessageArchive.createMany({
          data: debateMessages.map((debateMessage) => {
            return {
              payload: debateMessage.payload,
              proposer_id: debateMessage.user_id,
              debate_role: debateMessage.debate_role,
              debate_role_kr: debateMessage.debate_role_kr,
              debate_archive_id: debateArchive.id,
            };
          }),
        });
      }

      const supportMsgLoofCount = Math.ceil(
        debateRoomInfo._count.debate_support_messages / BATCH_SIZE
      );
      // support messages => archive
      for (let index = 0; index < supportMsgLoofCount; index++) {
        // find support messages
        const supportMessages = await getSupportMessages(
          debateRoomInfo.id,
          index
        );
        // move support messages to archive
        await db.debateSupportMessageArchive.createMany({
          data: supportMessages.map((debateMessage) => {
            return {
              payload: debateMessage.payload,
              proposer_id: debateMessage.user_id,
              debate_role: debateMessage.debate_role,
              debate_archive_id: debateArchive.id,
            };
          }),
        });
      }
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
