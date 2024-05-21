"use client";

import { useEffect, useState } from "react";
import PostItem from "./post-item";
import {
  GetPostsType,
  getPosts,
  getPostsCount,
} from "@/app/(main)/(use-side-nav)/posts/actions";
import { Pagination } from "@nextui-org/react";
import { POSTS_FETCH_SIZE } from "@/lib/constants";
import { PostStateType } from "@/app/(main)/(use-side-nav)/posts/page";
import BlankPostItem from "./blank-post-item";

interface PostPaginationPropsType {
  state: PostStateType;
  onPageChange: (page: number) => void;
}

export default function PostPagination({
  state,
  onPageChange,
}: PostPaginationPropsType) {
  const [postsState, setPostsState] = useState<GetPostsType>();
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0);
  const fetchPosts = async () => {
    const posts = await getPosts(
      state.categoryState,
      state.pageState,
      state.orderByState
    );
    setPostsState(posts);
  };
  const getTotalPostsCount = async () => {
    const count = await getPostsCount(state.categoryState);
    setTotalPagesCount(Math.ceil(count / POSTS_FETCH_SIZE));
  };
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  useEffect(() => {
    getTotalPostsCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.categoryState]);
  return (
    <div className="flex flex-col">
      <ul className="flex flex-col">
        {postsState?.map((post) => (
          <PostItem
            key={`post-${post.id}`}
            postId={post.id}
            title={post.title}
            nickname={post.user?.nickname}
            views={post.views}
            category={state.categoryState}
            likeCount={post.like_count}
            dislikeCount={post.dislike_count}
            commentCount={post.comment_count}
            createdAt={post.created_at}
            currentPage={state.pageState}
          />
        ))}
        {Array.from(
          { length: POSTS_FETCH_SIZE - (postsState?.length ?? 0) },
          (_, index) => (
            <BlankPostItem key={`blank-${index}`} />
          )
        )}
      </ul>
      {totalPagesCount > 0 ? (
        <div className="flex justify-center">
          <Pagination
            classNames={{ base: "m-1 p-0" }}
            size="sm"
            isCompact
            total={totalPagesCount}
            showControls
            showShadow
            initialPage={1}
            color="success"
            page={state.pageState}
            onChange={onPageChange}
          />
        </div>
      ) : null}
    </div>
  );
}
