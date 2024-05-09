"use client";

import { deletePost } from "@/app/(home)/(use-side-nav)/posts/[id]/actions";
import { useRouter, useSearchParams } from "next/navigation";

interface DeletePostButtonPropsType {
  postId: number;
}

export default function DeletePostButton({
  postId,
}: DeletePostButtonPropsType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const onClick = async () => {
    const isConfirmed = confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    await deletePost(postId);
    const newQuery = new URLSearchParams(searchParams);
    router.replace(`/posts?${newQuery}`);
  };
  return <button onClick={onClick}>삭제</button>;
}
