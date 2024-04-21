"use client";

import { Send } from "lucide-react";
import Button from "../../button";
import { useEffect, useRef, useState } from "react";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import {
  GetDebateCommentMessagesType,
  saveDebateCommentMessage,
} from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import { EDebateRole } from "@prisma/client";
import { SUPABASE_URL } from "@/lib/constants";

interface CommentChatListPropsType {
  supabasePublicKey: string;
  commentChatRoomName: string;
  initiaCommentMessages: GetDebateCommentMessagesType;
  debateRoomId: string;
  debateRole: EDebateRole;
  userId: number;
  nickname: string;
  channelName: string;
}

export default function CommentChatList({
  supabasePublicKey,
  commentChatRoomName,
  initiaCommentMessages,
  debateRoomId,
  debateRole,
  userId,
  nickname,
  channelName,
}: CommentChatListPropsType) {
  const [commentMessages, setCommentMessages] = useState(initiaCommentMessages);
  const [sendCommentMessage, setSendCommentMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const onCommentMsgChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;
    setSendCommentMessage(value);
  };
  const onCommentMsgSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSendCommentMessage("");
    await saveDebateCommentMessage(
      debateRoomId,
      sendCommentMessage,
      debateRole
    );
    await channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: sendCommentMessage,
        room: "debate",
        created_at: new Date(),
        debate_role: debateRole,
        user_id: userId,
        user: {
          nickname,
        },
      },
    });
    setCommentMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: sendCommentMessage,
        created_at: new Date(),
        debate_role: debateRole,
        user_id: userId,
        user: {
          nickname,
        },
      },
    ]);
  };
  useEffect(() => {
    const client = createClient(SUPABASE_URL, supabasePublicKey);
    channel.current = client.channel(channelName);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        const recievedData = payload.payload;
        setCommentMessages((prevMsgs) => [...prevMsgs, recievedData]);
      })
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [debateRoomId, supabasePublicKey, channelName]);
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="w-full px-3 py-1 font-doHyeon bg-slate-100">
        {commentChatRoomName}
      </span>
      <div className="w-full relative pb-24 flex lg:flex-1 aspect-square bg-slate-100">
        <div className="w-full flex flex-col flex-1 p-3">
          {commentMessages.map((msg) => (
            <div key={msg.id}>{msg.payload}</div>
          ))}
        </div>
        <form
          onSubmit={onCommentMsgSubmit}
          className="w-full flex gap-1 absolute bottom-0 left-0 shadow-md"
        >
          <textarea
            value={sendCommentMessage}
            onChange={onCommentMsgChange}
            className="w-full h-24  resize-none border-none focus:ring-0"
          />
          <Button className="p-5">
            <Send className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}