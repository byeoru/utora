import { DELETED_ACCOUNT_NICKNAME } from "@/lib/constants";
import { formatToTimeAgo } from "@/lib/utils";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { EPostCategory } from "@prisma/client";
import { EyeIcon, MessageSquareText } from "lucide-react";
import Link from "next/link";

interface PostItemPropsType {
  postId: number;
  title: string;
  nickname?: string;
  views: number;
  category: EPostCategory;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
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
  commentCount,
  createdAt,
  currentPage,
}: PostItemPropsType) {
  const newQuery = new URLSearchParams();
  newQuery.set("category", category);
  newQuery.set("page", currentPage.toString());
  return (
    <Link
      href={`/posts/${postId}?${newQuery}`}
      className="w-full border-b flex odd:bg-gray-100"
    >
      <div className="w-full flex">
        <div className="p-2 bg-emerald-400 font-doHyeon text-sm flex justify-center items-center"></div>
        <div className="flex flex-1 flex-col p-2.5 pr-0 gap-1">
          <h2 className="w-full text-sm font-notoKr font-semibold text-ellipsis overflow-hidden break-words line-clamp-1">
            {title}
          </h2>
          <div className="flex items-center font-jua text-xs">
            <span className="px-1 flex-1 text-ellipsis text-slate-500 overflow-hidden break-all line-clamp-1">
              | 작성자: {nickname ?? DELETED_ACCOUNT_NICKNAME}
            </span>
            <div className="min-w-12 sm:min-w-20 flex items-center gap-1 text-slate-500">
              <EyeIcon className="size-4" />
              <span>{views}</span>
            </div>
            <div className="min-w-12 sm:min-w-20 flex items-center gap-1 text-slate-500">
              <MessageSquareText className="size-4" />
              <span>{commentCount}</span>
            </div>
            <span className="text-slate-400 min-w-14">
              {formatToTimeAgo(createdAt)}
            </span>
          </div>
        </div>
        <div className="flex flex-col px-3 gap-1 justify-center font-jua">
          <div className="min-w-12 flex justify-between items-center gap-1">
            <HandThumbUpIcon className="size-4 text-red-400" />
            <span className="text-xs text-slate-500">{likeCount}</span>
          </div>
          <div className="min-w-12 flex justify-between items-center gap-1">
            <HandThumbDownIcon className="size-4 text-blue-400" />
            <span className="text-xs text-slate-500">{dislikeCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
