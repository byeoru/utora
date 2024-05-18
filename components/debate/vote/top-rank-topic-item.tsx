"use client";

import Divider from "@/components/divider";
import { DELETED_ACCOUNT_NICKNAME, debateTypes } from "@/lib/constants";
import { formatToTimeAgo } from "@/lib/utils";
import { EAgeGroup, EDebateType, EGender } from "@prisma/client";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  SubTitle,
  ChartOptions,
} from "chart.js";
import { Vote } from "lucide-react";
import { Doughnut } from "react-chartjs-2";

interface TopRankTopicItemPropsType {
  ranking: number;
  topic: string;
  proposeReason: string;
  createdAt: Date;
  voteCount: number;
  debateType: EDebateType;
  nickname?: string;
  ballets: {
    gender: EGender;
    age_group: EAgeGroup;
  }[];
}

export default function TopRankTopicItem({
  ranking,
  topic,
  proposeReason,
  createdAt,
  voteCount,
  debateType,
  nickname,
  ballets,
}: TopRankTopicItemPropsType) {
  const ageGroupObj = {
    teens: 0,
    twenties: 0,
    thirties: 0,
    forties: 0,
    fifty_and_over: 0,
  };
  const genderObj = {
    male: 0,
    female: 0,
  };
  ballets.forEach((ballet) => {
    ageGroupObj[ballet.age_group]++;
    genderObj[ballet.gender]++;
  });
  Chart.register(ArcElement, Legend, SubTitle, Tooltip);
  const ageGroupData = {
    labels: ["10대", "20대", "30대", "40대", "50대 이상"],
    datasets: [
      {
        data: [
          ageGroupObj.teens,
          ageGroupObj.twenties,
          ageGroupObj.thirties,
          ageGroupObj.forties,
          ageGroupObj.fifty_and_over,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
    text: "연령층",
  };
  const ageGroupOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      // tooltip: {
      //   callbacks: {
      //     label: function (context: {
      //       dataIndex: string;
      //       formattedValue: string;
      //     }): string {
      //       return `${context.formattedValue}%`;
      //     },
      //   },
      // },
    },
  };
  const genderData = {
    labels: ["남", "여"],
    datasets: [
      {
        data: [genderObj.male, genderObj.female],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderWidth: 1,
      },
    ],
    text: "성별",
  };
  const genderOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      // tooltip: {
      //   callbacks: {
      //     label: function (context: {
      //       dataIndex: string;
      //       formattedValue: string;
      //     }): string {
      //       return `${context.formattedValue}%`;
      //     },
      //   },
      // },
    },
  };
  return (
    <li className="p-2 sm:p-4 flex flex-col gap-5 rounded-md shadow-md border">
      <div className="flex flex-col gap-2 px-3">
        <div className="text-ellipsis line-clamp-2 break-words">
          <span className="font-notoKr font-semibold text-md">{topic}</span>
        </div>
        <div className="text-ellipsis line-clamp-5 break-words">
          <span className="font-notoKr text-sm text-slate-500">
            {proposeReason}
          </span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col px-3">
        <span className="flex gap-3 font-jua text-sm">
          <span>발의자: {nickname ?? DELETED_ACCOUNT_NICKNAME}</span>
          <span>|</span>
          <span>토론 형식: {debateTypes[debateType]}</span>
        </span>
        <span className="font-doHyeon text-sm text-slate-400">
          {formatToTimeAgo(createdAt)}
        </span>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex">
          <div className="w-1/2 md:w-min p-1">
            <Doughnut options={ageGroupOptions} data={ageGroupData} />
          </div>
          <div className="w-1/2 md:w-min p-1">
            <Doughnut options={genderOptions} data={genderData} />
          </div>
        </div>
        <div className="flex items-center gap-2 font-jua text-sm">
          <span className="flex items-center gap-1">
            <Vote className="size-5" />
            <span>투표수:</span>
          </span>
          <span>{voteCount}</span>
        </div>
      </div>
    </li>
  );
}
