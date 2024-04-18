import JoinDebateButton from "@/components/debate/join-debate-button";
import { getThisWeekTopics } from "./actions";
import { DELETED_ACCOUNT_NICKNAME, categories } from "@/lib/constants";
import { ChevronDown, ChevronUp } from "lucide-react";

export default async function Debate() {
  const thisWeekTopics = await getThisWeekTopics();
  return (
    <div className="w-full max-w-screen-lg flex flex-col m-auto justify-center items-center gap-5">
      <div className="w-full h-32 bg-slate-200">
        TODO: 지난주 토론 주제, 통계
      </div>
      <div className="w-full flex flex-col">
        <h1 className="font-doHyeon text-base lg:text-xl p-2 md:p-5">
          | 이번주 토론
        </h1>
        <ul className="w-full flex flex-col gap-10 p-2 md:p-5 bg-slate-100">
          {Object.keys(categories).map((category, index) => {
            return (
              <li key={index} className="w-full flex flex-col gap-3">
                <span className="flex items-center gap-3">
                  {categories[category].icon}
                  <h2 className="text-sm lg:text-lg font-jua text-slate-600">
                    {categories[category].title}
                  </h2>
                </span>
                <h3 className="text-slate-600 font-notoKr font-semibold text-xs lg:text-base">
                  선정된 주제
                  <span className="text-red-400">
                    {!thisWeekTopics[category] ? " 없음" : ""}
                  </span>
                </h3>
                <ul className="items-center flex flex-col gap-3 lg:grid lg:grid-cols-3 break-all ">
                  {thisWeekTopics[category] &&
                    thisWeekTopics[category].map((topic) => (
                      <li
                        key={topic.id}
                        className="w-full flex lg:flex-col gap-2"
                      >
                        <div className="w-full bg-white shadow-md rounded-lg p-3 flex flex-col aspect-auto gap-3">
                          <span className="font-notoKr font-semibold text-xs lg:text-sm">
                            {topic.topic}
                          </span>
                          <div className="flex justify-between">
                            <span className="font-jua text-xs flex gap-1 opacity-50">
                              <span>발의자:</span>
                              <span>
                                {topic.user?.nickname ??
                                  DELETED_ACCOUNT_NICKNAME}
                              </span>
                            </span>
                          </div>
                          <div className="flex  justify-between font-doHyeon">
                            <JoinDebateButton thisWeekTopicId={topic.id} />
                            <div className="flex gap-3">
                              <div className="flex items-center gap-1">
                                <ChevronUp className="size-4 text-red-400" />
                                <span className="text-xs text-slate-500">
                                  {topic.like_count}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ChevronDown className="size-4 text-blue-400" />
                                <span className="text-xs text-slate-500">
                                  {topic.dislike_count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
