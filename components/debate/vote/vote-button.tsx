"use client";

import { useEffect, useState } from "react";
import { Vote } from "lucide-react";
import {
  CancelVoteTopicType,
  VoteTopicType,
} from "@/app/(home)/(use-side-nav)/vote/categories/[category]/actions";

interface VoteButtonPropsType {
  isVoted: boolean;
  topicId: number;
  onVoteClick: (postId: number) => Promise<VoteTopicType>;
  onCancelVoteClick: (postId: number) => Promise<CancelVoteTopicType>;
}

export default function VoteButton({
  isVoted,
  topicId,
  onVoteClick,
  onCancelVoteClick,
}: VoteButtonPropsType) {
  const [voteState, setVoteState] = useState(isVoted);
  useEffect(() => {
    setVoteState(voteState);
  }, [voteState]);
  const onVoteClickEvent = async () => {
    if (voteState) {
      // 투표 취소
      setVoteState(false);
      await onCancelVoteClick(topicId);
    } else {
      // 투표
      setVoteState(true);
      await onVoteClick(topicId);
    }
  };
  return (
    <div className="flex font-jua">
      <button
        onClick={onVoteClickEvent}
        className="flex items-center gap-2 text-sm"
      >
        {voteState ? (
          <span className="text-red-500">투표 취소</span>
        ) : (
          <span>투표</span>
        )}
        <Vote
          className={`size-5 ${voteState ? "text-red-500" : "text-black"}`}
        />
      </button>
    </div>
  );
}
