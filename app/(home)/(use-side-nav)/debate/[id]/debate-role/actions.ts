"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { EDebateRole } from "@prisma/client";
import { notFound } from "next/navigation";

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
