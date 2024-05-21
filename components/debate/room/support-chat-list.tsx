"use client";

import { Send } from "lucide-react";
import Button from "../../button";
import { useEffect, useRef, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import {
  GetDebateSupportMessagesType,
  getDebateSupportMessages,
  saveDebateSupportMessage,
} from "@/app/(main)/(use-side-nav)/debate/[id]/actions";
import { EDebateRole } from "@prisma/client";
import RightSideSupportBubble from "./right-side-support-bubble";
import LeftSideSupportBubble from "./left-side-support-bubble";
import { Supabase } from "@/lib/supabase";

interface SupportChatListPropsType {
  supabasePublicKey: string;
  supportChatRoomName: string;
  initialSupportMessages: GetDebateSupportMessagesType;
  debateRoomId: string;
  debateRole: EDebateRole;
  userId: number;
  nickname: string;
  channelName: string;
}

export default function SupportChatList({
  supabasePublicKey,
  supportChatRoomName,
  initialSupportMessages,
  debateRoomId,
  debateRole,
  userId,
  nickname,
  channelName,
}: SupportChatListPropsType) {
  const [supportMessages, setSupportMessages] = useState(
    initialSupportMessages.toReversed()
  );
  const [sendSupportMessage, setSendSupportMessage] = useState("");
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const trigger = useRef<HTMLSpanElement>(null);
  const channel = useRef<RealtimeChannel>();
  const scrollRef = useRef<HTMLDivElement>(null);
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
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newMessages = await getDebateSupportMessages(
            debateRoomId,
            page + 1
          );
          if (newMessages.length !== 0) {
            setPage((prev) => prev + 1);
            setSupportMessages((prev) => [
              ...newMessages.toReversed(),
              ...prev,
            ]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  useEffect(() => {
    channel.current =
      Supabase.getClient(supabasePublicKey).channel(channelName);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        const recievedData = payload.payload;
        setSupportMessages((prevMsgs) => [...prevMsgs, recievedData]);
      })
      .subscribe();
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    return () => {
      channel.current?.unsubscribe();
    };
  }, [debateRoomId, channelName, supabasePublicKey, setSupportMessages]);
  useEffect(() => {
    if (!scrollRef) return;
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollHeight - scrollHeight;
      scrollRef.current.scrollTop = scrollTop;
      setScrollHeight(scrollRef.current.scrollHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportMessages.length && page]);
  return (
    <div className="w-full lg:h-full flex flex-col gap-2">
      <span className="w-full px-3 py-1 font-doHyeon bg-slate-100">
        {supportChatRoomName}
      </span>
      <div className="w-full relative pb-24 flex lg:flex-1 overflow-y-auto">
        <div
          ref={scrollRef}
          className="w-full h-[30rem] border lg:h-full overflow-y-auto flex flex-col flex-1 p-3"
        >
          {isLastPage ? null : (
            <span
              ref={trigger}
              className="text-sm font-semibold text-slate-500 font-jua mx-auto"
            >
              {isLoading ? "불러오는 중" : ""}
            </span>
          )}
          {supportMessages.map((msg) =>
            userId === msg.user_id ? (
              <RightSideSupportBubble
                key={msg.id}
                nickname={msg.user?.nickname}
                debateRoleKr={
                  msg.debate_role === "Opponent" ||
                  msg.debate_role === "Proponent"
                    ? "토론자"
                    : "서포터"
                }
                createdAt={msg.created_at}
                payload={msg.payload}
              />
            ) : (
              <LeftSideSupportBubble
                key={msg.id}
                nickname={msg.user?.nickname}
                debateRoleKr={
                  msg.debate_role === "Opponent" ||
                  msg.debate_role === "Proponent"
                    ? "토론자"
                    : "서포터"
                }
                createdAt={msg.created_at}
                payload={msg.payload}
              />
            )
          )}
        </div>
        <form
          onSubmit={onSupportMsgSubmit}
          className="w-full flex gap-1 border absolute bottom-0 left-0 shadow-md"
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
