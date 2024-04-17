import {
  getDebateRoomMessages,
  getDebateRoomTopicInfo,
  getMyDebateRole,
  getUserProfile,
} from "./actions";
import SetDebateRoom from "@/components/debate/set-debate-room";

export default async function DebateRoom({
  params,
}: {
  params: { id: string };
}) {
  const myDebateRole = await getMyDebateRole(params.id);
  const supabasePublicKey = process.env.SUPABASE_PUBLIC_KEY!;
  const initialMessages = await getDebateRoomMessages(params.id);
  const topicInfo = await getDebateRoomTopicInfo(params.id);
  const myProfile = await getUserProfile();
  return (
    <SetDebateRoom
      supabasePublicKey={supabasePublicKey}
      debateRoomId={params.id}
      userId={myProfile?.id}
      nickname={myProfile?.nickname}
      initialMessages={initialMessages}
      myDebateRole={myDebateRole}
      topicInfo={topicInfo}
    />
  );
}
