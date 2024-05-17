import {
  getDebateCommentMessages,
  getDebateMessages,
  getDebateRoomInfo,
  getDebateSupportMessages,
  getMyDebateRole,
  getUserProfile,
} from "./actions";
import { notFound } from "next/navigation";
import crypto from "crypto";
import DebateChatList from "@/components/debate/room/debate-chat-list";
import CommentChatList from "@/components/debate/room/comment-chat-list";
import SupportChatList from "@/components/debate/room/support-chat-list";
import EvaluationBallet from "@/components/debate/room/evaluation-ballet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "토론방",
};

export default async function DebateRoom({
  params,
}: {
  params: { id: string };
}) {
  const myDebateRole = await getMyDebateRole(params.id);
  const initialDebateMessages = await getDebateMessages(params.id);
  const myProfile = await getUserProfile();
  const debateRoomInfo = await getDebateRoomInfo(params.id);
  const supabasePublicKey = process.env.SUPABASE_PUBLIC_KEY!;
  let initialSubMessages;
  let subChatNameKr;
  let subChannelName;
  let evaluationHistory = null;

  if (!myDebateRole || !debateRoomInfo || !myProfile) {
    // 나중에 코드 개선할 것
    return notFound();
  }
  if (debateRoomInfo.status === "in_debate") {
    switch (myDebateRole.debate_role) {
      case "Audience":
        subChatNameKr = "댓글창";
        subChannelName = "comment";
        initialSubMessages = await getDebateCommentMessages(params.id);
        break;
      case "Proponent":
      case "ProponentSupporter":
        subChatNameKr = "찬성 측 회의실";
        subChannelName = "support-proponent";
        initialSubMessages = await getDebateSupportMessages(
          params.id,
          "Proponent",
          "ProponentSupporter"
        );
        break;
      case "Opponent":
      case "OpponentSupporter":
        subChatNameKr = "반대 측 회의실";
        subChannelName = "support-opponent";
        initialSubMessages = await getDebateSupportMessages(
          params.id,
          "Opponent",
          "OpponentSupporter"
        );
        break;
    }
  } else if (
    debateRoomInfo.status === "under_evaluation" &&
    debateRoomInfo.debate_evaluation_ballets.length > 0
  ) {
    evaluationHistory = debateRoomInfo.debate_evaluation_ballets[0].evaluation;
  }

  const salt = Buffer.from("utora-debate").toString("base64");
  const hashDebateChannelName = crypto
    .pbkdf2Sync(
      `${debateRoomInfo.created_at}-debate-${params.id}-UtOrA`,
      salt,
      1000,
      64,
      "sha512"
    )
    .toString("base64");

  const hashSubChannelName = crypto
    .pbkdf2Sync(
      `uToRa-${params.id}-${subChannelName}-${debateRoomInfo.created_at}`,
      salt,
      1000,
      64,
      "sha512"
    )
    .toString("base64");
  return (
    <div className="w-full lg:h-full pb-5 lg:p-2 flex flex-col lg:flex-row gap-5 max-w-screen-2xl">
      <DebateChatList
        supabasePublicKey={supabasePublicKey}
        debateRoomId={params.id}
        userId={myProfile.id}
        nickname={myProfile.nickname}
        debateRole={myDebateRole.debate_role}
        debateRoleKr={myDebateRole.debate_role_kr}
        initialDebateMessages={initialDebateMessages}
        topicTitle={debateRoomInfo.this_week_topic.topic}
        proposeReason={debateRoomInfo.this_week_topic.propose_reason}
        channelName={hashDebateChannelName}
        status={debateRoomInfo.status}
      />
      {debateRoomInfo.status === "in_debate" ? (
        myDebateRole.debate_role === "Audience" ? (
          <CommentChatList
            supabasePublicKey={supabasePublicKey}
            commentChatRoomName={subChatNameKr!}
            initialCommentMessages={initialSubMessages!}
            debateRoomId={params.id}
            debateRole={myDebateRole.debate_role}
            userId={myProfile.id}
            nickname={myProfile.nickname}
            channelName={hashSubChannelName}
          />
        ) : (
          <SupportChatList
            supabasePublicKey={supabasePublicKey}
            supportChatRoomName={subChatNameKr!}
            initialSupportMessages={initialSubMessages!}
            debateRoomId={params.id}
            debateRole={myDebateRole.debate_role}
            userId={myProfile.id}
            nickname={myProfile.nickname}
            channelName={hashSubChannelName}
          />
        )
      ) : (
        <EvaluationBallet
          debateRoomId={params.id}
          evaluationHistory={evaluationHistory}
        />
      )}
    </div>
  );
}
