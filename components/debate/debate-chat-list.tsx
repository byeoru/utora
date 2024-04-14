"use client";

import { GetDebateRoomMessagesType } from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import { SUPABASE_URL } from "@/lib/constants";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

interface DebateChatListPropsType {
  supabasePublicKey: string;
  debateRoomId: string;
  userId: number;
  nickname: string;
  initialMessages: GetDebateRoomMessagesType;
}

export default function DebateChatList({
  supabasePublicKey,
  debateRoomId,
  userId,
  nickname,
  initialMessages,
}: DebateChatListPropsType) {
  const [allMessages, setAllMessages] = useState(initialMessages);
  const [sendMessage, setSendMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setSendMessage(value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAllMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: sendMessage,
        created_at: new Date(),
        user_id: userId,
        user: {
          nickname,
        },
      },
    ]);
  };
  useEffect(() => {
    const client = createClient(SUPABASE_URL, supabasePublicKey);
    channel.current = client.channel(`debate-room-${debateRoomId}`);
    channel.current.on("broadcast", { event: "message" }, (payload) => {
      setAllMessages((prevMsgs) => [...prevMsgs, payload.payload]);
    });
    return () => {
      channel.current?.unsubscribe();
    };
  }, [debateRoomId, supabasePublicKey]);
  return <div className="w-full bg-red-100 flex"></div>;
}
