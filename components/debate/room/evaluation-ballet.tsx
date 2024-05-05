"use client";

import { evaluateDebate } from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import Button from "@/components/button";
import { EEvaluation } from "@prisma/client";
import { useState } from "react";

interface EvaluationBalletPropsType {
  debateRoomId: string;
  evaluationHistory: EEvaluation | null;
}

export default function EvaluationBallet({
  debateRoomId,
  evaluationHistory,
}: EvaluationBalletPropsType) {
  const [evaluationState, setEvaluationState] = useState<EEvaluation | null>(
    null
  );
  const [evaluationHistoryState, setEvaluationHistoryState] =
    useState<EEvaluation | null>(evaluationHistory);
  const onEvaluateClick = async () => {
    if (!evaluationState) {
      alert("찬성 또는 반대를 선택하세요.");
      return;
    }
    const result = await evaluateDebate(debateRoomId, evaluationState);
    if (result.error) {
      alert(result.error);
      return;
    }
    setEvaluationHistoryState(result.evaluation);
  };
  const getEvaluationHistoryKr = () => {
    switch (evaluationHistoryState) {
      case "proponent":
        return "찬성 측";
      case "opponent":
        return "반대 측";
    }
  };
  return (
    <div className="w-full lg:h-full flex flex-col gap-2">
      <span className="w-full px-3 py-1 font-doHyeon bg-slate-100">
        토론 평가
      </span>
      {!evaluationHistoryState ? (
        <div className="w-full flex flex-col gap-5 lg:flex-1 overflow-y-auto">
          <div className="w-full p-3 flex flex-col gap-3 *:rounded-md">
            <button
              onClick={() => setEvaluationState("proponent")}
              className={`p-5 font-notoKr font-bold shadow-md transition-colors ${
                evaluationState === EEvaluation.proponent
                  ? "bg-emerald-300 text-white"
                  : "bg-slate-200 text-black"
              }`}
            >
              찬성
            </button>
            <button
              onClick={() => setEvaluationState("opponent")}
              className={`p-5 font-notoKr font-bold shadow-md transition-colors ${
                evaluationState === EEvaluation.opponent
                  ? "bg-emerald-300 text-white"
                  : "bg-slate-200 text-black"
              }`}
            >
              반대
            </button>
          </div>
          <form action={onEvaluateClick} className="w-full flex flex-col gap-1">
            <Button
              pendingOr={!evaluationState}
              className="p-5 mx-2 rounded-md"
            >
              <span className="font-jua">제출</span>
            </Button>
          </form>
        </div>
      ) : (
        <div className="w-full px-3 py-10 bg-slate-100 shadow-md font-notoKr font-semibold text-sm">
          <span className="text-primary decoration-dotted underline underline-offset-2">
            {getEvaluationHistoryKr()}
          </span>
          <span>에 투표 완료하였습니다.</span>
        </div>
      )}
    </div>
  );
}
