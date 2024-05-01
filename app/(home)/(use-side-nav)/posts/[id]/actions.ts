"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { FETCH_COMMENTS_SIZE } from "@/lib/constants";
import { notFound } from "next/navigation";
import { comment } from "./schema";

export type GetPostType = Prisma.PromiseReturnType<typeof getPost>;
export async function getPost(postId: number) {
  const session = await getSession();
  try {
    const post = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        post_reactions: {
          where: {
            user_id_copy: session.id,
          },
        },
        user: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    return notFound();
  }
}

export type LikePostType = Prisma.PromiseReturnType<typeof likePost>;
export async function likePost(postId: number) {
  const session = await getSession();
  try {
    await db.postReaction.create({
      data: {
        user_id: session.id,
        user_id_copy: session.id,
        post_id: postId,
        reaction: "like",
      },
    });
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        like_count: {
          increment: 1,
        },
      },
    });
  } catch (error) {}
}

export type CancelLikePostType = Prisma.PromiseReturnType<
  typeof cancelLikePost
>;
export async function cancelLikePost(postId: number) {
  const session = await getSession();
  try {
    await db.postReaction.delete({
      where: {
        id: {
          user_id_copy: session.id,
          post_id: postId,
        },
      },
    });
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        like_count: {
          increment: -1,
        },
      },
    });
  } catch (error) {}
}

export type DislikePostType = Prisma.PromiseReturnType<typeof dislikePost>;
export async function dislikePost(postId: number) {
  const session = await getSession();
  try {
    await db.postReaction.create({
      data: {
        user_id: session.id,
        user_id_copy: session.id,
        post_id: postId,
        reaction: "dislike",
      },
    });
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        dislike_count: {
          increment: 1,
        },
      },
    });
  } catch (error) {}
}

export type CancelDislikePostType = Prisma.PromiseReturnType<
  typeof cancelDislikePost
>;
export async function cancelDislikePost(postId: number) {
  const session = await getSession();
  try {
    await db.postReaction.delete({
      where: {
        id: {
          user_id_copy: session.id,
          post_id: postId,
        },
      },
    });
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        dislike_count: {
          increment: -1,
        },
      },
    });
  } catch (error) {}
}

export type SaveCommentType = Prisma.PromiseReturnType<typeof saveComment>;
export async function saveComment(formData: FormData, postId: number) {
  const validation = comment.safeParse(formData.get("comment"));
  const session = await getSession();
  if (!validation.success) {
    return {
      ...validation.error.formErrors,
      comment: null,
    };
  }
  try {
    const comment = await db.postComment.create({
      data: {
        content: validation.data,
        post_id: postId,
        user_id: session.id,
      },
      select: {
        id: true,
        user_id: true,
        content: true,
        created_at: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    return {
      formErrors: null,
      comment,
    };
  } catch (error) {
    return null;
  }
}

export interface CommentsType {
  id: number;
  content: string;
  created_at: Date;
  user_id: number | null;
  user: {
    nickname: string;
  } | null;
}
export async function getComments(postId: number, pageCount: number) {
  try {
    const comments = await db.postComment.findMany({
      where: {
        post_id: postId,
      },
      select: {
        id: true,
        content: true,
        created_at: true,
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
      skip: pageCount * FETCH_COMMENTS_SIZE,
      take: FETCH_COMMENTS_SIZE,
    });
    return comments;
  } catch (error) {
    return null;
  }
}

export async function deleteComment(commentId: number) {
  try {
    const comment = await db.postComment.delete({
      where: {
        id: commentId,
      },
      select: {
        id: true,
      },
    });
    return Boolean(comment);
  } catch (error) {
    return false;
  }
}
