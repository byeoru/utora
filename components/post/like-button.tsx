import { HandThumbUpIcon } from "@heroicons/react/24/solid";

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
      className="flex gap-2 items-center px-3 py-1 transition-colors hover:bg-blue-200 rounded-lg"
    >
      <span className="text-blue-400">{`좋아요 ${likeCount}`}</span>
      <HandThumbUpIcon
        className={`size-5 ${isLiked ? "text-blue-500" : "text-white"}`}
      />
    </button>
  );
}
