"use server";

import db from "@/lib/db";
import { EPostCategory, Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export type GetPostsType = Prisma.PromiseReturnType<typeof getPosts>;
export async function getPosts(category: EPostCategory) {
  try {
    const posts = await db.post.findMany({
      where: {
        category: category,
      },
      select: {
        id: true,
        title: true,
        created_at: true,
        like_count: true,
        dislike_count: true,
        views: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
