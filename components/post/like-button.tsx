import { HandThumbUpIcon as HandThumbUpSolid } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpOutline } from "@heroicons/react/24/outline";

interface LikeButtonPropsType {
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
  onClick: Function;
}

export default function LikeButton({
  isLiked,
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
      {isLiked ? (
        <HandThumbUpSolid className="size-4 sm:size-5 text-red-500" />
      ) : (
        <HandThumbUpOutline className="size-4 sm:size-5 text-red-300" />
      )}
      <span className="text-sm font-doHyeon text-slate-500 sm:text-base">
        {likeCount}
      </span>
    </button>
  );
}
