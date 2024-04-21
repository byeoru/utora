"use client";

import { GetTopicsType } from "@/app/(home)/(use-side-nav)/vote/categories/[category]/actions";
import OrderByGroup, { OrderByKeyType } from "@/components/order-by-group";
import { EDebateCategory } from "@prisma/client";
import { useState } from "react";
import TopicItem from "./topic-item";

interface TopicListPropsType {
  category: EDebateCategory;
  initialList: GetTopicsType;
  onPopularClick: (
    category: EDebateCategory,
    orderBy: OrderByKeyType
  ) => Promise<GetTopicsType>;
  onLatestClick: (
    category: EDebateCategory,
    orderBy: OrderByKeyType
  ) => Promise<GetTopicsType>;
}

export default function TopicList({
  category,
  initialList,
  onPopularClick,
  onLatestClick,
}: TopicListPropsType) {
  const [topicState, setTopicState] = useState(initialList);

  const onPopularClickEvent = async () => {
    const topic = await onPopularClick(category, "popular");
    setTopicState([]);
    setTopicState(topic);
  };
  const onLatestClickEvent = async () => {
    const topic = await onLatestClick(category, "latest");
    setTopicState([]);
    setTopicState(topic);
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <OrderByGroup
        onPopularClick={onPopularClickEvent}
        onLatestClick={onLatestClickEvent}
      />
      <ul className="w-full flex flex-col gap-2">
        {topicState?.map((topic) => (
          <TopicItem
            key={topic.id}
            topicId={topic.id}
            topic={topic.topic}
            nickname={topic.user?.nickname}
            proposeReason={topic.propose_reason}
            createdAt={topic.created_at}
            likeCount={topic.like_count}
            dislikeCount={topic.dislike_count}
            isLiked={
              topic.proposed_topic_reactions.filter(
                (reaction) => reaction.reaction === "like"
              ).length > 0
            }
            isDisliked={
              topic.proposed_topic_reactions.filter(
                (reaction) => reaction.reaction === "dislike"
              ).length > 0
            }
          />
        ))}
      </ul>
    </div>
  );
}
