"use client";

import { Component, Fan, Flower } from "lucide-react";
import { EDebateRole, EDebateStatus } from "@prisma/client";
import {
  AUDIENCE_KR,
  AUDIENCE_TEXT,
  DEBATER_KR,
  DEBATE_SUPPORTER_KR,
  NEUTRALITY_KR,
  OPPONENT_KR,
  OPPONENT_SIDE_KR,
  OPPONENT_SUPPORTER_KR,
  OPPONENT_SUPPORTER_TEXT,
  OPPONENT_TEXT,
  PROPONENT_KR,
  PROPONENT_SIDE_KR,
  PROPONENT_SUPPORTER_KR,
  PROPONENT_SUPPORTER_TEXT,
  PROPONENT_TEXT,
} from "@/lib/constants";
import { GetMyDebateRoleType } from "../actions";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { getMyRoleWithRoomStatus, saveMyDebateRole } from "./actions";

export default function SetDebateRole({ params }: { params: { id: string } }) {
  const [myRoleState, setMyRoleState] = useState<GetMyDebateRoleType>(null);
  const [debateStatus, setDebateStatus] = useState<EDebateStatus | null>(null);
  const { pending } = useFormStatus();
  const saveMyRole = async () => {
    if (!myRoleState) {
      alert("참여 포지션 선택하세요.");
      return;
    }
    await saveMyDebateRole(
      params.id,
      myRoleState.debate_role,
      myRoleState.debate_role_kr
    );
    redirect(`/debate/${params.id}`);
  };
  const myInfoCheck = async () => {
    const myInfo = await getMyRoleWithRoomStatus(params.id);
    if (!myInfo) {
      alert("토론방이 존재하지 않습니다.");
      return;
    }
    if (myInfo.joined_user_debate_roles.length > 0) {
      return redirect(`/debate/${params.id}`);
    }
    setDebateStatus(myInfo.status);
  };
  const getStatusDescription = () => {
    switch (debateStatus) {
      case "in_debate":
        return "토론이 진행 중입니다.";
      case "under_evaluation":
        return `토론 평가 중에는 ${AUDIENCE_KR}으로만 새롭게 입장이 가능합니다.`;
      case "end":
        return "토론이 종료되었습니다.";
    }
  };
  useEffect(() => {
    myInfoCheck();
  });
  return (
    <div className="w-full flex flex-col lg:gap-10 justify-center items-center p-2 max-w-screen-xl m-auto ">
      <span className="w-full text-center py-1 rounded-md font-notoKr font-bold">
        {getStatusDescription()}
      </span>
      <div className="w-full flex flex-col lg:flex-row gap-10 py-5">
        <div className="flex flex-col gap-5 items-center bg-slate-50 rounded-md">
          <h2 className="w-full py-2 font-notoKr font-bold lg:text-lg bg-violet-300 text-center rounded-md">
            {PROPONENT_SIDE_KR}
          </h2>
          <div
            className={`w-full lg:h-full grid grid-cols-2 gap-3 ${
              debateStatus !== "in_debate" ? "opacity-30" : ""
            }`}
          >
            <button
              disabled={debateStatus !== "in_debate"}
              onClick={() =>
                setMyRoleState({
                  debate_role: "Proponent",
                  debate_role_kr: PROPONENT_KR,
                })
              }
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debate_role === EDebateRole.Proponent
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg">| {DEBATER_KR}</span>
                <span className="font-notoKr text-sm text-start">
                  {PROPONENT_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debate_role === EDebateRole.Proponent
                    ? "bg-violet-300 text-white *:animate-spin"
                    : ""
                }`}
              >
                <Fan className="size-6" />
              </div>
            </button>
            <button
              disabled={debateStatus !== "in_debate"}
              onClick={() =>
                setMyRoleState({
                  debate_role: "ProponentSupporter",
                  debate_role_kr: PROPONENT_SUPPORTER_KR,
                })
              }
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debate_role === EDebateRole.ProponentSupporter
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg self-center">
                  || {DEBATE_SUPPORTER_KR}
                </span>
                <span className="font-notoKr text-sm text-start">
                  {PROPONENT_SUPPORTER_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debate_role === EDebateRole.ProponentSupporter
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
            {OPPONENT_SIDE_KR}
          </h2>
          <div
            className={`w-full lg:h-full grid grid-cols-2 gap-3 ${
              debateStatus !== "in_debate" ? "opacity-30" : ""
            }`}
          >
            <button
              disabled={debateStatus !== "in_debate"}
              onClick={() =>
                setMyRoleState({
                  debate_role: "Opponent",
                  debate_role_kr: OPPONENT_KR,
                })
              }
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debate_role === EDebateRole.Opponent
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg self-center">
                  | {DEBATER_KR}
                </span>
                <span className="font-notoKr text-sm text-start">
                  {OPPONENT_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debate_role === EDebateRole.Opponent
                    ? "bg-violet-300 text-white *:animate-spin"
                    : ""
                }`}
              >
                <Fan className="size-6" />
              </div>
            </button>
            <button
              disabled={debateStatus !== "in_debate"}
              onClick={() =>
                setMyRoleState({
                  debate_role: "OpponentSupporter",
                  debate_role_kr: OPPONENT_SUPPORTER_KR,
                })
              }
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debate_role === EDebateRole.OpponentSupporter
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg self-center">
                  || {DEBATE_SUPPORTER_KR}
                </span>
                <span className="font-notoKr text-sm text-start">
                  {OPPONENT_SUPPORTER_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debate_role === EDebateRole.OpponentSupporter
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
            {NEUTRALITY_KR}
          </h2>
          <div className="w-full lg:h-full grid grid-cols-1 gap-3">
            <button
              disabled={debateStatus === "end"}
              onClick={() =>
                setMyRoleState({
                  debate_role: "Audience",
                  debate_role_kr: AUDIENCE_KR,
                })
              }
              className={`flex flex-col gap-10 justify-between items-center rounded-md aspect-auto ${
                myRoleState?.debate_role === EDebateRole.Audience
                  ? "ring-2 ring-violet-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 px-2 py-4">
                <span className="font-doHyeon text-lg self-center">
                  | {AUDIENCE_KR}
                </span>
                <span className="font-notoKr text-sm text-start">
                  {AUDIENCE_TEXT}
                </span>
              </div>
              <div
                className={`w-full flex justify-center items-center bg-slate-100 py-4 rounded-b-md transition-colors ${
                  myRoleState?.debate_role === EDebateRole.Audience
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
          disabled={pending || !myRoleState?.debate_role}
          className={`w-full transition-colors py-2 px-3 rounded-md font-semibold font-notoKr ${
            myRoleState?.debate_role
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
