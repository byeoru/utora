import { formatToTimeAgo } from "@/lib/utils";

interface CommentItemPropsType {
  id: number;
  commentUserId: number | null;
  sessionId: number;
  nickname?: string;
  content: string;
  createdAt: Date;
  onDelete: Function;
}

export default function CommentItem({
  id,
  commentUserId,
  sessionId,
  nickname,
  content,
  createdAt,
  onDelete,
}: CommentItemPropsType) {
  return (
    <div key={id} className="w-full py-2 rounded-lg flex gap-2 justify-between">
      <div className="flex flex-col gap-1 items-center">
        <div className="size-7 sm:size-9 bg-slate-200 rounded-full"></div>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center gap-2 font-jua">
          <span className="text-sm">{nickname ?? "@탈퇴한 계정"}</span>
          <span className="text-xs text-slate-400">
            {formatToTimeAgo(createdAt)}
          </span>
        </div>
        <span className="text-sm font-notoKr">{content}</span>
      </div>
      <div className="flex flex-col text-xs font-jua">
        {sessionId === commentUserId ? (
          <button
            onClick={async () => await onDelete(id)}
            className="text-red-400"
          >
            삭제
          </button>
        ) : null}
      </div>
    </div>
  );
}
