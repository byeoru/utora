"use server";

import db from "@/lib/db";
import { postSchema } from "./schema";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function post(formData: FormData) {
  const session = await getSession();
  console.log(`sessionId: ${session.id}`);

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
  });

  if (!validation.success) {
    return validation.error.flatten();
  }

  const post = await db.generalPost.create({
    data: {
      title: validation.data.title,
      content: validation.data.content,
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
  redirect(`/posts/${post.id}`);
}
