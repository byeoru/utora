import {
  getDebateCommentMessages,
  getDebateMessages,
  getDebateRoomTopicInfo,
  getDebateSupportMessages,
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
  const initialDebateMessages = await getDebateMessages(params.id);
  const initialSubMessages =
    myDebateRole?.debate_role === "Audience"
      ? await getDebateCommentMessages(params.id)
      : await getDebateSupportMessages(params.id);
  const topicInfo = await getDebateRoomTopicInfo(params.id);
  const myProfile = await getUserProfile();
  return (
    <SetDebateRoom
      supabasePublicKey={supabasePublicKey}
      debateRoomId={params.id}
      userId={myProfile?.id}
      nickname={myProfile?.nickname}
      initialDebateMessages={initialDebateMessages}
      initialSubMessages={initialSubMessages}
      myDebateRole={myDebateRole}
      topicInfo={topicInfo}
    />
  );
}
