import DislikeButton from "@/components/post/dislike-button";
import LikeButton from "@/components/post/like-button";
import { formatToTimeAgo } from "@/lib/utils";

interface TopRankTopicPropsType {
  topic: string;
  proposeReason: string;
  createdAt: Date;
  like: number;
  dislike: number;
  nickname?: string;
}

export default function TopRankTopic({
  topic,
  proposeReason,
  createdAt,
  like,
  dislike,
  nickname,
}: TopRankTopicPropsType) {
  return (
    <li className="flex-1 flex flex-col gap-3 bg-slate-200 rounded-xl lg:aspect-square px-3 py-3 break-word">
      <span className="font-jua text-lg break-all">{topic}</span>
      <span className="font-jua">주제 발의자: {nickname}</span>
      <span className="font-notoKr text-sm self-end">
        {formatToTimeAgo(createdAt)}
      </span>
      <p className="font-notoKr text-sm text-ellipsis overflow-hidden line-clamp-[8] lg:line-clamp-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="flex"></div>
    </li>
  );
}
