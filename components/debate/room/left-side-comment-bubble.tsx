import { DELETED_ACCOUNT_NICKNAME } from "@/lib/constants";
import { formatToTimeAgo } from "@/lib/utils";

interface LeftSideCommentBubblePropsType {
  nickname?: string;
  createdAt: Date;
  payload: string;
}

export default function LeftSideCommentBubble({
  nickname,
  createdAt,
  payload,
}: LeftSideCommentBubblePropsType) {
  return (
    <div className="flex flex-col p-1 mr-24 gap-1">
      <span className="py-1 flex font-jua text-xs gap-2 rounded-sm">
        <span className="text-slate-600">
          {nickname ?? DELETED_ACCOUNT_NICKNAME}
        </span>
        <span className="text-slate-500">{formatToTimeAgo(createdAt)}</span>
      </span>
      <span className="flex">
        <span className="text-xs py-2 px-3 bg-white ring-1 ring-slate-300 shadow-md rounded-md font-notoKr font-semibold">
          {payload}
        </span>
      </span>
    </div>
  );
}
