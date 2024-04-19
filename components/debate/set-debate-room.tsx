// "use client";

// import {
//   GetDebateCommentMessagesType,
//   GetDebateMessagesType,
//   GetDebateRoomTopicInfoType,
//   GetDebateSupportMessagesType,
//   GetMyDebateRole,
//   saveMyDebateRole,
// } from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
// import DebateChatList from "./debate-chat-list";
// import { useFormStatus } from "react-dom";
// import { useRouter } from "next/navigation";

// interface SetDebateRoomPropsType {
//   supabasePublicKey: string;
//   debateRoomId: string;
//   userId?: number;
//   nickname?: string;
//   initialDebateMessages: GetDebateMessagesType;
//   initialSubMessages:
//     | GetDebateSupportMessagesType
//     | GetDebateCommentMessagesType;
//   myDebateRole: GetMyDebateRole;
//   topicInfo: GetDebateRoomTopicInfoType;
// }

// export default function SetDebateRoom({
//   supabasePublicKey,
//   debateRoomId,
//   userId,
//   nickname,
//   initialDebateMessages,
//   initialSubMessages,
//   myDebateRole,
//   topicInfo,
// }: SetDebateRoomPropsType) {
//   const router = useRouter();
//   const { pending } = useFormStatus();
//   if (!userId) {
//     // TODO: 나중에 수정할 것
//     alert("계정 정보를 찾을 수 없습니다 다시 로그인하세요.");
//     router.replace("/debate");
//   }

//   return (
//     <DebateChatList
//       supabasePublicKey={supabasePublicKey}
//       debateRoomId={debateRoomId}
//       userId={userId!}
//       nickname={nickname!}
//       debateRole={savedRoleState.debate_role}
//       debateRoleKr={savedRoleState.debate_role_kr}
//       initialDebateMessages={initialDebateMessages}
//       initialSubMessages={initialSubMessages}
//       topicInfo={topicInfo}
//     />
//   );
// }
