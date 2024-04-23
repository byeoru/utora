"use client";

import { Send } from "lucide-react";
import Button from "../../button";
import { useEffect, useRef, useState } from "react";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import {
  GetDebateSupportMessagesType,
  saveDebateSupportMessage,
} from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import { EDebateRole } from "@prisma/client";
import { SUPABASE_URL } from "@/lib/constants";

interface SupportChatListPropsType {
  supabasePublicKey: string;
  supportChatRoomName: string;
  initiaSupportMessages: GetDebateSupportMessagesType;
  debateRoomId: string;
  debateRole: EDebateRole;
  userId: number;
  nickname: string;
  channelName: string;
}

export default function SupportChatList({
  supabasePublicKey,
  supportChatRoomName,
  initiaSupportMessages,
  debateRoomId,
  debateRole,
  userId,
  nickname,
  channelName,
}: SupportChatListPropsType) {
  const [supportMessages, setSupportMessages] = useState(initiaSupportMessages);
  const [sendSupportMessage, setSendSupportMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const onSupportMsgChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;
    setSendSupportMessage(value);
  };
  const onSupportMsgSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSendSupportMessage("");
    await saveDebateSupportMessage(
      debateRoomId,
      sendSupportMessage,
      debateRole
    );
    await channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: sendSupportMessage,
        room: "debate",
        created_at: new Date(),
        debate_role: debateRole,
        user_id: userId,
        user: {
          nickname,
        },
      },
    });
    setSupportMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: sendSupportMessage,
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
        setSupportMessages((prevMsgs) => [...prevMsgs, recievedData]);
      })
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [debateRoomId, supabasePublicKey, channelName]);
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="w-full px-3 py-1 font-doHyeon bg-slate-100">
        {supportChatRoomName}
      </span>
      <div className="w-full relative pb-24 flex lg:flex-1 aspect-square">
        <div className="w-full flex flex-col flex-1 p-3">
          {supportMessages.map((msg) => (
            <div key={msg.id} className="">
              {msg.payload}
            </div>
          ))}
        </div>
        <form
          onSubmit={onSupportMsgSubmit}
          className="w-full flex gap-1 absolute bottom-0 left-0 shadow-md"
        >
          <textarea
            value={sendSupportMessage}
            onChange={onSupportMsgChange}
            className="w-full h-24 resize-none border-none focus:ring-0"
          />
          <Button className="p-5">
            <Send className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
