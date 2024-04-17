"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { EDebateRole, Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export type GetDebateMessagesType = Prisma.PromiseReturnType<
  typeof getDebateMessages
>;
export async function getDebateMessages(debateRoomId: string) {
  try {
    const messages = await db.debateMessage.findMany({
      where: {
        debate_room_id: debateRoomId,
      },
      select: {
        id: true,
        payload: true,
        created_at: true,
        debate_role: true,
        user_id: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return messages;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function saveDebateMessage(
  debateRoomId: string,
  message: string,
  debateRole: EDebateRole
) {
  const session = await getSession();
  try {
    await db.debateMessage.create({
      data: {
        payload: message,
        user_id: session.id,
        debate_room_id: debateRoomId,
        debate_role: debateRole,
      },
    });
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export type GetDebateSupportMessagesType = Prisma.PromiseReturnType<
  typeof getDebateSupportMessages
>;
export async function getDebateSupportMessages(debateRoomId: string) {
  try {
    const messages = await db.debateSupportMessage.findMany({
      where: {
        debate_room_id: debateRoomId,
      },
      select: {
        id: true,
        payload: true,
        created_at: true,
        debate_role: true,
        user_id: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return messages;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export type GetDebateCommentMessagesType = Prisma.PromiseReturnType<
  typeof getDebateSupportMessages
>;
export async function getDebateCommentMessages(debateRoomId: string) {
  try {
    const messages = await db.debateComment.findMany({
      where: {
        debate_room_id: debateRoomId,
      },
      select: {
        id: true,
        payload: true,
        created_at: true,
        debate_role: true,
        user_id: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return messages;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export type GetUserProfileType = Prisma.PromiseReturnType<
  typeof getUserProfile
>;
export async function getUserProfile() {
  const session = await getSession();
  try {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        nickname: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export type GetMyDebateRole = Prisma.PromiseReturnType<typeof getMyDebateRole>;
export async function getMyDebateRole(debateRoomId: string) {
  const session = await getSession();
  try {
    const debateRole = await db.joinedUserDebateRole.findUnique({
      where: {
        id: {
          user_id: session.id,
          debate_room_id: debateRoomId,
        },
      },
      select: {
        debate_role: true,
        debate_role_kr: true,
      },
    });
    return debateRole;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function saveMyDebateRole(
  debateRoomId: string,
  debateRole: EDebateRole,
  debateRoleKr: string
) {
  const session = await getSession();
  try {
    const myDebateRole = await db.joinedUserDebateRole.create({
      data: {
        user_id: session.id,
        debate_room_id: debateRoomId,
        debate_role: debateRole,
        debate_role_kr: debateRoleKr,
      },
      select: {
        debate_role: true,
        debate_role_kr: true,
      },
    });
    return myDebateRole;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export type GetDebateRoomTopicInfoType = Prisma.PromiseReturnType<
  typeof getDebateRoomTopicInfo
>;
export async function getDebateRoomTopicInfo(debateRoomId: string) {
  try {
    const debateRoom = await db.debateRoom.findUnique({
      where: {
        id: debateRoomId,
      },
      select: {
        this_week_topic: {
          select: {
            topic: true,
            propose_reason: true,
          },
        },
      },
    });
    return debateRoom?.this_week_topic;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
