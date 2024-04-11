import { HandThumbDownIcon as HandThumbDownIconSolid } from "@heroicons/react/24/solid";
import { HandThumbDownIcon as HandThumbDownIconOutline } from "@heroicons/react/24/outline";

interface DislikeButtonPropsType {
  isDisliked: boolean;
  isLiked: boolean;
  dislikeCount: number;
  onClick: Function;
}

export default function DislikeButton({
  isDisliked,
  isLiked,
  dislikeCount,
  onClick,
}: DislikeButtonPropsType) {
  const onDislikeClick = async () => {
    await onClick();
  };
  return (
    <button
      onClick={onDislikeClick}
      disabled={isLiked}
      className={`flex gap-2 items-center px-3 py-1 transition-colors sm:hover:bg-red-200 rounded-lg`}
    >
      {isDisliked ? (
        <HandThumbDownIconSolid className="size-5 text-red-500" />
      ) : (
        <HandThumbDownIconOutline className="size-5 text-red-400" />
      )}

      <span className="text-red-400">{dislikeCount}</span>
    </button>
  );
}
