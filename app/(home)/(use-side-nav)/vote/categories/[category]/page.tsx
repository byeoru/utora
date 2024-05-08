import { notFound } from "next/navigation";
import {
  getTopics,
  getTopicsTopRank,
  getTotalTopicsCountOfCategory,
} from "./actions";
import { EDebateCategory } from "@prisma/client";
import Divider from "@/components/divider";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";
import { TOPICS_FETCH_SIZE, categories } from "@/lib/constants";
import TopRankTopicSwiper from "@/components/debate/vote/top-rank-topic-swiper";
import TopicPagination, {
  TopicOrderByType,
} from "@/components/debate/vote/topic-pagination";

export default async function VoteCategory({
  params,
}: {
  params: { category: string; page: number; orderby: TopicOrderByType };
}) {
  if (!(params.category in categories)) {
    return notFound();
  }
  const page = params.page ?? 1;
  const orderBy = params.orderby ?? "popular";
  const topTopics = await getTopicsTopRank(params.category as EDebateCategory);
  const topics = await getTopics(
    1,
    params.category as EDebateCategory,
    "popular"
  );
  const totalTopicsCount = await getTotalTopicsCountOfCategory(
    params.category as EDebateCategory
  );
  const totalPagesCount = Math.ceil(totalTopicsCount / TOPICS_FETCH_SIZE);

  return (
    <div className="w-full flex flex-col m-auto">
      <div className="w-full shadow-md p-5 lg:p-5 gap-2 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center max-w-screen-lg m-auto">
          <span className="font-doHyeon flex gap-3 items-center">
            {categories[params.category].icon}
            <span className="text-2xl md:text-3xl lg:text-4xl text-utora-primary">{`${
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
            <TopicPagination
              page={page}
              orderBy={orderBy}
              category={params.category as EDebateCategory}
              initialList={topics}
              totalPagesCount={totalPagesCount}
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
