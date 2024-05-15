"use client";

import {
  GetTopicsType,
  getTopics,
} from "@/app/(home)/(use-side-nav)/vote/categories/[category]/actions";
import { EDebateCategory } from "@prisma/client";
import { useRef, useState } from "react";
import TopicItem from "./topic-item";
import { Pagination } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

interface TopicPaginationPropsType {
  userId: number;
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
  userId,
  page,
  category,
  orderBy,
  initialList,
  totalPagesCount,
}: TopicPaginationPropsType) {
  const [topicState, setTopicState] = useState(initialList);
  const [pageState, setPageState] = useState<number>(page);
  const [orderByState, setOrderByState] = useState<TopicOrderByType>(orderBy);
  const query = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const onOrderByChange = async (orderBy: TopicOrderByType) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set("page", "1");
    newQuery.set("orderby", orderBy);
    window.history.pushState(null, "", `?${newQuery}`);
    setPageState(1);
    setOrderByState(orderBy);
    const topic = await getTopics(1, category, orderBy);
    setTopicState(topic);
  };

  const onPageChange = async (page: number) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set("page", page.toString());
    window.history.pushState(null, "", `?${newQuery}`);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setPageState(page);
    const topics = await getTopics(page, category, orderByState);
    setTopicState(topics);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        ref={scrollRef}
        className="w-full px-10 py-2 bg-slate-500 flex gap-5 justify-center items-center rounded-md font-jua text-sm"
      >
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
            userId={userId}
            topicId={topic.id}
            proposerId={topic.user?.id}
            topic={topic.topic}
            nickname={topic.user?.nickname}
            proposeReason={topic.propose_reason}
            debateType={topic.debate_type}
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
