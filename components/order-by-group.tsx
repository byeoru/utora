"use client";

import { useState } from "react";

interface OrderByGroupPropsType {
  onPopularClick: () => void;
  onLatestClick: () => void;
}

const orderBy = {
  popular: "인기순",
  latest: "최신순",
};
export type OrderByKeyType = keyof typeof orderBy;

export default function OrderByGroup({
  onPopularClick,
  onLatestClick,
}: OrderByGroupPropsType) {
  const [orderByState, setOrderByState] = useState<OrderByKeyType>("popular");

  const onPopularClickEvent = () => {
    setOrderByState("popular");
    onPopularClick();
  };
  const onLatestClickEvent = () => {
    setOrderByState("latest");
    onLatestClick();
  };
  return (
    <div className="w-full px-10 py-2 bg-slate-500 flex gap-5 justify-center items-center rounded-md font-jua text-sm">
      <button
        disabled={orderByState === "popular"}
        onClick={onPopularClickEvent}
        className={`${
          orderByState === "popular"
            ? "text-green-400 underline decoration-dotted underline-offset-4"
            : "text-slate-200"
        }`}
      >
        {orderBy.popular}
      </button>
      <button
        disabled={orderByState === "latest"}
        onClick={onLatestClickEvent}
        className={`${
          orderByState === "latest"
            ? "text-green-400 underline decoration-dotted underline-offset-4"
            : "text-slate-200"
        }`}
      >
        {orderBy.latest}
      </button>
    </div>
  );
}
