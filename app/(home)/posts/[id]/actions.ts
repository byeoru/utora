"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { comment } from "./schema";
import { Prisma } from "@prisma/client";
import { FETCH_COMMENTS_SIZE } from "@/lib/constants";

export async function getPost(postId: number) {
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
    return null;
  }
}

export async function getLikeDislikeStatus(postId: number) {
  const session = await getSession();
  try {
    const like = await db.postLike.findUnique({
      where: {
        id: {
          user_id: session.id,
          post_id: postId,
        },
      },
      select: {
        user_id: true,
      },
    });
    const dislike = await db.postDislike.findUnique({
      where: {
        id: {
          user_id: session.id,
          post_id: postId,
        },
      },
      select: {
        user_id: true,
      },
    });
    return {
      isLiked: Boolean(like),
      isDisliked: Boolean(dislike),
    };
  } catch (error) {
    return null;
  }
}

export async function likePost(postId: number) {
  const session = await getSession();
  try {
    await db.postLike.create({
      data: {
        user_id: session.id,
        post_id: postId,
      },
    });
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        like: {
          increment: 1,
        },
      },
    });
  } catch (error) {}
}

export async function cancelLikePost(postId: number) {
  const session = await getSession();
  try {
    await db.postLike.delete({
      where: {
        id: {
          user_id: session.id,
          post_id: postId,
        },
      },
    });
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        like: {
          increment: -1,
        },
      },
    });
  } catch (error) {}
}

export async function dislikePost(postId: number) {
  const session = await getSession();
  try {
    await db.postDislike.create({
      data: {
        user_id: session.id,
        post_id: postId,
      },
    });
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        dislike: {
          increment: 1,
        },
      },
    });
  } catch (error) {}
}

export async function cancelDislikePost(postId: number) {
  const session = await getSession();
  try {
    await db.postDislike.delete({
      where: {
        id: {
          user_id: session.id,
          post_id: postId,
        },
      },
    });
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        dislike: {
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
