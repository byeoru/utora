"use client";

import Tiptap from "@/components/editor/tiptap";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { post } from "./actions";

export default function PostAdd() {
  const [content, setContent] = useState<string>("");
  const { pending } = useFormStatus();
  const onContentChange = (data: string) => {
    setContent(data);
  };

  const onSubmit = async (formData: FormData) => {
    formData.append("content", content);
    const result = await post(formData);
    console.log(`result: ${result}`);
    if (result?.fieldErrors) {
      const message = `${result.fieldErrors.title ?? ""}\n${
        result.fieldErrors.content ?? ""
      }`;
      alert(message);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md">
      <h1 className="font-jua text-2xl text-primary mb-5 mt-10">자유게시판</h1>
      <form className="flex flex-col" action={onSubmit}>
        <input
          name="title"
          type="text"
          placeholder="제목을 입력하세요."
          className="w-full rounded-md mb-2 border-none ring-1 focus:ring-slate-500 ring-slate-500 focus:outline-none font-notoKr"
        />
        <Tiptap
          onChange={(data: string) => onContentChange(data)}
          content={content}
        />
        <button
          className="mt-2 p-2 bg-primary text-white rounded-md"
          disabled={pending}
        >
          작성완료
        </button>
      </form>
    </div>
  );
}
