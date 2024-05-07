import { formatToTimeAgo } from "@/lib/utils";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { EPostCategory } from "@prisma/client";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

interface PostItemPropsType {
  postId: number;
  title: string;
  nickname: string;
  views: number;
  category: EPostCategory;
  likeCount: number;
  dislikeCount: number;
  createdAt: Date;
  currentPage: number;
}

export default function PostItem({
  postId,
  title,
  nickname,
  views,
  category,
  likeCount,
  dislikeCount,
  createdAt,
  currentPage,
}: PostItemPropsType) {
  const newQuery = new URLSearchParams();
  newQuery.set("category", category);
  newQuery.set("page", currentPage.toString());
  return (
    <Link
      key={postId}
      href={`/posts/${postId}?${newQuery}`}
      className="w-full border-b p-3 flex gap-2"
    >
      <div className="flex flex-1 flex-col gap-1 font-notoKr">
        <h2 className="w-full text-sm font-semibold text-ellipsis overflow-hidden break-words line-clamp-1">
          {title}
        </h2>
        <div className="flex gap-5 items-center text-xs font-jua text-slate-500">
          <span className="px-1">| 작성자: {nickname}</span>
          <div className="flex items-center gap-1 text-slate-500">
            <EyeIcon className="size-4" />
            <span>{views}</span>
          </div>
          <span className="">{formatToTimeAgo(createdAt)}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between font-jua">
        <div className="w-10 flex justify-between items-center gap-1">
          <HandThumbUpIcon className="size-4 text-red-400" />
          <span className="text-xs text-slate-500">{likeCount}</span>
        </div>
        <div className="w-10 flex justify-between items-center gap-1">
          <HandThumbDownIcon className="size-4 text-blue-400" />
          <span className="text-xs text-slate-500">{dislikeCount}</span>
        </div>
      </div>
    </Link>
  );
}