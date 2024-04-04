"use server";

import db from "@/lib/db";

export async function getPost(id: number) {
  const post = await db.generalPost.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          nickname: true,
        },
      },
    },
  });
  return post;
}
