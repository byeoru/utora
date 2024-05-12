"use client";

import { formatToTimeAgo } from "@/lib/utils";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Button from "../button";
import {
  COMMENTS_FETCH_SIZE,
  COMMENT_SAVE_ERROR,
  FETCH_COMMENTS_ERROR,
  MAX_COMMENT_INDENT,
} from "@/lib/constants";
import {
  CommentsType,
  SaveCommentType,
  deleteComment,
  getComments,
  saveComment,
} from "@/app/(home)/(use-side-nav)/posts/[id]/actions";
import { CornerDownRight, MessageSquareText } from "lucide-react";

interface CommentItemPropsType {
  id: number;
  postId: number;
  commentUserId: number | null;
  sessionId: number;
  indent: number;
  isDeleted: boolean;
  parentCommentId: number | null;
  childCommentsCount: number;
  nickname?: string;
  content: string | null;
  createdAt: Date;
  increaseTotalCommentsCount: () => void;
  decreaseTotalCommentsCount: () => void;
  onDelete: (id: number, parentId: number | null) => Promise<void>;
}

export default function CommentItem({
  id,
  postId,
  commentUserId,
  sessionId,
  indent,
  isDeleted,
  parentCommentId,
  childCommentsCount,
  nickname,
  content,
  createdAt,
  onDelete,
  increaseTotalCommentsCount,
  decreaseTotalCommentsCount,
}: CommentItemPropsType) {
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [showChildComments, setShowChildComments] = useState<boolean>(false);
  const [mySubcommentState, setMySubcommentState] = useState<string>("");
  const [subcommentPageState, setSubcommentPageState] = useState<number>(1);
  const [childComments, setChildComments] = useState<CommentsType[]>([]);
  const [childCountState, setChildCountState] =
    useState<number>(childCommentsCount);
  const lastPage = Math.ceil(childCountState / COMMENTS_FETCH_SIZE);

  const onCancelClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (mySubcommentState.length > 0) {
      const isConfirmed = confirm(
        "작성 중인 댓글이 있습니다. 정말 취소하시겠습니까?"
      );
      if (!isConfirmed) {
        return;
      }
    }
    setMySubcommentState("");
    setShowTextarea(false);
  };
  const onSubmitClick = async (formData: FormData) => {
    const saveResult: SaveCommentType = await saveComment(formData, postId, id);
    if (!saveResult) {
      alert(COMMENT_SAVE_ERROR);
      return;
    }
    setMySubcommentState("");
    if (saveResult.comment) {
      setChildCountState((prev) => prev + 1);
      increaseTotalCommentsCount();
    }
  };
  const onCommentDelete = async (id: number, parentId: number | null) => {
    const isConfirmed = confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    const result = await deleteComment(postId, id, parentId);
    if (!result) {
      alert("댓글 삭제에 실패하였습니다.");
      return;
    }
    if (result.child_comments_count > 0) {
      // row 보존
      setChildComments((prev) => [
        ...prev.map((comment) => {
          if (comment.id === id) {
            comment.content === "[삭제된 댓글입니다]";
            comment.is_deleted = true;
            return comment;
          }
          return comment;
        }),
      ]);
    } else {
      // row 삭제
      setChildComments((prev) => [
        ...prev.filter((comment) => comment.id !== id),
      ]);
      decreaseTotalCommentsCount();
      setChildCountState((prev) => prev - 1);
    }
  };
  const onSubcommentChange = (evnet: ChangeEvent<HTMLTextAreaElement>) => {
    setMySubcommentState(evnet.target.value);
  };
  const onChildCommentsClick = async () => {
    if (showChildComments) {
      // 닫기
      setChildComments([]);
      setSubcommentPageState(1);
    } else {
      // 열기
      const children = await getComments(postId, 1, id);
      if (!children) {
        alert(FETCH_COMMENTS_ERROR);
        return;
      }
      setChildComments((prev) => [...children, ...prev]);
    }

    setShowChildComments((prev) => !prev);
  };
  const onMoreFetchClick = async () => {
    const comments = await getComments(postId, subcommentPageState + 1, id);
    if (!comments) {
      alert(FETCH_COMMENTS_ERROR);
      return;
    }
    setChildComments((prev) => [...prev, ...comments]);
    setSubcommentPageState((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full rounded-lg flex gap-2 justify-between">
        {/* <div className="flex flex-col gap-1 items-center">
        <div className="size-7 sm:size-9 bg-slate-200 rounded-full"></div>
      </div> */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex items-center gap-2 font-jua">
            <span className="text-sm">{nickname ?? "@탈퇴한 계정"}</span>
            <span className="text-xs text-slate-400">
              {formatToTimeAgo(createdAt)}
            </span>
          </div>
          <span
            className={`text-sm font-notoKr ${
              isDeleted ? "text-stone-400 font-semibold" : "text-black"
            }`}
          >
            {isDeleted ? "[삭제된 댓글입니다]" : content}
          </span>
        </div>
      </div>
      <div className="flex gap-3 text-xs font-notoKr font-medium">
        {indent < MAX_COMMENT_INDENT ? (
          <button
            onClick={() => setShowTextarea((prev) => !prev)}
            className="text-slate-400"
          >
            답글
          </button>
        ) : null}
        <button
          disabled={childCountState === 0}
          onClick={onChildCommentsClick}
          className="flex gap-1 items-center text-slate-400"
        >
          <MessageSquareText className="size-3" />
          <span className="font-jua">{childCountState}</span>
        </button>
        {sessionId === commentUserId && !isDeleted ? (
          <button
            onClick={async () => await onDelete(id, parentCommentId)}
            className="text-red-400"
          >
            삭제
          </button>
        ) : null}
      </div>
      {showTextarea ? (
        <form action={onSubmitClick} className="flex flex-col gap-1">
          <textarea
            value={mySubcommentState}
            onChange={onSubcommentChange}
            name="comment"
            id="comment"
            className="w-full font-notoKr text-sm resize-none bg-slate-50 overflow-hidden border-slate-400 border-t-0 border-l-0 border-r-0 border-b-1 focus:ring-0 focus:border-slate-600"
          />
          <div className="flex self-end">
            <Button
              onClick={onCancelClick}
              className="py-1 px-3 rounded-md bg-white"
            >
              <span className="text-sm font-jua text-red-400">취소</span>
            </Button>
            <Button className="py-1 px-3 rounded-md bg-white">
              <span className="text-sm font-jua">완료</span>
            </Button>
          </div>
        </form>
      ) : null}
      {showChildComments && (
        <div className="w-full flex gap-1 border-l-2">
          <div className="w-full flex flex-col gap-5">
            {childComments.map((childComment) => (
              <div key={`comment: ${childComment.id}`} className="w-full flex">
                <CornerDownRight className="size-5" />
                <CommentItem
                  id={childComment.id}
                  postId={postId}
                  commentUserId={childComment.user_id}
                  sessionId={sessionId}
                  isDeleted={childComment.is_deleted}
                  nickname={childComment.user?.nickname}
                  indent={childComment.indent}
                  parentCommentId={childComment.parent_comment_id}
                  childCommentsCount={childComment.child_comments_count}
                  content={childComment.content}
                  createdAt={childComment.created_at}
                  onDelete={onCommentDelete}
                  increaseTotalCommentsCount={increaseTotalCommentsCount}
                  decreaseTotalCommentsCount={decreaseTotalCommentsCount}
                />
              </div>
            ))}
            {subcommentPageState < lastPage ? (
              <div className="flex pl-5 text-xs font-notoKr font-medium underline underline-offset-2">
                <button onClick={onMoreFetchClick}>더 보기</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
