import { HandThumbDownIcon } from "@heroicons/react/24/solid";

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
      className="flex gap-2 items-center px-3 py-1 transition-colors hover:bg-red-200 rounded-lg"
    >
      <span className="text-red-400">{`싫어요 ${dislikeCount}`}</span>
      <HandThumbDownIcon
        className={`size-5 ${isDisliked ? "text-red-500" : "text-white"}`}
      />
    </button>
  );
}
