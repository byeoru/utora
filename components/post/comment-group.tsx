"use client";

import { useFormState } from "react-dom";
import Button from "../button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CommentItem from "./comment-item";
import {
  COMMENT_SAVE_ERROR,
  DELETE_COMPLETE,
  FETCH_COMMENTS_ERROR,
  FETCH_COMMENTS_SIZE,
  MAX_LENGTH_MY_COMMENT,
} from "@/lib/constants";
import {
  CommentsType,
  SaveCommentType,
  deleteComment,
  getComments,
  saveComment,
} from "@/app/(home)/(use-side-nav)/posts/[id]/actions";

interface CommentGroupPropsType {
  commentsCount: number;
  postId: number;
  sessionId: number;
}

export default function CommentGroup({
  postId,
  commentsCount,
  sessionId,
}: CommentGroupPropsType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onSubmit = async (_: any, formData: FormData) => {
    const saveResult: SaveCommentType = await saveComment(formData, postId);
    if (!saveResult) {
      alert(COMMENT_SAVE_ERROR);
      return;
    }
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    if (saveResult.comment) {
      setCommentsState((prev) => [saveResult.comment, ...prev]);
      setCommentsCountState((prev) => prev + 1);
    }
    return saveResult;
  };
  const [state, action] = useFormState(onSubmit, null);
  const [myCommentState, setMyCommentState] = useState<string>("");
  const [commentLengthState, setCommentLengthState] = useState<number>(0);
  const [commentsState, setCommentsState] = useState<CommentsType[]>([]);
  const [commentsCountState, setCommentsCountState] =
    useState<number>(commentsCount);
  useEffect(() => {
    (async () => {
      const comments = await getComments(postId, 0);
      if (!comments) {
        alert(FETCH_COMMENTS_ERROR);
      } else {
        setCommentsState(comments);
      }
    })();
  }, [commentsCountState, postId]);
  const commentChange = (evnet: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = evnet.target.value;
    if (comment.length > MAX_LENGTH_MY_COMMENT) {
      return;
    }
    setMyCommentState(comment);
    setCommentLengthState(comment.length);
  };
  const onCommentDelete = async (id: number) => {
    const result = await deleteComment(id);
    if (result) {
      alert(DELETE_COMPLETE);
      setCommentsCountState((prev) => prev - 1);
    }
  };

  const pageCountList: number[] = Array.from(
    { length: Math.ceil(commentsCountState / FETCH_COMMENTS_SIZE) },
    (_, index) => index
  );

  const onPageCountClick = async (pageCount: number) => {
    const comments = await getComments(postId, pageCount);
    if (!comments) {
      alert(FETCH_COMMENTS_ERROR);
      return;
    }
    setCommentsState(comments);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-5 text-slate-500">
      <form action={action} className="flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          onChange={commentChange}
          value={myCommentState}
          name="comment"
          id="comment"
          className="w-full font-notoKr text-sm resize-none h-24 rounded-md overflow-hidden border-none focus:ring-0 bg-slate-200"
        />
        {state?.formErrors ? (
          <span className="text-red-600 text-sm">
            {state.formErrors.toString()}
          </span>
        ) : null}
        <span className="text-xs self-end font-jua">
          {commentLengthState} / {MAX_LENGTH_MY_COMMENT}
        </span>
        <div className="w-full sm:w-32 self-end">
          <Button className="w-full rounded-md">
            <span className="text-white font-jua">작성완료</span>
          </Button>
        </div>
      </form>
      <span className="font-jua text-lg">{`댓글 수: ${commentsCountState}`}</span>
      <div className="w-full flex flex-col font-notoKr">
        {commentsState.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            nickname={comment.user?.nickname}
            content={comment.content}
            createdAt={comment.created_at}
            onDelete={onCommentDelete}
            commentUserId={comment.user_id}
            sessionId={sessionId}
          />
        ))}
      </div>
      <div className="w-full flex justify-center gap-3">
        {pageCountList.map((count, index) => (
          <button
            key={index}
            onClick={async () => await onPageCountClick(count)}
            className="px-2 hover:bg-green-400 transition-colors rounded-md"
          >
            {count + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
