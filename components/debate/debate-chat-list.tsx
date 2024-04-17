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
import { Dot, Send } from "lucide-react";
import Button from "../button";

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
  let subChatRoomName;
  switch (debateRole) {
    case "Audience":
      subChatRoomName = "댓글";
      break;
    case "Proponent":
    case "ProponentSupporter":
      subChatRoomName = "찬성측 회의실";
      break;
    case "Opponent":
    case "OpponentSupporter":
      subChatRoomName = "반대측 회의실";
      break;
  }
  return (
    <div className="w-full lg:h-full pb-5 lg:p-2 flex flex-col lg:flex-row gap-5 max-w-screen-2xl">
      <div className="w-full flex flex-col gap-2">
        <span className="w-full px-3 py-1 font-doHyeon bg-slate-100">
          토론방
        </span>
        <div
          className={`w-full lg:flex-1 relative aspect-square bg-slate-100 shadow-md ${
            debateRole === "Proponent" || debateRole === "Opponent"
              ? "pb-24"
              : ""
          }`}
        >
          {debateRole === "Proponent" || debateRole === "Opponent" ? (
            <form className="w-full absolute bottom-0 left-0 flex gap-1">
              <textarea className="w-full h-24 resize-none border-none focus:ring-0" />
              <Button className="p-5">
                <Send className="size-5" />
              </Button>
            </form>
          ) : null}
        </div>
        <div className="w-full p-3 bg-slate-100 flex flex-col gap-2 shadow-md">
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
          <span className="mt-3 text-sm font-notoKr flex items-center">
            <Dot className="text-green-500 size-7" />
            <span className="">
              {`${nickname}님은 현재 `}
              <span className="text-violet-500 decoration-dotted underline underline-offset-2 font-semibold">
                {debateRoleKr}
              </span>
              <span>(으)로 참여중입니다</span>
            </span>
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <span className="w-full px-3 py-1 font-doHyeon bg-slate-100">
          {subChatRoomName}
        </span>
        <div className="w-full relative flex lg:flex-1 aspect-square bg-slate-100">
          <form className="w-full flex gap-1 absolute bottom-0 left-0 shadow-md">
            <textarea className="w-full h-24  resize-none border-none focus:ring-0" />
            <Button className="p-5">
              <Send className="size-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
