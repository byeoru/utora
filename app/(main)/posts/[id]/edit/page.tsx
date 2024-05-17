import EditPost from "@/components/post/edit-post";
import { getMyPost } from "./actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "게시물 수정",
};

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const oldPost = await getMyPost(id);
  return <EditPost postId={id} oldPost={oldPost} />;
}
