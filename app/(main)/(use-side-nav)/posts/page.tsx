"use client";

import { postCategories } from "@/lib/constants";
import { EPostCategory } from "@prisma/client";
import { SquareChevronRight } from "lucide-react";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import PostPagination from "@/components/post/post-pagination";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const orderBy = {
  latest: "최신순",
  popular: "인기순",
  views: "조회순",
};

export type PostOrderByType = keyof typeof orderBy;

export interface PostStateType {
  categoryState: EPostCategory;
  pageState: number;
  orderByState: PostOrderByType;
}

export default function Posts({
  searchParams,
}: {
  searchParams: {
    category: EPostCategory;
    page: number;
    orderby: PostOrderByType;
  };
}) {
  const initCategory: EPostCategory = searchParams.category ?? "general";
  const initPage: number = searchParams.page ?? 1;
  const initOrderBy: PostOrderByType = searchParams.orderby ?? "latest";

  const [state, setState] = useState<PostStateType>({
    categoryState: initCategory,
    pageState: initPage,
    orderByState: initOrderBy,
  });
  const query = useSearchParams();

  const onCategoryChange = (category: EPostCategory) => {
    const newQuery = new URLSearchParams();
    newQuery.set("category", category);
    window.history.pushState(null, "", `?${newQuery}`);
    setState({
      orderByState: "latest",
      categoryState: category,
      pageState: 1,
    });
  };

  const onOrderByChange = (orderBy: PostOrderByType) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set("orderby", orderBy);
    newQuery.set("page", "1");
    window.history.pushState(null, "", `?${newQuery}`);
    setState((prev) => ({
      orderByState: orderBy,
      categoryState: prev.categoryState,
      pageState: 1,
    }));
  };

  const onPageChange = (page: number) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set("page", page.toString());
    window.history.pushState(null, "", `?${newQuery}`);
    // 화면 최상단으로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });

    setState((prev) => ({
      orderByState: prev.orderByState,
      categoryState: prev.categoryState,
      pageState: page,
    }));
  };

  return (
    <div className="h-full flex flex-col m-auto max-w-screen-lg">
      <div className="flex flex-col p-1 pb-2 gap-1 shadow-sm">
        <div className="flex justify-between items-center gap-2">
          <div className="flex gap-5">
            <span className="font-jua text-lg">| 게시판</span>
            <div className="flex gap-2 text-sm font-semibold bg-slate-500 rounded-md px-3">
              <button
                onClick={() => onOrderByChange("latest")}
                disabled={state.orderByState === "latest"}
                className={`${
                  state.orderByState === "latest"
                    ? "text-green-400 underline decoration-dotted underline-offset-4"
                    : "text-slate-200"
                }`}
              >
                {orderBy.latest}
              </button>
              <button
                onClick={() => onOrderByChange("popular")}
                disabled={state.orderByState === "popular"}
                className={`${
                  state.orderByState === "popular"
                    ? "text-green-400 underline decoration-dotted underline-offset-4"
                    : "text-slate-200"
                }`}
              >
                {orderBy.popular}
              </button>
              <button
                onClick={() => onOrderByChange("views")}
                disabled={state.orderByState === "views"}
                className={`${
                  state.orderByState === "views"
                    ? "text-green-400 underline decoration-dotted underline-offset-4"
                    : "text-slate-200"
                }`}
              >
                {orderBy.views}
              </button>
            </div>
          </div>
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
                onClick={() => onCategoryChange(category as EPostCategory)}
                className={`flex justify-center items-center border px-2 py-1 shadow-sm rounded-md text-sm font-notoKr font-bold ${
                  state.categoryState === category
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
      <PostPagination state={state} onPageChange={onPageChange} />
    </div>
  );
}
