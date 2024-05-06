"use server";

import getSession from "@/lib/session";
import { editPostSchema } from "./schema";
import db from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

export type GetMyPostType = Prisma.PromiseReturnType<typeof getMyPost>;
export async function getMyPost(postId: number) {
  const session = await getSession();
  try {
    const post = await db.post.findUnique({
      where: {
        id: postId,
        user_id: session.id,
      },
      select: {
        title: true,
        category: true,
        content: true,
      },
    });
    return post;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Prisma가 인식하는 특정 오류 코드에 대한 처리
      console.error("Known Prisma Error", error);
    } else {
      // Prisma가 알 수 없는 다른 종류의 오류 처리
      console.error("Unknown Prisma Error:", error);
    }
    return null;
  }
}

export async function editPost(formData: FormData, postId: number) {
  const session = await getSession();

  if (!session.id) {
    return {
      fieldErrors: null,
      error: {
        status: 401,
        message: "로그인되지 않은 사용자입니다.",
      },
    };
  }
  const validation = editPostSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validation.success) {
    return validation.error.flatten();
  }

  try {
    const post = await db.post.update({
      where: {
        id: postId,
        user_id: session.id,
      },
      data: {
        content: validation.data.content,
      },
      select: {
        id: true,
      },
    });
    return { post, fieldErrors: null };
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
