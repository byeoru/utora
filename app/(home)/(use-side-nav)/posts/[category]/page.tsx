import { postCategories } from "@/lib/constants";
import { EPostCategory } from "@prisma/client";
import {
  ChevronDown,
  ChevronUp,
  EyeIcon,
  SquareChevronRight,
} from "lucide-react";
import Link from "next/link";
import { getPosts } from "./actions";
import { formatToTimeAgo } from "@/lib/utils";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default async function PostCategory({
  params,
}: {
  params: { category: EPostCategory };
}) {
  const posts = await getPosts(params.category);
  return (
    <div className="flex flex-col m-auto max-w-screen-lg">
      <div className="flex flex-col p-1 pb-2 gap-1 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-jua text-lg">| 게시판</span>
          <Link href="/posts/add">
            <PencilSquareIcon className="size-6 bg-emerald-500 text-white rounded-md p-0.5" />
          </Link>
        </div>
        <div className="flex items-center">
          <span className=" bg-emerald-500 p-1 rounded-md">
            <SquareChevronRight className="size-6 text-white" />
          </span>
          <div className="p-1 text-nowrap overflow-x-auto flex gap-1 scrollbar-hide transition-colors">
            {Object.keys(postCategories).map((category, index) => (
              <Link
                href={`/posts/${category}`}
                className={`flex justify-center items-center px-2 py-1 shadow-md rounded-md text-sm font-notoKr font-bold ${
                  params.category === category
                    ? "text-white bg-emerald-500"
                    : "text-black"
                }`}
                key={index}
              >
                {postCategories[category].title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ul className="flex flex-col p-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${params.category}/${post.id}`}
            className="w-full font-notoKr border-b p-3 flex gap-2"
          >
            <div className="flex flex-1 flex-col gap-1 font-notoKr">
              <h2 className="text-sm font-semibold">{post.title}</h2>
              <span className="text-xs px-2">
                | 작성자: {post.user.nickname}
              </span>
            </div>
            <div className="flex flex-col items-end text-xs font-doHyeon gap-1">
              <div className="flex gap-1 text-slate-500">
                <EyeIcon className="size-4" />
                <span>{post.views}</span>
              </div>
              <span className="text-slate-500">
                {formatToTimeAgo(post.created_at)}
              </span>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <ChevronUp className="size-4 text-red-400" />
                  <span className="text-xs text-slate-500">
                    {post.like_count}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ChevronDown className="size-4 text-blue-400" />
                  <span className="text-xs text-slate-500">
                    {post.dislike_count}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
