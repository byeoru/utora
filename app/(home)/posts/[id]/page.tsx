import { notFound } from "next/navigation";
import { getPost } from "./actions";
import { formatToTimeAgo } from "@/lib/utils";
import Divider from "@/components/divider";

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const post = await getPost(id);
  if (!post) {
    return notFound();
  }
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="px-2 py-1 border-b-2 border-slate-200 bg-primary shadow-md block">
        <h1 className="font-doHyeon text-2xl">자유게시판</h1>
      </div>
      <div className="flex flex-col gap-10 p-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-notoKr">{post.title}</h2>
          <div className="text-sm flex gap-5 text-gray-500">
            <span>{`작성자: ${post.user.nickname}`}</span>
            <span>{formatToTimeAgo(post.created_at)}</span>
          </div>
        </div>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
