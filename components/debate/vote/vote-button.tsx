"use client";

import { useEffect, useState } from "react";
import { Vote } from "lucide-react";
import { VoteTopicType } from "@/app/(main)/(use-side-nav)/vote/categories/[category]/actions";

interface VoteButtonPropsType {
  isVoted: boolean;
  topicId: number;
  onVoteClick: (postId: number) => Promise<VoteTopicType>;
}

export default function VoteButton({
  isVoted,
  topicId,
  onVoteClick,
}: VoteButtonPropsType) {
  const [voteState, setVoteState] = useState(isVoted);
  useEffect(() => {
    setVoteState(voteState);
  }, [voteState]);
  const onVoteClickEvent = async () => {
    const isConfirmed = confirm(
      "한 번 투표 시 취소가 불가능합니다 투표하시겠습니까?"
    );
    if (!isConfirmed) {
      return;
    }
    await onVoteClick(topicId);
    setVoteState(true);
  };
  return (
    <div className="flex font-jua">
      <button
        disabled={voteState}
        onClick={onVoteClickEvent}
        className="flex items-center gap-2 text-sm"
      >
        {voteState ? (
          <span className="text-red-500">투표 완료</span>
        ) : (
          <span className="text-black">투표</span>
        )}
        <Vote
          className={`size-5 ${voteState ? "text-red-500" : "text-black"}`}
        />
      </button>
    </div>
  );
}
