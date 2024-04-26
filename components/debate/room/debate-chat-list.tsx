"use client";

import {
  GetDebateMessagesType,
  saveDebateMessage,
} from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import { EDebateRole } from "@prisma/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import Button from "../../button";
import DebateInfoBox from "./debate-info-box";
import LeftSideDebateBubble from "./left-side-debate-bubble";
import RightSideDebateBubble from "./right-side-debate-bubble";
import { Supabase } from "@/lib/supabase";
import useStateWithCallback from "use-state-with-callback";

interface DebateChatListPropsType {
  supabasePublicKey: string;
  debateRoomId: string;
  userId: number;
  nickname: string;
  debateRole: EDebateRole;
  debateRoleKr: string;
  topicTitle: string;
  proposeReason: string;
  initialDebateMessages: GetDebateMessagesType;
  channelName: string;
}

export default function DebateChatList({
  supabasePublicKey,
  debateRoomId,
  userId,
  nickname,
  debateRole,
  debateRoleKr,
  topicTitle,
  proposeReason,
  initialDebateMessages,
  channelName,
}: DebateChatListPropsType) {
  const [debateMessages, setDebateMessages] = useStateWithCallback(
    initialDebateMessages,
    () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  );
  const [sendDebateMessage, setSendDebateMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const onDebateMsgChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setSendDebateMessage(value);
  };
  const onDebateMsgSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSendDebateMessage("");
    await saveDebateMessage(
      debateRoomId,
      sendDebateMessage,
      debateRole,
      debateRoleKr
    );
    await channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: sendDebateMessage,
        room: "debate",
        created_at: new Date(),
        debate_role: debateRole,
        debate_role_kr: debateRoleKr,
        user_id: userId,
        user: {
          nickname,
        },
      },
    });
    setDebateMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: sendDebateMessage,
        created_at: new Date(),
        debate_role: debateRole,
        debate_role_kr: debateRoleKr,
        user_id: userId,
        user: {
          nickname,
        },
      },
    ]);
  };
  const isRightSide = (myRole: EDebateRole, bubbleRole: EDebateRole) => {
    switch (myRole) {
      case "Proponent":
      case "ProponentSupporter":
        if (bubbleRole === "Proponent") return true;
        else return false;
      case "Opponent":
      case "OpponentSupporter":
      case "Audience":
        if (bubbleRole === "Opponent") return true;
        else return false;
    }
  };
  useEffect(() => {
    channel.current =
      Supabase.getClient(supabasePublicKey).channel(channelName);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        const recievedData = payload.payload;
        setDebateMessages((prevMsgs) => [...prevMsgs, recievedData]);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [debateRoomId, channelName, supabasePublicKey, setDebateMessages]);
  return (
    <div className="w-full lg:h-full flex flex-col gap-2">
      <span className="w-full px-3 py-1 font-doHyeon bg-slate-100">토론방</span>
      <div
        className={`w-full flex-1 flex overflow-y-auto relative shadow-md ${
          debateRole === "Proponent" || debateRole === "Opponent" ? "pb-24" : ""
        }`}
      >
        <div
          ref={scrollRef}
          className="w-full h-[30rem] border lg:h-full p-3 flex flex-col gap-2 overflow-y-auto"
        >
          {debateMessages.map((msg) =>
            isRightSide(debateRole, msg.debate_role) ? (
              <RightSideDebateBubble
                key={msg.id}
                nickname={msg.user?.nickname}
                debateRoleKr={msg.debate_role_kr}
                createdAt={msg.created_at}
                payload={msg.payload}
              />
            ) : (
              <LeftSideDebateBubble
                key={msg.id}
                nickname={msg.user?.nickname}
                debateRoleKr={msg.debate_role_kr}
                createdAt={msg.created_at}
                payload={msg.payload}
              />
            )
          )}
        </div>
        {debateRole === "Proponent" || debateRole === "Opponent" ? (
          <form
            onSubmit={onDebateMsgSubmit}
            className="w-full border absolute bottom-0 left-0 flex gap-1"
          >
            <textarea
              value={sendDebateMessage}
              onChange={onDebateMsgChange}
              className="w-full h-24 resize-none border-none focus:ring-0"
            />
            <Button className="p-5">
              <Send className="size-5" />
            </Button>
          </form>
        ) : null}
      </div>
      <DebateInfoBox
        topicTitle={topicTitle}
        proposeReason={proposeReason}
        myNickname={nickname}
        debateRoleKr={debateRoleKr}
      />
    </div>
  );
}
