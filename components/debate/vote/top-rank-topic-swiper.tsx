"use client";

import TopRankTopicItem from "./top-rank-topic-item";
import { GetTopicsTopRankType } from "@/app/(home)/(use-side-nav)/vote/categories/[category]/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

interface TopRankTopicSwiperPropsType {
  topTopics: GetTopicsTopRankType;
}

export default function TopRankTopicSwiper({
  topTopics,
}: TopRankTopicSwiperPropsType) {
  return (
    <Swiper
      className="w-full"
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      modules={[Navigation, Pagination, Autoplay]}
    >
      {topTopics.map((topTopic, index) => (
        <SwiperSlide key={topTopic.id}>
          <TopRankTopicItem
            ranking={index}
            topic={topTopic.topic}
            nickname={topTopic.user?.nickname}
            proposeReason={topTopic.propose_reason}
            createdAt={topTopic.created_at}
            voteCount={topTopic.vote_count}
            ballets={topTopic.proposed_topic_ballets}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
