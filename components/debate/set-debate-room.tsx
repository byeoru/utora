"use client";

import {
  GetDebateRoomMessagesType,
  GetMyDebateRole,
  saveMyDebateRole,
} from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import DebateChatList from "./debate-chat-list";
import { useState } from "react";
import { Component, Fan, Flower } from "lucide-react";
import { EDebateRole } from "@prisma/client";
import { useFormStatus } from "react-dom";
import {
  AUDIENCE_TEXT,
  OPPONENT_SUPPORTER_TEXT,
  OPPONENT_TEXT,
  PROPONENT_SUPPORTER_TEXT,
  PROPONENT_TEXT,
} from "@/lib/constants";

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
  const { pending } = useFormStatus();
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
          <div className="w-full lg:h-full grid grid-cols-2 gap-3 ">
            <button
              onClick={() => setMyRoleState({ debateRole: "Proponent" })}
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debateRole === EDebateRole.Proponent
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg">| 토론 참여자</span>
                <span className="font-notoKr text-sm text-start">
                  {PROPONENT_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debateRole === EDebateRole.Proponent
                    ? "bg-violet-300 text-white *:animate-spin"
                    : ""
                }`}
              >
                <Fan className="size-6" />
              </div>
            </button>
            <button
              onClick={() =>
                setMyRoleState({ debateRole: "ProponentSupporter" })
              }
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debateRole === EDebateRole.ProponentSupporter
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg self-center">
                  || 토론 서포터
                </span>
                <span className="font-notoKr text-sm text-start">
                  {PROPONENT_SUPPORTER_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debateRole === EDebateRole.ProponentSupporter
                    ? "bg-violet-300 text-white *:animate-spin"
                    : ""
                }`}
              >
                <Flower className="size-6" />
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center bg-slate-50 rounded-md">
          <h2 className="w-full py-2 font-notoKr font-bold lg:text-lg bg-violet-300 text-center rounded-md">
            반대측
          </h2>
          <div className="w-full lg:h-full grid grid-cols-2 gap-3">
            <button
              onClick={() => setMyRoleState({ debateRole: "Opponent" })}
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debateRole === EDebateRole.Opponent
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg self-center">
                  | 토론 참여자
                </span>
                <span className="font-notoKr text-sm text-start">
                  {OPPONENT_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debateRole === EDebateRole.Opponent
                    ? "bg-violet-300 text-white *:animate-spin"
                    : ""
                }`}
              >
                <Fan className="size-6" />
              </div>
            </button>
            <button
              onClick={() =>
                setMyRoleState({ debateRole: "OpponentSupporter" })
              }
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debateRole === EDebateRole.OpponentSupporter
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg self-center">
                  || 토론 서포터
                </span>
                <span className="font-notoKr text-sm text-start">
                  {OPPONENT_SUPPORTER_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debateRole === EDebateRole.OpponentSupporter
                    ? "bg-violet-300 text-white *:animate-spin"
                    : ""
                }`}
              >
                <Flower className="size-6" />
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center bg-slate-50 rounded-md">
          <h2 className="w-full py-2 font-notoKr font-bold lg:text-lg bg-violet-300 text-center rounded-md">
            중립
          </h2>
          <div className="w-full lg:h-full grid grid-cols-1 gap-3">
            <button
              onClick={() => setMyRoleState({ debateRole: "Audience" })}
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debateRole === EDebateRole.Audience
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg self-center">| 관중</span>
                <span className="font-notoKr text-sm text-start">
                  {AUDIENCE_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debateRole === EDebateRole.Audience
                    ? "bg-violet-300 text-white *:animate-spin"
                    : ""
                }`}
              >
                <Component className="size-6" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <form action={saveMyRole} className="w-full flex justify-center lg:w-96">
        <button
          disabled={pending || !myRoleState?.debateRole}
          className={`w-full transition-colors py-2 px-3 rounded-md font-semibold font-notoKr ${
            myRoleState?.debateRole
              ? "bg-violet-300"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          입장
        </button>
      </form>
    </div>
  );
}
