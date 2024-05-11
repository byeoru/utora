"use client";

import { useFormState } from "react-dom";
import Button from "../button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CommentItem from "./comment-item";
import {
  COMMENT_SAVE_ERROR,
  FETCH_COMMENTS_ERROR,
  COMMENTS_FETCH_SIZE,
  MAX_LENGTH_MY_COMMENT,
} from "@/lib/constants";
import {
  CommentsType,
  SaveCommentType,
  deleteComment,
  getComments,
  saveComment,
} from "@/app/(home)/(use-side-nav)/posts/[id]/actions";
import { Pagination } from "@nextui-org/react";

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
  const onSubmit = async (_: any, formData: FormData) => {
    const saveResult: SaveCommentType = await saveComment(
      formData,
      postId,
      null
    );
    if (!saveResult) {
      alert(COMMENT_SAVE_ERROR);
      return;
    }
    setMyCommentState("");
    if (saveResult.comment) {
      setCommentsState((prev) => [saveResult.comment, ...prev]);
      setCommentsCountState((prev) => prev + 1);
    }
    return saveResult;
  };
  const increaseTotalCount = () => {
    setCommentsCountState((prev) => prev + 1);
  };
  const decreaseTotalCount = () => {
    setCommentsCountState((prev) => prev - 1);
  };
  const [state, action] = useFormState(onSubmit, null);
  const [myCommentState, setMyCommentState] = useState<string>("");
  const [commentsState, setCommentsState] = useState<CommentsType[]>([]);
  const [commentsCountState, setCommentsCountState] =
    useState<number>(commentsCount);
  const [currentCommentPage, setCurrentCommentPage] = useState<number>(1);
  const scrollRef = useRef<HTMLSpanElement>(null);

  const commentChange = (evnet: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = evnet.target.value;
    if (comment.length > MAX_LENGTH_MY_COMMENT) {
      return;
    }
    setMyCommentState(comment);
  };
  const onCommentDelete = async (id: number, parentId: number | null) => {
    const isConfirmed = confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    const result = await deleteComment(id, parentId);
    if (!result) {
      alert("댓글 삭제에 실패하였습니다.");
      return;
    }

    if (result.isDeleted) {
      // row 보존
      setCommentsState((prev) => [
        ...prev.map((comment) => {
          if (comment.id === id) {
            comment.content = null;
            comment.isDeleted = true;
            return comment;
          }
          return comment;
        }),
      ]);
    } else {
      // row 삭제
      setCommentsState((prev) => [
        ...prev.filter((comment) => comment.id !== id),
      ]);
    }
    setCommentsCountState((prev) => prev - 1);
  };

  const totalCommentPageCount = Math.ceil(
    commentsCountState / COMMENTS_FETCH_SIZE
  );

  const fetchComments = async () => {
    const comments = await getComments(postId, currentCommentPage, null);
    if (!comments) {
      alert(FETCH_COMMENTS_ERROR);
      return;
    }
    setCommentsState(comments);
  };

  const onPageChange = (page: number) => {
    setCurrentCommentPage(page);
    if (scrollRef.current) {
      // scrollRef.current로 특정 span에 접근하여 스크롤 위치로 이동
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommentPage]);

  return (
    <div className="w-full flex flex-col gap-6 p-5 text-slate-500">
      <form action={action} className="flex flex-col gap-3">
        <textarea
          onChange={commentChange}
          value={myCommentState}
          name="comment"
          id="comment"
          className="w-full h-16 font-notoKr text-sm resize-none bg-slate-50 overflow-hidden border-slate-400 border-t-0 border-l-0 border-r-0 border-b-1 focus:ring-0 focus:border-slate-600"
        />
        {state?.formErrors ? (
          <span className="text-red-600 text-sm">
            {state.formErrors.toString()}
          </span>
        ) : null}
        <span className="text-xs self-end font-jua">
          {myCommentState.length} / {MAX_LENGTH_MY_COMMENT}
        </span>
        <div className="w-full sm:w-32 self-end">
          <Button className="w-full rounded-md py-1">
            <span className="text-white font-jua">작성 완료</span>
          </Button>
        </div>
      </form>
      <span
        ref={scrollRef}
        className="font-jua text-base sm:text-lg"
      >{`댓글 수: ${commentsCountState}`}</span>
      <div className="w-full flex flex-col gap-5">
        {commentsState.map((comment) => (
          <CommentItem
            key={`comment: ${comment.id}`}
            id={comment.id}
            postId={postId}
            nickname={comment.user?.nickname}
            content={comment.content}
            isDeleted={comment.isDeleted}
            createdAt={comment.created_at}
            onDelete={onCommentDelete}
            commentUserId={comment.user_id}
            sessionId={sessionId}
            indent={comment.indent}
            parentCommentId={comment.parent_comment_id}
            childCommentsCount={comment.child_comments_count}
            increaseTotalCommentsCount={increaseTotalCount}
            decreaseTotalCommentsCount={decreaseTotalCount}
          />
        ))}
      </div>
      {totalCommentPageCount > 0 ? (
        <div className="flex justify-center">
          <Pagination
            classNames={{ base: "m-1 p-0" }}
            size="sm"
            isCompact
            total={totalCommentPageCount}
            showControls
            showShadow
            initialPage={1}
            color="success"
            page={currentCommentPage}
            onChange={onPageChange}
          />
        </div>
      ) : null}
    </div>
  );
}
