"use client";

import { useFormState } from "react-dom";
import { createTopic } from "./actions";
import { EDebateCategory } from "@prisma/client";
import Button from "@/components/button";
import { redirect } from "next/navigation";
import { categories } from "@/lib/constants";

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
    <div className="mx-auto max-w-screen-md px-3">
      <h1 className="font-jua text-lg lg:text-2xl text-primary mb-5 mt-10">
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
        <Button
          text={<span className="font-notoKr text-white">작성완료</span>}
        />
        <span>{state?.fieldErrors.category}</span>
      </form>
    </div>
  );
}
