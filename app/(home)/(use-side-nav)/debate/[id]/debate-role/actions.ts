"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { EDebateRole } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

export async function saveMyDebateRole(
  debateRoomId: string,
  debateRole: EDebateRole,
  debateRoleKr: string
) {
  const session = await getSession();
  try {
    await db.joinedUserDebateRole.create({
      data: {
        user_id: session.id,
        debate_room_id: debateRoomId,
        debate_role: debateRole,
        debate_role_kr: debateRoleKr,
      },
    });
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function getMyRoleWithRoomStatus(debateRoomId: string) {
  const session = await getSession();
  // 로그인을 하지 않고 토론방 입장할 경우
  if (!session.id) {
    return redirect("/login");
  }
  try {
    const info = await db.debateRoom.findUnique({
      where: {
        id: debateRoomId,
      },
      select: {
        status: true,
        joined_user_debate_roles: {
          where: {
            user_id: session.id,
            debate_room_id: debateRoomId,
          },
          select: {
            debate_role: true,
            debate_role_kr: true,
          },
        },
      },
    });
    return info;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
