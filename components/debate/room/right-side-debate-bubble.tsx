import { DELETED_ACCOUNT_NICKNAME } from "@/lib/constants";
import { formatToTimeAgo } from "@/lib/utils";

interface RightSideDebateBubblePropsType {
  debateRoleKr: string;
  nickname?: string;
  createdAt: Date;
  payload: string;
}

export default function RightSideDebateBubble({
  debateRoleKr,
  nickname,
  createdAt,
  payload,
}: RightSideDebateBubblePropsType) {
  return (
    <div className="flex flex-col self-end p-1 ml-24 gap-1">
      <span className="py-1 flex justify-end font-jua text-xs gap-2 rounded-sm">
        <span className="text-utora-primary">{debateRoleKr}</span>
        <span className="text-slate-600">
          {nickname ?? DELETED_ACCOUNT_NICKNAME}
        </span>
        <span className="text-slate-500">{formatToTimeAgo(createdAt)}</span>
      </span>
      <span className="flex justify-end">
        <span className="text-xs py-2 px-3 bg-white ring-1 ring-slate-300 shadow-md rounded-md font-notoKr font-semibold">
          {payload}
        </span>
      </span>
    </div>
  );
}
