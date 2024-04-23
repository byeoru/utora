"use client";

import {
  GetDebateMessagesType,
  saveDebateMessage,
} from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import { SUPABASE_URL } from "@/lib/constants";
import { EDebateRole } from "@prisma/client";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import Button from "../../button";
import DebateInfoBox from "./debate-info-box";
import { formatToTimeAgo } from "@/lib/utils";

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
  const [debateMessages, setDebateMessages] = useState(initialDebateMessages);
  const [sendDebateMessage, setSendDebateMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const onDebateMsgChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setSendDebateMessage(value);
  };
  const onDebateMsgSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSendDebateMessage("");
    await saveDebateMessage(debateRoomId, sendDebateMessage, debateRole);
    await channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: sendDebateMessage,
        room: "debate",
        created_at: new Date(),
        debate_role: debateRole,
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
        setDebateMessages((prevMsgs) => [...prevMsgs, recievedData]);
      })
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [debateRoomId, supabasePublicKey, channelName]);
  const isAvailableExtentMessage = (
    prevIndex: number,
    currentIndex: number
  ) => {
    return (
      currentIndex > 0 &&
      debateMessages[prevIndex].user_id ===
        debateMessages[currentIndex].user_id &&
      Math.abs(
        debateMessages[currentIndex].created_at.getTime() -
          debateMessages[prevIndex].created_at.getTime()
      ) < 60000
    );
  };
  return (
    <div className="w-full lg:h-full flex flex-col gap-2">
      <span className="w-full px-3 py-1 font-doHyeon bg-slate-100">토론방</span>
      <div
        className={`w-full flex-1 flex overflow-y-auto relative shadow-md ${
          debateRole === "Proponent" || debateRole === "Opponent" ? "pb-24" : ""
        }`}
      >
        <div className="w-full flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
          {debateMessages.map((msg, index) =>
            debateRole === msg.debate_role ? (
              <div
                key={msg.id}
                className="flex flex-col self-end p-1 ml-24 gap-1"
              >
                {isAvailableExtentMessage(index - 1, index) ? null : (
                  <span className="px-2 py-1 flex justify-end font-jua text-xs gap-3 rounded-sm">
                    <span className="text-primary">{debateRoleKr}</span>
                    <span className="text-slate-600">
                      발언자: {msg.user?.nickname}
                    </span>
                    <span className="text-slate-500">
                      {formatToTimeAgo(msg.created_at)}
                    </span>
                  </span>
                )}
                <span className="flex justify-end">
                  <span className="text-xs py-2 px-3 shadow-md rounded-md font-notoKr font-semibold">
                    {msg.payload}
                  </span>
                </span>
              </div>
            ) : (
              <div key={msg.id} className="flex flex-col p-1 mr-24 gap-1">
                {isAvailableExtentMessage(index - 1, index) ? null : (
                  <span className="px-2 py-1 flex font-jua text-xs gap-3 rounded-sm">
                    <span className="text-primary">{debateRoleKr}</span>
                    <span className="text-slate-600">
                      발언자: {msg.user?.nickname}
                    </span>
                    <span className="text-slate-500">
                      {formatToTimeAgo(msg.created_at)}
                    </span>
                  </span>
                )}
                <span className="flex">
                  <span className="text-xs py-2 px-3 shadow-md rounded-md font-notoKr font-semibold">
                    {msg.payload}
                  </span>
                </span>
              </div>
            )
          )}
        </div>
        {debateRole === "Proponent" || debateRole === "Opponent" ? (
          <form
            onSubmit={onDebateMsgSubmit}
            className="w-full absolute bottom-0 left-0 flex gap-1"
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
