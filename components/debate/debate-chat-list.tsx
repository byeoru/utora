"use client";

import {
  GetDebateRoomMessagesType,
  GetDebateRoomTopicInfoType,
} from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import { SUPABASE_URL } from "@/lib/constants";
import { EDebateRole } from "@prisma/client";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import Divider from "../divider";

interface DebateChatListPropsType {
  supabasePublicKey: string;
  debateRoomId: string;
  userId: number;
  nickname: string;
  debateRole: EDebateRole;
  debateRoleKr: string;
  initialMessages: GetDebateRoomMessagesType;
  topicInfo: GetDebateRoomTopicInfoType;
}

export default function DebateChatList({
  supabasePublicKey,
  debateRoomId,
  userId,
  nickname,
  debateRole,
  debateRoleKr,
  initialMessages,
  topicInfo,
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
  return (
    <div className="w-full flex flex-col lg:flex-row gap-5 max-w-screen-2xl">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full relative aspect-square bg-slate-100">
          <textarea className="w-full h-24 absolute bottom-0 left-0 resize-none border-none focus:ring-0 shadow-md" />
        </div>
        <div className="w-full h-36 p-3 bg-slate-100 flex flex-col gap-2">
          <span className="text-base">
            <span className="font-jua ">토론 주제: </span>
            <span className="font-notoKr font-semibold text-gray-600">
              {topicInfo?.topic}
            </span>
          </span>
          <Divider />
          <span className="text-sm">
            <span className="font-jua">주제 제시 배경:</span>
            <p className="font-notoKr text-gray-600">
              {topicInfo?.propose_reason}
            </p>
          </span>
        </div>
      </div>
      <div className="w-full relative aspect-square bg-slate-100">
        <textarea className="w-full h-24 absolute bottom-0 left-0 resize-none border-none focus:ring-0 shadow-md" />
      </div>
    </div>
  );
}
