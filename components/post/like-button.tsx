import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";

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
      className="flex gap-2 items-center px-3 py-1 transition-colors sm:hover:bg-blue-200 rounded-lg"
    >
      {isLiked ? (
        <HandThumbUpIconSolid className="size-4 sm:size-5 text-blue-500" />
      ) : (
        <HandThumbUpIconOutline className="size-4 sm:size-5 text-blue-400" />
      )}

      <span className="text-blue-400 text-sm sm:text-base">{likeCount}</span>
    </button>
  );
}
