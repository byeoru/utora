"use server";

import { DEBATE_ROOM_MSG_FETCH_SIZE } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { EDebateRole, EEvaluation, Prisma } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

export type GetDebateMessagesType = Prisma.PromiseReturnType<
  typeof getDebateMessages
>;
export async function getDebateMessages(debateRoomId: string, page: number) {
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
        debate_role_kr: true,
        user_id: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: DEBATE_ROOM_MSG_FETCH_SIZE,
      skip: (page - 1) * DEBATE_ROOM_MSG_FETCH_SIZE,
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
  debateRole: EDebateRole,
  debateRoleKr: string
) {
  // debater가 아닐 경우
  if (debateRole !== "Opponent" && debateRole !== "Proponent") {
    return;
  }
  const session = await getSession();
  try {
    await db.debateMessage.create({
      data: {
        payload: message,
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

export type GetDebateSupportMessagesType = Prisma.PromiseReturnType<
  typeof getDebateSupportMessages
>;
export async function getDebateSupportMessages(
  debateRoomId: string,
  page: number
) {
  const getSupportMessageRole = (myDebateRole: EDebateRole) => {
    switch (myDebateRole) {
      case "Proponent":
      case "ProponentSupporter":
        return [
          { debate_role: EDebateRole.Proponent },
          { debate_role: EDebateRole.ProponentSupporter },
        ];
      case "Opponent":
      case "OpponentSupporter":
        return [
          { debate_role: EDebateRole.Opponent },
          { debate_role: EDebateRole.OpponentSupporter },
        ];
    }
  };
  const session = await getSession();
  try {
    const myDebateRole = await db.joinedUserDebateRole.findUnique({
      where: {
        id: {
          user_id: session.id,
          debate_room_id: debateRoomId,
        },
      },
      select: {
        debate_role: true,
      },
    });
    if (!myDebateRole) {
      return [];
    }
    const messages = await db.debateSupportMessage.findMany({
      where: {
        debate_room_id: debateRoomId,
        OR: getSupportMessageRole(myDebateRole.debate_role),
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
        created_at: "desc",
      },
      take: DEBATE_ROOM_MSG_FETCH_SIZE,
      skip: (page - 1) * DEBATE_ROOM_MSG_FETCH_SIZE,
    });
    return messages;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function saveDebateSupportMessage(
  debateRoomId: string,
  message: string,
  debateRole: EDebateRole
) {
  const session = await getSession();
  try {
    await db.debateSupportMessage.create({
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

export type GetDebateCommentMessagesType = Prisma.PromiseReturnType<
  typeof getDebateCommentMessages
>;
export async function getDebateCommentMessages(
  debateRoomId: string,
  page: number
) {
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
        created_at: "desc",
      },
      take: DEBATE_ROOM_MSG_FETCH_SIZE,
      skip: (page - 1) * DEBATE_ROOM_MSG_FETCH_SIZE,
    });
    return messages;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function saveDebateCommentMessage(
  debateRoomId: string,
  message: string,
  debateRole: EDebateRole
) {
  const session = await getSession();
  try {
    await db.debateComment.create({
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

export type GetMyDebateRoleType = Prisma.PromiseReturnType<
  typeof getMyDebateRole
>;
export async function getMyDebateRole(debateRoomId: string) {
  const session = await getSession();
  // 로그인을 하지 않고 토론방 입장할 경우
  if (!session.id) {
    return redirect("/login");
  }
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

export type GetDebateRoomInfoType = Prisma.PromiseReturnType<
  typeof getDebateRoomInfo
>;
export async function getDebateRoomInfo(debateRoomId: string) {
  const session = await getSession();
  try {
    const debateRoom = await db.debateRoom.findUnique({
      where: {
        id: debateRoomId,
      },
      select: {
        status: true,
        created_at: true,
        this_week_topic: {
          select: {
            topic: true,
            propose_reason: true,
          },
        },
        debate_evaluation_ballets: {
          where: {
            user_id_copy: session.id,
            debate_room_id: debateRoomId,
          },
          select: {
            evaluation: true,
          },
        },
      },
    });
    return debateRoom;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function evaluateDebate(
  debateRoomId: string,
  evaluationBallet: EEvaluation
) {
  const session = await getSession();
  try {
    const debateRoom = await db.debateRoom.findUnique({
      where: {
        id: debateRoomId,
      },
      select: {
        id: true,
        status: true,
        joined_user_debate_roles: {
          where: {
            user_id: session.id,
          },
          select: {
            debate_role: true,
            user: {
              select: {
                age_group: true,
                gender: true,
              },
            },
          },
        },
      },
    });
    // 현재 평가 상태인지 check
    if (debateRoom?.status !== "under_evaluation") {
      return {
        evaluation: null,
        error: "현재는 토론 평가 중이 아닙니다.",
      };
    }
    // user가 관중인지 check
    if (
      debateRoom.joined_user_debate_roles.length <= 0 ||
      debateRoom.joined_user_debate_roles[0].debate_role !== "Audience"
    ) {
      return {
        evaluation: null,
        error: "토론 평가는 관중만 참여 가능합니다.",
      };
    }
    // 성별, 나이가 null인지 체크
    if (
      !debateRoom.joined_user_debate_roles[0].user.gender ||
      !debateRoom.joined_user_debate_roles[0].user.age_group
    ) {
      return {
        evaluation: null,
        error: "성별 또는 나이가 설정되어 있지 않습니다.",
      };
    }
    const result = await db.debateEvaluationBallet.create({
      data: {
        user_id: session.id,
        user_id_copy: session.id,
        debate_room_id: debateRoom.id,
        gender: debateRoom.joined_user_debate_roles[0].user.gender,
        age_group: debateRoom.joined_user_debate_roles[0].user.age_group,
        evaluation: evaluationBallet,
      },
      select: {
        evaluation: true,
      },
    });
    return {
      evaluation: result.evaluation,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
