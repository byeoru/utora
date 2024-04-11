"use client";

import { SUPABASE_URL } from "@/lib/constants";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

interface DebateChatListPropsType {
  supabaseKey: string;
}

export default function DebateChatList({
  supabaseKey,
}: DebateChatListPropsType) {
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();

  return <div></div>;
}
