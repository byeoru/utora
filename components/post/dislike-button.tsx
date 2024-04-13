import { ChevronDown } from "lucide-react";

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
      <ChevronDown
        className={`size-4 sm:size-5 ${
          isDisliked ? "text-red-500" : "text-slate-500"
        }`}
      />

      <span className="text-slate-500 font-doHyeon text-sm sm:text-base">
        {dislikeCount}
      </span>
    </button>
  );
}
