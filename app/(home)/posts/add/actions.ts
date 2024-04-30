"use server";

import db from "@/lib/db";
import { postSchema } from "./schema";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function post(formData: FormData) {
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
  const validation = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    postCategory:
      formData.get("postCategory") === "none"
        ? null
        : formData.get("postCategory"),
  });

  if (!validation.success) {
    return validation.error.flatten();
  }

  try {
    const post = await db.post.create({
      data: {
        title: validation.data.title,
        content: validation.data.content,
        category: validation.data.postCategory!,
        user: {
          connect: {
            id: session.id,
          },
        },
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
