import { DELETED_ACCOUNT_NICKNAME, debateTypes } from "@/lib/constants";
import { formatToTimeAgo } from "@/lib/utils";
import { BookmarkPlus } from "lucide-react";
import VoteButton from "./vote-button";
import { voteTopic } from "@/app/(main)/(use-side-nav)/vote/categories/[category]/actions";
import { EDebateType } from "@prisma/client";

interface TopicItemPropsType {
  userId: number;
  topicId: number;
  topic: string;
  proposerId?: number;
  proposeReason: string;
  debateType: EDebateType;
  createdAt: Date;
  nickname?: string;
  isVoted: boolean;
}

export default function TopicItem({
  userId,
  topicId,
  proposerId,
  topic,
  proposeReason,
  debateType,
  createdAt,
  nickname,
  isVoted,
}: TopicItemPropsType) {
  return (
    <li className="flex flex-col relative justify-between border-b p-2 sm:p-4 break-word">
      <div className="flex flex-col gap-1">
        <span className="font-notoKr font-semibold text-base break-all mr-7">
          {topic}
        </span>
        <div className="flex justify-between items-center">
          <span className="flex gap-3 font-jua text-slate-500 text-sm">
            <span>발의자: {nickname ?? DELETED_ACCOUNT_NICKNAME}</span>
            <span>|</span>
            <span>토론 형식: {debateTypes[debateType]}</span>
          </span>
          {isVoted ? (
            <BookmarkPlus className="size-4 sm:size-5 text-red-600" />
          ) : null}
        </div>
        <span className="font-notoKr text-xs lg:text-sm opacity-50 self-end">
          {formatToTimeAgo(createdAt)}
        </span>
        <p className="font-notoKr text-slate-500 font-medium opacity-70 text-xs text-ellipsis overflow-hidden line-clamp-6 lg:line-clamp-4">
          {proposeReason}
        </p>
      </div>
      <div className="flex self-end">
        {userId === proposerId ? null : (
          <VoteButton
            isVoted={isVoted}
            topicId={topicId}
            onVoteClick={voteTopic}
          />
        )}
      </div>
    </li>
  );
}
