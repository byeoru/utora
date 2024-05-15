"use client";

import { useFormState } from "react-dom";
import { createTopic } from "./actions";
import { EDebateCategory } from "@prisma/client";
import Button from "@/components/button";
import { redirect } from "next/navigation";
import { categories, debateTypes } from "@/lib/constants";

export default function ProposeTopic({
  params,
}: {
  params: { category: string };
}) {
  const onClick = async (_: any, formData: FormData) => {
    formData.append("category", params.category as EDebateCategory);
    const result = await createTopic(formData);
    if (!result?.fieldErrors) {
      redirect(`/vote/categories/${params.category}`);
    }
    return result;
  };
  const [state, action] = useFormState(onClick, null);
  return (
    <div className="w-full mx-auto max-w-screen-md px-3 sm:mt-8 lg:mt-12">
      <h1 className="font-jua text-lg lg:text-2xl text-utora-primary">
        {`분야: ${categories[params.category].title}`}
      </h1>
      <form action={action} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <input
            name="topic"
            type="text"
            placeholder="주제를 입력하세요."
            className="w-full rounded-md border-none ring-1 focus:ring-slate-500 ring-slate-500 focus:outline-none font-notoKr"
          />
          <span className="text-xs text-warn">{state?.fieldErrors.topic}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-notoKr font-medium text-slate-500">
            토론 형식
          </span>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="proponentOpponent"
              name="debateType"
              value="proponentOpponent"
              className="size-3"
              checked
            />
            <label htmlFor="proponentOpponent">
              {debateTypes["proponentOpponent"]}
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <textarea
            name="proposeReason"
            id="proposeReason"
            className="w-full font-notoKr resize-none h-24 rounded-md overflow-hidden focus:border-slate-500 focus:ring-0"
            placeholder="주제 제시 배경을 입력하세요."
          />
          <span className="text-xs text-warn">
            {state?.fieldErrors.proposeReason}
          </span>
        </div>
        <Button className="rounded-md py-1">
          <span className="font-notoKr text-white">작성 완료</span>
        </Button>
        <span>{state?.fieldErrors.category}</span>
      </form>
    </div>
  );
}
