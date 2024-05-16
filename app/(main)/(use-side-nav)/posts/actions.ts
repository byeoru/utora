"use server";

import { POSTS_FETCH_SIZE } from "@/lib/constants";
import db from "@/lib/db";
import { EPostCategory, Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { PostOrderByType } from "./page";

export type GetPostsType = Prisma.PromiseReturnType<typeof getPosts>;
export async function getPosts(
  category: EPostCategory,
  page: number,
  orderBy: PostOrderByType
) {
  try {
    let orderByObj = {};
    switch (orderBy) {
      case "latest":
        orderByObj = { created_at: "desc" };
        break;
      case "popular":
        orderByObj = { like_count: "desc" };
        break;
      case "views":
        orderByObj = { views: "desc" };
        break;
    }

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
        comment_count: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: orderByObj,
      take: POSTS_FETCH_SIZE,
      skip: (page - 1) * POSTS_FETCH_SIZE,
    });
    return posts;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function getPostsCount(category: EPostCategory) {
  try {
    const count = await db.post.count({
      where: {
        category,
      },
    });
    return count;
  } catch (error) {
    console.error("getPostsCount", error);
    return notFound();
  }
}
