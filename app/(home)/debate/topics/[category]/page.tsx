import { notFound } from "next/navigation";
import { getTopics } from "./actions";
import { EDebateCategory } from "@prisma/client";
import TopRankTopic from "@/components/debate/vote/top-rank-topic";

export interface ObjectType {
  [key: string]: string;
}
const Categories: ObjectType = {
  game: "게임",
};

export type CategoriesType = typeof Categories;

export default async function VoteCategory({
  params,
}: {
  params: { category: string };
}) {
  if (!(params.category in Categories)) {
    return notFound();
  }

  const topics = await getTopics(
    Categories[params.category] as EDebateCategory
  );
  if (!topics) {
    return notFound();
  }

  console.log(topics);
  const loopCount = Math.min(topics.length, 3);

  return (
    <div className="w-full flex flex-col m-auto">
      <div className="w-full shadow-md p-5 lg:p-12 bg-emerald-300 gap-2 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center max-w-screen-lg m-auto">
          <span className="font-doHyeon">
            <span className="text-2xl md:text-3xl lg:text-4xl text-primary">{`${
              Categories[params.category]
            } `}</span>
            <span className="text-md md:text-lg lg:text-xl">
              분야 토론 주제 투표
            </span>
          </span>
          <span className="text-xs md:text-sm font-notoKr self-end font-bold">
            투표마감 5시간 전
          </span>
        </div>
      </div>
      <div className="w-full max-w-screen-lg p-2 md:p-5 flex m-auto">
        <ul className="w-full m-auto grid lg:grid-cols-3 grid-cols-1 lg:gap-4">
          {topics.slice(0, loopCount).map((topic, index) => (
            <TopRankTopic
              key={index}
              topic={topic.topic}
              proposeReason={topic.propose_reason}
              createdAt={topic.created_at}
              like={topic.like}
              dislike={topic.dislike}
              nickname={topic.user?.nickname}
            />
          ))}
        </ul>
        <ul></ul>
      </div>
    </div>
  );
}
