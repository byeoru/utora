"use client";

import { postCategories } from "@/lib/constants";
import { EPostCategory } from "@prisma/client";
import { SquareChevronRight } from "lucide-react";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import PostPagination from "@/components/post/post-pagination";
import { useEffect, useState } from "react";

export default function Posts({
  searchParams,
}: {
  searchParams: { category: EPostCategory };
}) {
  const initCategory: EPostCategory = searchParams.category ?? "general";
  const [categoryState, setCategoryState] =
    useState<EPostCategory>(initCategory);
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
                className={`flex justify-center items-center border px-2 py-1 shadow-sm rounded-md text-sm font-notoKr font-bold ${
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
      <PostPagination category={categoryState} />
    </div>
  );
}
