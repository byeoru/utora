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
    <div key={id} className="w-full py-5 rounded-lg flex gap-3 justify-between">
      <div className="flex flex-col gap-1 items-center">
        <div className="size-11 bg-slate-200 rounded-full"></div>
        <span className="text-sm font-jua">{nickname ?? "탈퇴한 이용자"}</span>
      </div>
      <div className="flex-1 p-2 font-notoKr text-sm font-semibold bg-slate-200 rounded-md">
        <span>{content}</span>
      </div>
      <div className="flex flex-col text-xs font-jua gap-2">
        <span className="">{formatToTimeAgo(createdAt)}</span>
        {sessionId === commentUserId ? (
          <button
            onClick={async () => await onDelete(id)}
            className="text-red-400 p-1"
          >
            삭제
          </button>
        ) : null}
      </div>
    </div>
  );
}
