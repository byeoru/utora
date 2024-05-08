"use client";

import {
  GetTopicsType,
  getTopics,
} from "@/app/(home)/(use-side-nav)/vote/categories/[category]/actions";
import { EDebateCategory } from "@prisma/client";
import { useState } from "react";
import TopicItem from "./topic-item";
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface TopicPaginationPropsType {
  page: number;
  category: EDebateCategory;
  orderBy: TopicOrderByType;
  initialList: GetTopicsType;
  totalPagesCount: number;
}

const orderByObj = {
  popular: "인기순",
  latest: "최신순",
};

export type TopicOrderByType = keyof typeof orderByObj;

export default function TopicPagination({
  page,
  category,
  orderBy,
  initialList,
  totalPagesCount,
}: TopicPaginationPropsType) {
  const [topicState, setTopicState] = useState(initialList);
  const [pageState, setPageState] = useState<number>(page);
  const [orderByState, setOrderByState] = useState<TopicOrderByType>(orderBy);
  const pathname = usePathname();
  const query = useSearchParams();
  const { replace } = useRouter();

  const onOrderByChange = async (orderBy: TopicOrderByType) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set("page", "1");
    newQuery.set("orderby", orderBy);
    replace(`${pathname}?${newQuery}`);
    setPageState(1);
    setOrderByState(orderBy);
    const topic = await getTopics(1, category, orderBy);
    setTopicState([]);
    setTopicState(topic);
  };

  const onPageChange = async (page: number) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set("page", page.toString());
    replace(`${pathname}?${newQuery}`);
    setPageState(page);
    const topics = await getTopics(page, category, orderByState);
    setTopicState(topics);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full px-10 py-2 bg-slate-500 flex gap-5 justify-center items-center rounded-md font-jua text-sm">
        <button
          disabled={orderByState === "popular"}
          onClick={() => onOrderByChange("popular")}
          className={`${
            orderByState === "popular"
              ? "text-green-400 underline decoration-dotted underline-offset-4"
              : "text-slate-200"
          }`}
        >
          {orderByObj.popular}
        </button>
        <button
          disabled={orderByState === "latest"}
          onClick={() => onOrderByChange("latest")}
          className={`${
            orderByState === "latest"
              ? "text-green-400 underline decoration-dotted underline-offset-4"
              : "text-slate-200"
          }`}
        >
          {orderByObj.latest}
        </button>
      </div>
      <ul className="w-full flex flex-col gap-2">
        {topicState?.map((topic) => (
          <TopicItem
            key={topic.id}
            topicId={topic.id}
            topic={topic.topic}
            nickname={topic.user?.nickname}
            proposeReason={topic.propose_reason}
            createdAt={topic.created_at}
            isVoted={topic.proposed_topic_ballets.length > 0}
          />
        ))}
      </ul>
      {totalPagesCount > 0 ? (
        <div className="flex justify-center">
          <Pagination
            classNames={{ base: "m-1 p-0" }}
            size="sm"
            isCompact
            total={totalPagesCount}
            showControls
            showShadow
            initialPage={1}
            color="success"
            page={pageState}
            onChange={onPageChange}
          />
        </div>
      ) : null}
    </div>
  );
}
