import LikeDislikeGroup from "@/components/post/like-dislike-group";
import { DELETED_ACCOUNT_NICKNAME } from "@/lib/constants";
import { formatToTimeAgo } from "@/lib/utils";
import { BookmarkMinus, BookmarkPlus } from "lucide-react";
import VoteButton from "./vote-button";
import {
  cancelVoteTopic,
  voteTopic,
} from "@/app/(home)/(use-side-nav)/vote/categories/[category]/actions";

interface TopicItemPropsType {
  topicId: number;
  topic: string;
  proposeReason: string;
  createdAt: Date;
  nickname?: string;
  isVoted: boolean;
}

export default function TopicItem({
  topicId,
  topic,
  proposeReason,
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
          <span className="font-jua text-slate-500 text-sm">
            | 발의자: {nickname ?? DELETED_ACCOUNT_NICKNAME}
          </span>
          {isVoted ? (
            <BookmarkPlus className="size-4 sm:size-5 text-red-600" />
          ) : null}
        </div>
        <span className="font-notoKr text-xs lg:text-sm opacity-50 self-end">
          {formatToTimeAgo(createdAt)}
        </span>
        <p className="font-notoKr text-slate-500 font-semibold opacity-70 text-xs text-ellipsis overflow-hidden line-clamp-6 lg:line-clamp-4">
          {proposeReason}
        </p>
      </div>
      <div className="flex self-end">
        <VoteButton
          isVoted={isVoted}
          topicId={topicId}
          onVoteClick={voteTopic}
          onCancelVoteClick={cancelVoteTopic}
        />
      </div>
    </li>
  );
}
