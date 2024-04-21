"use client";

import { getMyDebateRole } from "@/app/(home)/(use-side-nav)/debate/[id]/actions";
import { getDebateRoomId } from "@/app/(home)/(use-side-nav)/debate/actions";
import { ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

interface EnterRoomButtonPropsType {
  thisWeekTopicId: number;
}

export default function JoinDebateButton({
  thisWeekTopicId,
}: EnterRoomButtonPropsType) {
  const { pending } = useFormStatus();
  const router = useRouter();
  const enterDebateRoom = async () => {
    let roomId = await getDebateRoomId(thisWeekTopicId);
    if (!roomId) {
      alert("토론방을 찾을 수 없습니다.");
      return;
    }
    // login 하지 않았을 경우 login page로 redirect
    const myDebateRole = await getMyDebateRole(roomId);
    // debate-role check
    if (!myDebateRole) {
      router.push(`/debate/${roomId}/debate-role`);
      return;
    }
    router.push(`/debate/${roomId}`);
  };
  return (
    <form
      className="w-6 h-6 hover:w-1/3 transition-all disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
      action={enterDebateRoom}
    >
      <button
        disabled={pending}
        className="size-full bg-emerald-400 rounded-full relative flex justify-center items-center group"
      >
        <span className="group-hover:text-opacity-100 text-opacity-0 text-white text-sm font-jua">
          입장
        </span>
        <ArrowRightCircle className="size-6 absolute top-0 right-0 text-white" />
      </button>
    </form>
  );
}
