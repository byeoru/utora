"use client";

import { useEffect, useState } from "react";
import PostItem from "./post-item";
import {
  GetPostsType,
  getPosts,
  getPostsCount,
} from "@/app/(home)/(use-side-nav)/posts/actions";
import { EPostCategory } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Pagination } from "@nextui-org/react";
import { POSTS_FETCH_SIZE } from "@/lib/constants";

interface PostPaginationPropsType {
  category: EPostCategory;
}

export default function PostPagination({ category }: PostPaginationPropsType) {
  const [postsState, setPostsState] = useState<GetPostsType>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPagesCount, setTotalPagesCount] = useState<number>(1);
  const { replace } = useRouter();
  const pathname = usePathname();
  const fetchPosts = async (category: EPostCategory, page: number) => {
    const newQuery = new URLSearchParams();
    newQuery.set("category", category);
    replace(`${pathname}?${newQuery}`);
    const posts = await getPosts(category, page);
    setPostsState(posts);
  };
  const getTotalPostsCount = async () => {
    const count = await getPostsCount(category);
    setTotalPagesCount(Math.ceil(count / POSTS_FETCH_SIZE));
  };
  useEffect(() => {
    fetchPosts(category, currentPage);
    getTotalPostsCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, currentPage]);
  return (
    <div className="flex flex-col">
      <ul className="flex flex-col p-2">
        {postsState?.map((post) => (
          <PostItem
            key={post.id}
            postId={post.id}
            title={post.title}
            nickname={post.user.nickname}
            views={post.views}
            category={category}
            likeCount={post.like_count}
            dislikeCount={post.dislike_count}
            createdAt={post.created_at}
          />
        ))}
      </ul>
      <div className="w-full flex justify-center">
        <Pagination
          classNames={{ base: "m-1 p-0" }}
          size="sm"
          isCompact
          total={totalPagesCount}
          showControls
          showShadow
          initialPage={1}
          color="success"
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
