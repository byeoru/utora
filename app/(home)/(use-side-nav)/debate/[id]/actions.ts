"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { EDebateRole, Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export type GetDebateRoomMessagesType = Prisma.PromiseReturnType<
  typeof getDebateRoomMessages
>;
export async function getDebateRoomMessages(debateRoomId: string) {
  try {
    const messages = await db.debateMessage.findMany({
      where: {
        debate_room_id: debateRoomId,
      },
      select: {
        id: true,
        payload: true,
        created_at: true,
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
        debateRole: true,
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
  debateRole: EDebateRole
) {
  const session = await getSession();
  try {
    const myDebateRole = await db.joinedUserDebateRole.create({
      data: {
        user_id: session.id,
        debate_room_id: debateRoomId,
        debateRole,
      },
      select: {
        debateRole: true,
      },
    });
    return myDebateRole;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
