"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { comment } from "./schema";
import { COMMENTS_FETCH_SIZE, MAX_COMMENT_INDENT } from "@/lib/constants";

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
        _count: {
          select: {
            comments: {
              where: {
                indent: 0,
              },
            },
          },
        },
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
      },
    });
    return post;
  } catch (error) {
    return notFound();
  }
}

export async function deletePost(postId: number) {
  const session = await getSession();
  try {
    await db.post.delete({
      where: {
        id: postId,
        user_id: session.id,
      },
    });
  } catch (error) {}
}

export type LikePostType = Prisma.PromiseReturnType<typeof likePost>;
export async function likePost(postId: number) {
  const session = await getSession();
  try {
    await db.$transaction([
      db.postReaction.create({
        data: {
          user_id: session.id,
          user_id_copy: session.id,
          post_id: postId,
          reaction: "like",
        },
      }),
      db.post.update({
        where: {
          id: postId,
        },
        data: {
          like_count: {
            increment: 1,
          },
        },
      }),
    ]);
  } catch (error) {}
}

export type CancelLikePostType = Prisma.PromiseReturnType<
  typeof cancelLikePost
>;
export async function cancelLikePost(postId: number) {
  const session = await getSession();
  try {
    await db.$transaction([
      db.postReaction.delete({
        where: {
          id: {
            user_id_copy: session.id,
            post_id: postId,
          },
        },
      }),
      db.post.update({
        where: {
          id: postId,
        },
        data: {
          like_count: {
            decrement: 1,
          },
        },
      }),
    ]);
  } catch (error) {}
}

export type DislikePostType = Prisma.PromiseReturnType<typeof dislikePost>;
export async function dislikePost(postId: number) {
  const session = await getSession();
  try {
    await db.$transaction([
      db.postReaction.create({
        data: {
          user_id: session.id,
          user_id_copy: session.id,
          post_id: postId,
          reaction: "dislike",
        },
      }),
      db.post.update({
        where: {
          id: postId,
        },
        data: {
          dislike_count: {
            increment: 1,
          },
        },
      }),
    ]);
  } catch (error) {}
}

export type CancelDislikePostType = Prisma.PromiseReturnType<
  typeof cancelDislikePost
>;
export async function cancelDislikePost(postId: number) {
  const session = await getSession();
  try {
    await db.$transaction([
      db.postReaction.delete({
        where: {
          id: {
            user_id_copy: session.id,
            post_id: postId,
          },
        },
      }),
      db.post.update({
        where: {
          id: postId,
        },
        data: {
          dislike_count: {
            decrement: 1,
          },
        },
      }),
    ]);
  } catch (error) {}
}

export type SaveCommentType = Prisma.PromiseReturnType<typeof saveComment>;
export async function saveComment(
  formData: FormData,
  postId: number,
  parentCommentId: number | null
) {
  const validation = comment.safeParse(formData.get("comment"));
  const session = await getSession();
  if (!validation.success) {
    return {
      ...validation.error.formErrors,
      comment: null,
    };
  }
  try {
    let parentIndent: number = -1;
    if (parentCommentId) {
      const parent = await db.postComment.findUnique({
        where: {
          id: parentCommentId,
        },
        select: {
          indent: true,
        },
      });
      if (!parent) {
        return null;
      }
      parentIndent = parent.indent;
    }

    if (parentIndent > MAX_COMMENT_INDENT - 1) {
      return null;
    }

    const [comment] = await db.$transaction([
      db.postComment.create({
        data: {
          content: validation.data,
          post_id: postId,
          user_id: session.id,
          parent_comment_id: parentCommentId,
          indent: parentIndent + 1,
        },
        select: {
          id: true,
          user_id: true,
          parent_comment_id: true,
          child_comments_count: true,
          is_deleted: true,
          indent: true,
          content: true,
          created_at: true,
          user: {
            select: {
              nickname: true,
            },
          },
        },
      }),
      ...(parentCommentId
        ? [
            db.postComment.update({
              where: {
                id: parentCommentId,
              },
              data: {
                child_comments_count: {
                  increment: 1,
                },
              },
            }),
          ]
        : []),
      db.post.update({
        where: {
          id: postId,
        },
        data: {
          comment_count: {
            increment: 1,
          },
        },
      }),
    ]);
    return {
      formErrors: null,
      comment,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export interface CommentsType {
  id: number;
  content: string | null;
  created_at: Date;
  user_id: number | null;
  is_deleted: boolean;
  parent_comment_id: number | null;
  child_comments_count: number;
  indent: number;
  user: {
    nickname: string;
  } | null;
}
export async function getComments(
  postId: number,
  page: number,
  parentCommentId: number | null
) {
  try {
    const comments = await db.postComment.findMany({
      where: {
        post_id: postId,
        parent_comment_id: parentCommentId,
      },
      select: {
        id: true,
        content: true,
        created_at: true,
        user_id: true,
        is_deleted: true,
        parent_comment_id: true,
        child_comments_count: true,
        indent: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      skip: (page - 1) * COMMENTS_FETCH_SIZE,
      take: COMMENTS_FETCH_SIZE,
    });
    return comments;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteComment(
  postId: number,
  commentId: number,
  parentCommentId: number | null
) {
  const session = await getSession();
  try {
    const comment = await db.postComment.findUnique({
      where: {
        id: commentId,
        parent_comment_id: parentCommentId,
      },
      select: {
        child_comments_count: true,
      },
    });
    if (!comment) {
      return null;
    }

    await db.$transaction([
      ...(comment.child_comments_count > 0
        ? [
            db.postComment.update({
              where: {
                id: commentId,
                user_id: session.id,
                parent_comment_id: parentCommentId,
              },
              data: {
                is_deleted: true,
                content: null,
              },
            }),
          ]
        : [
            db.postComment.delete({
              where: {
                id: commentId,
                user_id: session.id,
                parent_comment_id: parentCommentId,
              },
            }),
            ...(parentCommentId
              ? [
                  db.postComment.update({
                    where: {
                      id: parentCommentId,
                      post_id: postId,
                    },
                    data: {
                      child_comments_count: {
                        decrement: 1,
                      },
                    },
                  }),
                ]
              : []),
            db.post.update({
              where: {
                id: postId,
              },
              data: {
                comment_count: {
                  decrement: 1,
                },
              },
            }),
          ]),
    ]);
    return comment;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    db.$disconnect();
  }
}
