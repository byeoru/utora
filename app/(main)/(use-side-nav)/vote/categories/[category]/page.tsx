import { notFound } from "next/navigation";
import {
  getMyProposeTopic,
  getTopics,
  getTopicsTopRank,
  getTotalTopicsCountOfCategory,
} from "./actions";
import { EDebateCategory } from "@prisma/client";
import Link from "next/link";
import { TOPICS_FETCH_SIZE, categories, debateTypes } from "@/lib/constants";
import TopRankTopicSwiper from "@/components/debate/vote/top-rank-topic-swiper";
import TopicPagination, {
  TopicOrderByType,
} from "@/components/debate/vote/topic-pagination";
import getSession from "@/lib/session";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "주제 투표",
};

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
  const [session, topTopics, topics, totalTopicsCount, myProposeTopic] =
    await Promise.allSettled([
      getSession(),
      getTopicsTopRank(params.category as EDebateCategory),
      getTopics(1, params.category as EDebateCategory, "popular"),
      getTotalTopicsCountOfCategory(params.category as EDebateCategory),
      getMyProposeTopic(params.category as EDebateCategory),
    ]);
  if (
    session.status === "rejected" ||
    topTopics.status === "rejected" ||
    topics.status === "rejected" ||
    totalTopicsCount.status === "rejected" ||
    myProposeTopic.status === "rejected"
  ) {
    return null;
  }
  const totalPagesCount = Math.ceil(totalTopicsCount.value / TOPICS_FETCH_SIZE);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full shadow-md p-5 lg:p-5 gap-2 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center max-w-screen-lg m-auto">
          <span className="font-doHyeon flex gap-3 items-center">
            <span className="text-2xl md:text-3xl lg:text-4xl text-utora-primary">{`${
              categories[params.category].title
            } `}</span>
            <span className="text-md md:text-lg lg:text-xl self-end">
              토론 주제 투표
            </span>
          </span>
        </div>
      </div>
      <div className="w-full max-w-screen-lg p-2 md:p-5 flex flex-col gap-10 m-auto">
        {topics.value.length > 0 ? (
          <>
            <TopRankTopicSwiper topTopics={topTopics.value} />
            <div
              className={`flex flex-col ${
                myProposeTopic.value ? "sm:flex-col" : "sm:flex-row"
              }  gap-2 mx-auto`}
            >
              <ul className="flex flex-col list-disc gap-2 p-5 pl-8 bg-slate-200 rounded-md text-xs font-notoKr font-medium">
                <li>
                  투표는 이번 주 일요일 밤 12시에 종료됨과 동시에 표를 많이 받은
                  상위 3개의 주제에 대하여 토론방이 생성됩니다.
                </li>
                <li>
                  투표 중에는 최상위 3개의 주제에 대하여 투표 연령층, 성별
                  통계를 공개합니다.
                </li>
                <li>
                  각 토론 주제 카테고리별로 일주일에 하나의 주제만 발의할 수
                  있습니다.
                </li>
                <li>
                  본인이 발의한 주제에 본인이 투표할 수 없으며 한 번 투표한
                  주제는 투표 취소할 수 없습니다.
                </li>
              </ul>
              {myProposeTopic.value ? (
                <li className="flex flex-col gap-3 border shadow-md rounded-md justify-between p-2 sm:p-4 break-word">
                  <h2 className="font-notoKr font-medium">나의 주제</h2>
                  <div className="flex flex-col gap-1">
                    <span className="font-notoKr font-semibold text-base break-all mr-7">
                      {myProposeTopic.value.topic}
                    </span>
                    <div className="flex justify-between items-center">
                      <span className="flex gap-3 font-jua text-slate-500 text-sm">
                        <span>
                          토론 형식:{" "}
                          {debateTypes[myProposeTopic.value.debate_type]}
                        </span>
                      </span>
                    </div>
                    <span className="font-notoKr text-xs lg:text-sm opacity-50 self-end">
                      {formatToTimeAgo(myProposeTopic.value.created_at)}
                    </span>
                    <p className="font-notoKr text-slate-500 font-medium opacity-70 text-xs text-ellipsis overflow-hidden line-clamp-6 lg:line-clamp-4">
                      {myProposeTopic.value.propose_reason}
                    </p>
                  </div>
                </li>
              ) : (
                <Link
                  href={`/vote/categories/${params.category}/propose-topic`}
                  className="flex gap-1 justify-center items-center p-4 text-green-400 font-notoKr font-medium bg-slate-500 rounded-md"
                >
                  <PencilSquareIcon className="size-6 " />
                  <span>주제 발의</span>
                </Link>
              )}
            </div>
            <TopicPagination
              userId={session.value.id}
              page={page}
              orderBy={orderBy}
              category={params.category as EDebateCategory}
              initialList={topics.value}
              totalPagesCount={totalPagesCount}
            />
          </>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 mx-auto">
            <ul className="flex flex-col list-disc gap-2 p-5 pl-8 bg-slate-200 rounded-md text-xs font-notoKr font-medium">
              <li className="text-red-500">아직 발의된 주제가 없습니다.</li>
              <li>
                투표는 이번 주 일요일 밤 12시에 종료됨과 동시에 표를 많이 받은
                상위 3개의 주제에 대하여 토론방이 생성됩니다.
              </li>
              <li>
                투표 중에는 최상위 3개의 주제에 대하여 투표 연령층, 성별 통계를
                공개합니다.
              </li>
              <li>
                각 토론 주제 카테고리별로 일주일에 하나의 주제만 발의할 수
                있습니다.
              </li>
              <li>
                본인이 발의한 주제에 본인이 투표할 수 없으며 한 번 투표한 주제는
                투표 취소할 수 없습니다.
              </li>
            </ul>
            <Link
              href={`/vote/categories/${params.category}/propose-topic`}
              className="flex gap-1 justify-center items-center p-4 text-green-400 font-notoKr font-medium bg-slate-500 rounded-md"
            >
              <PencilSquareIcon className="size-6 " />
              <span>주제 발의</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
