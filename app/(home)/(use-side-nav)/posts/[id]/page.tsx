import { notFound } from "next/navigation";
import {
  cancelDislikePost,
  cancelLikePost,
  dislikePost,
  getPost,
  likePost,
} from "./actions";
import { formatToTimeAgo } from "@/lib/utils";
import Divider from "@/components/divider";
import { EyeIcon } from "@heroicons/react/24/outline";
import LikeDislikeGroup from "@/components/post/like-dislike-group";
import CommentGroup from "@/components/post/comment-group";
import getSession from "@/lib/session";
import { postCategories } from "@/lib/constants";
import Link from "next/link";
import DeletePostButton from "@/components/post/delete-post-button";

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const post = await getPost(id);
  const session = await getSession();
  return (
    <>
      <div className="w-full px-2 py-1 border-b-2 border-slate-200 bg-utora-primary shadow-md block">
        <h1 className="font-jua mx-auto text-lg sm:text-xl max-w-screen-lg">
          {`${postCategories[post.category].title} 게시판`}
        </h1>
      </div>
      <div className="max-w-screen-lg m-auto flex md:gap-2">
        <div className="w-full flex flex-col gap-1">
          <div className="flex flex-col gap-7 p-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-notoKr">{post.title}</h2>
              <div className="text-sm flex gap-5 text-gray-500">
                <span>{`작성자: ${post.user.nickname}`}</span>
                <span>|</span>
                <span>{formatToTimeAgo(post.created_at)}</span>
                <span>|</span>
                <span className="flex items-center gap-2">
                  <EyeIcon className="size-4" />
                  <span>{post.views}</span>
                </span>
              </div>
              {session.id === post.user_id ? (
                <div className="self-end flex gap-2 text-sm">
                  <Link
                    href={`/posts/${params.id}/edit`}
                    className="text-red-500"
                  >
                    수정
                  </Link>
                  <DeletePostButton postId={id} />
                </div>
              ) : null}
            </div>
            <Divider />
            <div
              className="prose prose-sm sm:prose-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <div className="flex flex-col p-5 gap-3">
            <Divider />
            <LikeDislikeGroup
              className="self-end"
              isLiked={
                post.post_reactions.filter(
                  (reaction) => reaction.reaction === "like"
                ).length > 0
              }
              isDisliked={
                post.post_reactions.filter(
                  (reaction) => reaction.reaction === "dislike"
                ).length > 0
              }
              likeCount={post.like_count}
              dislikeCount={post.dislike_count}
              postId={post.id}
              onLikeClick={likePost}
              onCancelLikeClick={cancelLikePost}
              onDislikeClick={dislikePost}
              onCancelDislikeClick={cancelDislikePost}
            />
          </div>
          <CommentGroup
            sessionId={session.id}
            commentsCount={post._count.comments}
            postId={post.id}
          />
        </div>
      </div>
    </>
  );
}
