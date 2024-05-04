import { notFound } from "next/navigation";
import { getTopics, getTopicsTopRank } from "./actions";
import { EDebateCategory } from "@prisma/client";
import Divider from "@/components/divider";
import TopicList from "@/components/debate/vote/topic-list";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/constants";
import TopRankTopicSwiper from "@/components/debate/vote/top-rank-topic-swiper";

export default async function VoteCategory({
  params,
}: {
  params: { category: string };
}) {
  if (!(params.category in categories)) {
    return notFound();
  }

  const topTopics = await getTopicsTopRank(params.category as EDebateCategory);
  const topics = await getTopics(params.category as EDebateCategory, "popular");

  return (
    <div className="w-full flex flex-col m-auto">
      <div className="w-full shadow-md p-5 lg:p-12 bg-slate-50 gap-2 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center max-w-screen-lg m-auto">
          <span className="font-doHyeon flex gap-3 items-center">
            {categories[params.category].icon}
            <span className="text-2xl md:text-3xl lg:text-4xl text-primary">{`${
              categories[params.category].title
            } `}</span>
            <span className="text-md md:text-lg lg:text-xl self-end">
              토론 주제 투표
            </span>
          </span>
          <span className="text-xs md:text-sm font-notoKr self-end font-bold">
            TODO: 투표 마감 시간 구현
          </span>
        </div>
      </div>
      <div className="w-full max-w-screen-lg p-2 md:p-5 flex flex-col gap-10 m-auto">
        {topics.length > 0 ? (
          <>
            <TopRankTopicSwiper topTopics={topTopics} />
            <Divider />
            <TopicList
              category={params.category as EDebateCategory}
              initialList={topics}
              onPopularClick={getTopics}
              onLatestClick={getTopics}
            />
          </>
        ) : (
          <div className="w-full flex flex-col gap-3 justify-center items-center mt-60 font-notoKr">
            <span className="font-bold">아직 발의된 토론 주제가 없습니다.</span>
            <Link
              href={`/vote/categories/${params.category}/propose-topic`}
              className="flex items-center gap-2"
            >
              <PenBoxIcon className="text-green-600" />
              <span className="font-semibold">발의하기</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
