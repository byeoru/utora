"use client";

import Tiptap from "@/components/editor/tiptap";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { post } from "./actions";
import { postCategories } from "@/lib/constants";
import { redirect } from "next/navigation";

export default function PostAdd() {
  const [content, setContent] = useState<string>("");
  const { pending } = useFormStatus();
  const onContentChange = (data: string) => {
    setContent(data);
  };

  const onSubmit = async (formData: FormData) => {
    formData.append("content", content);
    const result = await post(formData);
    if (result?.fieldErrors) {
      const message = `${result.fieldErrors.title ?? ""}\n${
        result.fieldErrors.content ?? ""
      }\n${result.fieldErrors.postCategory ?? ""}`;
      alert(message);
    } else {
      redirect(`/posts/${result?.post?.id}`);
    }
  };
  return (
    <div className="w-full mx-auto max-w-screen-md p-2 sm:mt-8 lg:mt-12">
      <h1 className="font-jua text-lg sm:text-2xl text-primary">
        게시판 글쓰기
      </h1>
      <form className="flex flex-col" action={onSubmit}>
        <input
          name="title"
          type="text"
          placeholder="제목을 입력하세요."
          className="w-full rounded-md mb-2 border-none ring-1 focus:ring-slate-500 ring-slate-500 focus:outline-none font-notoKr"
        />
        <select name="postCategory" className="mb-2 rounded-md">
          <option key="default" value="none">
            카테고리를 선택하세요
          </option>
          {Object.keys(postCategories).map((category, index) => (
            <option key={index} value={category}>
              {postCategories[category].title}
            </option>
          ))}
        </select>
        <Tiptap
          onChange={(data: string) => onContentChange(data)}
          content={content}
        />
        <button
          className="mt-2 p-2 bg-primary text-white rounded-md"
          disabled={pending}
        >
          작성 완료
        </button>
      </form>
    </div>
  );
}
