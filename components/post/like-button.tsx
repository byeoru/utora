import { ChevronUp } from "lucide-react";

interface LikeButtonPropsType {
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
  onClick: Function;
}

export default function LikeButton({
  isDisliked,
  likeCount,
  onClick,
}: LikeButtonPropsType) {
  const onLikeClick = async () => {
    await onClick();
  };
  return (
    <button
      onClick={onLikeClick}
      disabled={isDisliked}
      className="flex gap-2 items-center px-3 py-1 transition-colors sm:hover:bg-red-200 rounded-lg"
    >
      <ChevronUp className="size-4 sm:size-5 text-red-500" />
      <span className="text-sm font-doHyeon text-slate-500 sm:text-base">
        {likeCount}
      </span>
    </button>
  );
}
