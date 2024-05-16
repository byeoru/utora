"use client";

import { useEffect, useState } from "react";
import DislikeButton from "./dislike-button";
import LikeButton from "./like-button";
import {
  CancelDislikePostType,
  CancelLikePostType,
  DislikePostType,
  LikePostType,
} from "@/app/(main)/(use-side-nav)/posts/[id]/actions";

interface LikeDislikeGroupPropsType {
  className?: string;
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
  dislikeCount: number;
  postId: number;
  onLikeClick: (postId: number) => Promise<LikePostType>;
  onCancelLikeClick: (postId: number) => Promise<CancelLikePostType>;
  onDislikeClick: (postId: number) => Promise<DislikePostType>;
  onCancelDislikeClick: (postId: number) => Promise<CancelDislikePostType>;
}

export default function LikeDislikeGroup({
  className,
  isLiked,
  isDisliked,
  likeCount,
  dislikeCount,
  postId,
  onLikeClick,
  onCancelLikeClick,
  onDislikeClick,
  onCancelDislikeClick,
}: LikeDislikeGroupPropsType) {
  const [likeState, setLikeState] = useState({ isLiked, likeCount });
  const [dislikeState, setDislikeState] = useState({
    isDisliked,
    dislikeCount,
  });

  useEffect(() => {
    setLikeState({ isLiked, likeCount });
    setDislikeState({ isDisliked, dislikeCount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeCount, dislikeCount]);
  const onLikeClickEvent = async () => {
    if (likeState.isLiked) {
      // 좋아요 취소
      setLikeState((prev) => ({
        isLiked: !prev.isLiked,
        likeCount: prev.likeCount - 1,
      }));
      await onCancelLikeClick(postId);
    } else {
      // 좋아요
      setLikeState((prev) => ({
        isLiked: !prev.isLiked,
        likeCount: prev.likeCount + 1,
      }));
      await onLikeClick(postId);
    }
  };
  const onDislikeClickEvent = async () => {
    if (dislikeState.isDisliked) {
      // 싫어요 취소
      setDislikeState((prev) => ({
        isDisliked: !prev.isDisliked,
        dislikeCount: prev.dislikeCount - 1,
      }));
      await onCancelDislikeClick(postId);
    } else {
      // 싫어요
      setDislikeState((prev) => ({
        isDisliked: !prev.isDisliked,
        dislikeCount: prev.dislikeCount + 1,
      }));
      await onDislikeClick(postId);
    }
  };
  return (
    <div className={`flex font-jua ${className}`}>
      <LikeButton
        isLiked={likeState.isLiked}
        isDisliked={dislikeState.isDisliked}
        likeCount={likeState.likeCount}
        onClick={onLikeClickEvent}
      />
      <DislikeButton
        isDisliked={dislikeState.isDisliked}
        isLiked={likeState.isLiked}
        dislikeCount={dislikeState.dislikeCount}
        onClick={onDislikeClickEvent}
      />
    </div>
  );
}
