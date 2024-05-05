"use client";

import { postCategories } from "@/lib/constants";
import { EPostCategory } from "@prisma/client";
import { EyeIcon, SquareChevronRight } from "lucide-react";
import Link from "next/link";
import { GetPostsType, getPosts } from "./actions";
import { formatToTimeAgo } from "@/lib/utils";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

export default function Posts({
  searchParams,
}: {
  searchParams: { category: EPostCategory };
}) {
  const initCategory: EPostCategory = searchParams.category ?? "general";
  const [categoryState, setCategoryState] =
    useState<EPostCategory>(initCategory);
  const [postsState, setPostsState] = useState<GetPostsType>();
  const { replace } = useRouter();
  const pathname = usePathname();
  const fetchPosts = async (category: EPostCategory) => {
    const newQuery = new URLSearchParams();
    newQuery.set("category", categoryState.toString());
    replace(`${pathname}?${newQuery}`);
    const posts = await getPosts(category);
    setPostsState(posts);
  };
  useEffect(() => {
    fetchPosts(categoryState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryState]);
  return (
    <div className="h-full flex flex-col m-auto max-w-screen-lg">
      <div className="flex flex-col p-1 pb-2 gap-1 shadow-sm">
        <div className="flex justify-between items-center gap-2">
          <span className="font-jua text-lg">| 게시판</span>
          <Link
            href="/posts/add"
            className="flex items-center bg-emerald-500 text-white rounded-md px-1 py-0.5 gap-2"
          >
            <PencilSquareIcon className="size-6" />
            <span className="text-sm font-notoKr font-semibold">글쓰기</span>
          </Link>
        </div>
        <div className="flex items-center">
          <span className=" bg-emerald-500 p-1 rounded-md">
            <SquareChevronRight className="size-6 text-white" />
          </span>
          <div className="p-1 text-nowrap overflow-x-auto flex gap-1 scrollbar-hide transition-colors">
            {Object.keys(postCategories).map((category, index) => (
              <button
                onClick={() => setCategoryState(category as EPostCategory)}
                className={`flex justify-center items-center px-2 py-1 shadow-sm rounded-md text-sm font-notoKr font-bold ${
                  categoryState === category
                    ? "text-white bg-emerald-500"
                    : "text-black"
                }`}
                key={index}
              >
                {postCategories[category].title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ul className="flex flex-col p-2 overflow-y-auto">
        {postsState?.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="w-full border-b p-3 flex gap-2"
          >
            <div className="flex flex-1 flex-col gap-1 font-notoKr">
              <h2 className="w-full text-sm font-semibold text-ellipsis overflow-hidden break-words line-clamp-1">
                {post.title}
              </h2>
              <div className="flex gap-5 items-center text-xs font-jua text-slate-500">
                <span className="px-1">| 작성자: {post.user.nickname}</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <EyeIcon className="size-4" />
                  <span>{post.views}</span>
                </div>
                <span className="">{formatToTimeAgo(post.created_at)}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between font-jua">
              <div className="w-10 flex justify-between items-center gap-1">
                <HandThumbUpIcon className="size-4 text-red-400" />
                <span className="text-xs text-slate-500">
                  {post.like_count}
                </span>
              </div>
              <div className="w-10 flex justify-between items-center gap-1">
                <HandThumbDownIcon className="size-4 text-blue-400" />
                <span className="text-xs text-slate-500">
                  {post.dislike_count}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
