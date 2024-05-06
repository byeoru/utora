"use client";

import Tiptap from "@/components/editor/tiptap";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { GetMyPostType, editPost } from "@/app/(home)/posts/[id]/edit/actions";
import Button from "../button";
import { postCategories } from "@/lib/constants";

interface EditPostPropsType {
  postId: number;
  oldPost: GetMyPostType;
}

export default function EditPost({ postId, oldPost }: EditPostPropsType) {
  const [contentState, setContentState] = useState<string>(
    oldPost?.content ?? ""
  );

  const router = useRouter();
  const onContentChange = (data: string) => {
    setContentState(data);
  };

  const onSubmit = async (formData: FormData) => {
    const isConfirmed = confirm("정말 수정하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    formData.append("content", contentState);
    const result = await editPost(formData, postId);
    if (result?.fieldErrors) {
      const message = result.fieldErrors.content;
      alert(message);
    } else {
      redirect(`/posts/${result?.post?.id}`);
    }
  };
  useEffect(() => {
    if (!oldPost) {
      alert("존재하지 않는 게시글입니다.");
      router.back();
      return;
    }
  }, [oldPost, router]);
  return (
    <div className="w-full mx-auto max-w-screen-md p-2 sm:mt-8 lg:mt-12">
      <h1 className="font-jua text-lg sm:text-2xl text-primary">
        게시글 수정하기
      </h1>
      <form className="flex flex-col" action={onSubmit}>
        <input
          value={oldPost?.title}
          disabled
          className="w-full opacity-40 rounded-md mb-2 border-none ring-1 focus:ring-slate-500 ring-slate-500 focus:outline-none font-notoKr"
        />
        <select disabled className="mb-2 opacity-40 rounded-md">
          <option>{postCategories[oldPost?.category ?? ""].title}</option>
        </select>
        <Tiptap
          onChange={(data: string) => onContentChange(data)}
          content={contentState}
        />
        <Button className="mt-2 p-5 rounded-md">
          <span className="font-notoKr text-white">수정 완료</span>
        </Button>
      </form>
    </div>
  );
}
