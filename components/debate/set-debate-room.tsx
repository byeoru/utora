"use client";

import {
  GetDebateRoomMessagesType,
  GetMyDebateRole,
  saveMyDebateRole,
} from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import DebateChatList from "./debate-chat-list";
import { useState } from "react";
import { Component, Fan, Flower } from "lucide-react";
import Button from "../button";

interface SetDebateRoomPropsType {
  supabasePublicKey: string;
  debateRoomId: string;
  userId: number;
  nickname: string;
  initialMessages: GetDebateRoomMessagesType;
  myDebateRole: GetMyDebateRole;
}

export default function SetDebateRoom({
  supabasePublicKey,
  debateRoomId,
  userId,
  nickname,
  initialMessages,
  myDebateRole,
}: SetDebateRoomPropsType) {
  const [myRoleState, setMyRoleState] = useState(myDebateRole);
  const [savedRoleState, setSavedRoleState] = useState(myDebateRole);
  const saveMyRole = async () => {
    if (!myRoleState) {
      alert("참여 진영을 선택하세요.");
      return;
    }
    const myRole = await saveMyDebateRole(debateRoomId, myRoleState.debateRole);
    setSavedRoleState(myRole);
  };
  return savedRoleState ? (
    <DebateChatList
      supabasePublicKey={supabasePublicKey}
      debateRoomId={debateRoomId}
      userId={userId}
      nickname={nickname}
      initialMessages={initialMessages}
    />
  ) : (
    <div className="w-full flex flex-col lg:gap-10 justify-center items-center p-2 max-w-screen-xl m-auto ">
      <div className="w-full flex flex-col lg:flex-row gap-10 py-5">
        <div className="flex flex-col gap-5 items-center bg-slate-50 rounded-md">
          <h2 className="w-full py-2 font-notoKr font-bold lg:text-lg bg-violet-300 text-center rounded-md">
            찬성측
          </h2>
          <div className="w-full grid grid-cols-2 gap-3 ">
            <button
              onClick={() => setMyRoleState({ debateRole: "Proponent" })}
              className="px-2 py-4 flex flex-col gap-10 justify-between items-center rounded-md aspect-auto hover:bg-violet-200 sm:focus:bg-violet-200"
            >
              <div className="flex flex-col gap-2">
                <span className="font-doHyeon text-lg self-center">
                  | 토론 참여자
                </span>
                <span className="font-notoKr text-sm">
                  토론 참여자는 특정 주제나 문제에 대한 토론에서 활발하게
                  참여하는 역할을 맡습니다. 그들은 자신의 견해와 주장을 분명하게
                  표현하고, 토론의 주제에 대한 깊은 이해를 바탕으로 논리적인
                  주장을 전개합니다. 토론 참여자는 서로 다른 관점을 존중하면서
                  토론을 진행하고, 상대편의 주장을 적극적으로 분석하여
                  대응합니다. 또한 토론 참여자는 필요한 정보나 근거를 제시하여
                  자신의 주장을 뒷받침하고, 상대편의 반박에 대처할 준비를
                  갖춥니다. 이 모든 노력과 역량은 토론의 질을 높이고, 토론의
                  결과를 형성하는 데 중요한 역할을 합니다. 서포터들과 함께
                  협력하여 찬성측이 승리할 수 있도록 노력합니다.
                </span>
              </div>
              <Fan className="size-6" />
            </button>
            <button
              onClick={() =>
                setMyRoleState({ debateRole: "ProponentSupporter" })
              }
              className="px-2 py-4 flex flex-col gap-10 justify-between items-center rounded-md aspect-auto hover:bg-violet-200 sm:focus:bg-violet-200"
            >
              <div className="flex flex-col gap-2">
                <span className="font-doHyeon text-lg self-center">
                  || 토론 서포터
                </span>
                <span className="font-notoKr text-sm">
                  찬성측이 승리할 수 있게 토론 참여자를 서포트하는 집단입니다.
                  토론 참여자의 의견을 강화하고, 그들이 자신의 주장을 명확하게
                  전달할 수 있도록 돕습니다. 서포터들은 주장을 뒷받침하고 필요한
                  정보나 근거를 제공하여 토론자가 효과적으로 논리를 전개할 수
                  있도록 돕습니다. 또한 토론자의 자신감을 높이고, 대응 전략을
                  개발하는 데도 기여합니다. 이 모든 것들은 찬성측의 입장을
                  강화하고, 토론에서 승리할 수 있도록 돕는 중요한 역할을 합니다.
                </span>
              </div>
              <Flower className="size-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center bg-slate-50 rounded-md">
          <h2 className="w-full py-2 font-notoKr font-bold lg:text-lg bg-violet-300 text-center rounded-md">
            반대측
          </h2>
          <div className="w-full grid grid-cols-2 gap-3">
            <button
              onClick={() => setMyRoleState({ debateRole: "Opponent" })}
              className="px-2 py-4 flex flex-col gap-10 justify-between items-center rounded-md aspect-auto hover:bg-violet-200 sm:focus:bg-violet-200"
            >
              <div className="flex flex-col gap-2">
                <span className="font-doHyeon text-lg self-center">
                  | 토론 참여자
                </span>
                <span className="font-notoKr text-sm">
                  토론 참여자는 특정 주제나 문제에 대한 토론에서 활발하게
                  참여하는 역할을 맡습니다. 그들은 자신의 견해와 주장을 분명하게
                  표현하고, 토론의 주제에 대한 깊은 이해를 바탕으로 논리적인
                  주장을 전개합니다. 토론 참여자는 서로 다른 관점을 존중하면서
                  토론을 진행하고, 상대편의 주장을 적극적으로 분석하여
                  대응합니다. 또한 토론 참여자는 필요한 정보나 근거를 제시하여
                  자신의 주장을 뒷받침하고, 상대편의 반박에 대처할 준비를
                  갖춥니다. 이 모든 노력과 역량은 토론의 질을 높이고, 토론의
                  결과를 형성하는 데 중요한 역할을 합니다. 서포터들과 함께
                  협력하여 반대측이 승리할 수 있도록 노력합니다.
                </span>
              </div>
              <Fan className="size-6" />
            </button>
            <button
              onClick={() =>
                setMyRoleState({ debateRole: "OpponentSupporter" })
              }
              className="px-2 py-4 flex flex-col gap-10 justify-between items-center rounded-md aspect-auto hover:bg-violet-200 sm:focus:bg-violet-200"
            >
              <div className="flex flex-col gap-2">
                <span className="font-doHyeon text-lg self-center">
                  || 토론 서포터
                </span>
                <span className="font-notoKr text-sm">
                  반대측이 승리할 수 있게 토론 참여자를 서포트하는 집단입니다.
                  토론 참여자의 의견을 강화하고, 그들이 자신의 주장을 명확하게
                  전달할 수 있도록 돕습니다. 서포터들은 주장을 뒷받침하고 필요한
                  정보나 근거를 제공하여 토론자가 효과적으로 논리를 전개할 수
                  있도록 돕습니다. 또한 토론자의 자신감을 높이고, 대응 전략을
                  개발하는 데도 기여합니다. 이 모든 것들은 반대측의 입장을
                  강화하고, 토론에서 승리할 수 있도록 돕는 중요한 역할을 합니다.
                </span>
              </div>
              <Flower className="size-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center bg-slate-50 rounded-md">
          <h2 className="w-full py-2 font-notoKr font-bold lg:text-lg bg-violet-300 text-center rounded-md">
            중립
          </h2>
          <div className="w-full grid grid-cols-1 gap-3">
            <button
              onClick={() => setMyRoleState({ debateRole: "Audience" })}
              className="px-2 py-4 flex flex-col gap-10 justify-between items-center rounded-md aspect-auto hover:bg-violet-200 sm:focus:bg-violet-200"
            >
              <div className="flex flex-col gap-2">
                <span className="font-doHyeon text-lg self-center">| 관중</span>
                <span className="font-notoKr text-sm">
                  관중은 토론 과정을 관찰하고 참여하는 중립적인 집단으로, 다양한
                  관점과 의견을 가지고 있습니다. 그들은 토론자들의 주장을 듣고
                  평가하며, 토론의 주제에 대한 이해를 높이기 위해 노력합니다.
                  관중은 토론의 핵심 이슈에 대한 질문을 제기하거나, 추가적인
                  정보를 요청하여 토론의 깊이를 더합니다. 또한 관중은 토론자들의
                  논리와 주장을 검증하고, 공정한 판단을 내리는 데 도움이 됩니다.
                  그들의 존재는 토론의 다양성을 보장하고, 토론의 결과를 더욱
                  풍부하고 유의미하게 만듭니다.
                </span>
              </div>
              <Component className="size-6" />
            </button>
          </div>
        </div>
      </div>
      <form action={saveMyRole} className="w-full flex justify-center lg:w-72">
        <Button
          text={<span className="font-semibold font-notoKr">입장</span>}
        />
      </form>
    </div>
  );
}
