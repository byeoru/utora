import {
  cancelDislikeTopic,
  cancelLikeTopic,
  dislikeTopic,
  likeTopic,
} from "@/app/(home)/vote/categories/[category]/actions";
import LikeDislikeGroup from "@/components/post/like-dislike-group";
import { formatToTimeAgo } from "@/lib/utils";

interface TopicItemPropsType {
  topicId: number;
  topic: string;
  proposeReason: string;
  createdAt: Date;
  likeCount: number;
  dislikeCount: number;
  nickname?: string;
  isLiked: boolean;
  isDisliked: boolean;
}

export default function TopicItem({
  topicId,
  topic,
  proposeReason,
  createdAt,
  likeCount,
  dislikeCount,
  nickname,
  isLiked,
  isDisliked,
}: TopicItemPropsType) {
  return (
    <li className="flex-1 flex flex-col relative justify-between bg-slate-200 rounded-xl px-4 py-4 break-word shadow-md">
      <div className="flex flex-col gap-3">
        <span className="font-jua text-lg break-all mr-7">{topic}</span>
        <span className="font-jua text-slate-500">
          주제 발의자: <span className="text-primary">{nickname}</span>
        </span>
        <span className="font-notoKr text-xs lg:text-sm opacity-50 self-end">
          {formatToTimeAgo(createdAt)}
        </span>
        <p className="font-notoKr opacity-70 text-sm text-ellipsis overflow-hidden line-clamp-6 lg:line-clamp-4">
          {proposeReason}
        </p>
      </div>
      <div className="flex self-end">
        <LikeDislikeGroup
          isLiked={isLiked}
          isDisliked={isDisliked}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          postId={topicId}
          onLikeClick={likeTopic}
          onCancelLikeClick={cancelLikeTopic}
          onDislikeClick={dislikeTopic}
          onCancelDislikeClick={cancelDislikeTopic}
        />
      </div>
    </li>
  );
}