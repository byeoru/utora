import DebateChatList from "@/components/debate/debate-chat-list";

export default function DebateRoom() {
  const supabaseKey = process.env.SUPABASE_KEY!;
  return <DebateChatList supabaseKey={supabaseKey} />;
}
