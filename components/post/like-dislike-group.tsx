"use client";

import { useState } from "react";
import DislikeButton from "./dislike-button";
import LikeButton from "./like-button";
import {
  cancelDislikePost,
  cancelLikePost,
  dislikePost,
  likePost,
} from "@/app/(home)/posts/[id]/actions";

interface LikeDislikeGroupPropsType {
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
  dislikeCount: number;
  postId: number;
}

export default function LikeDislikeGroup({
  isLiked,
  isDisliked,
  likeCount,
  dislikeCount,
  postId,
}: LikeDislikeGroupPropsType) {
  const [likeState, setLikeState] = useState({ isLiked, likeCount });
  const [dislikeState, setDislikeState] = useState({
    isDisliked,
    dislikeCount,
  });
  const onLikeClick = async () => {
    if (likeState.isLiked) {
      // 좋아요 취소
      setLikeState((prev) => ({
        isLiked: !prev.isLiked,
        likeCount: prev.likeCount - 1,
      }));
      await cancelLikePost(postId);
    } else {
      // 좋아요
      setLikeState((prev) => ({
        isLiked: !prev.isLiked,
        likeCount: prev.likeCount + 1,
      }));
      await likePost(postId);
    }
  };
  const onDislikeClick = async () => {
    if (dislikeState.isDisliked) {
      // 싫어요 취소
      setDislikeState((prev) => ({
        isDisliked: !prev.isDisliked,
        dislikeCount: prev.dislikeCount - 1,
      }));
      await cancelDislikePost(postId);
    } else {
      // 싫어요
      setDislikeState((prev) => ({
        isDisliked: !prev.isDisliked,
        dislikeCount: prev.dislikeCount + 1,
      }));
      await dislikePost(postId);
    }
  };
  return (
    <div className="flex gap-1 font-jua">
      <LikeButton
        isLiked={likeState.isLiked}
        isDisliked={dislikeState.isDisliked}
        likeCount={likeState.likeCount}
        onClick={onLikeClick}
      />
      <DislikeButton
        isDisliked={dislikeState.isDisliked}
        isLiked={likeState.isLiked}
        dislikeCount={dislikeState.dislikeCount}
        onClick={onDislikeClick}
      />
    </div>
  );
}
