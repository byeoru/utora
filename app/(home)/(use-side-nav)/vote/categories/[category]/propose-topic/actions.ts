"use server";

import getSession from "@/lib/session";
import { topicProposeSchema } from "./schema";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createTopic(formData: FormData) {
  const validation = topicProposeSchema.safeParse({
    topic: formData.get("topic"),
    proposeReason: formData.get("proposeReason"),
    category: formData.get("category"),
  });

  if (!validation.success) {
    return validation.error.flatten();
  }

  const session = await getSession();
  try {
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
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Prisma가 인식하는 특정 오류 코드에 대한 처리
      console.log(error);
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
