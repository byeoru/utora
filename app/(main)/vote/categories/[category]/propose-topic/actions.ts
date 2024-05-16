"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { topicProposeSchema } from "./schema";

export async function createTopic(formData: FormData) {
  const validation = topicProposeSchema.safeParse({
    topic: formData.get("topic"),
    proposeReason: formData.get("proposeReason"),
    category: formData.get("category"),
    debateType: formData.get("debateType"),
  });

  if (!validation.success) {
    return validation.error.flatten();
  }

  const session = await getSession();
  try {
    // 이전에 발의한 주제 check;
    const myTopic = await db.proposedTopic.findFirst({
      where: {
        user_id: session.id,
        category: validation.data.category,
      },
      select: {
        id: true,
      },
    });
    if (myTopic) {
      return;
    }

    await db.proposedTopic.create({
      data: {
        topic: validation.data.topic,
        propose_reason: validation.data.proposeReason,
        user: {
          // session id는 존재하지만 db table에는 삭제되었을 경우를 대비
          connect: {
            id: session.id,
          },
        },
        category: validation.data.category,
        debate_type: validation.data.debateType,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Prisma가 인식하는 특정 오류 코드에 대한 처리
      if (error.code === "P2025") {
        // User table과 connect에 실패한 경우
        session.destroy();
        return notFound();
      }
    } else {
      // Prisma가 알 수 없는 다른 종류의 오류 처리
      console.error("Unknown Prisma Error:", error);
    }
  }
}
