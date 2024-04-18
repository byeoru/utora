"use client";

import {
  checkDebateRoom,
  createDebateRoom,
} from "@/app/(home)/(use-side-nav)/debate/actions";
import { ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

interface EnterRoomButtonPropsType {
  thisWeekTopicId: number;
}

export default function EnterRoomButton({
  thisWeekTopicId,
}: EnterRoomButtonPropsType) {
  const { pending } = useFormStatus();
  const router = useRouter();
  const enterDebateRoom = async () => {
    let roomId = await checkDebateRoom(thisWeekTopicId);
    if (!roomId) {
      roomId = await createDebateRoom(thisWeekTopicId);
    }
    await router.push(`/debate/${roomId}`);
  };
  return (
    <form
      className="w-6 h-6 hover:w-1/3 transition-all disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
      action={enterDebateRoom}
    >
      <button
        disabled={pending}
        className="size-full bg-blue-400 rounded-full relative flex justify-center items-center group"
      >
        <span className="group-hover:text-opacity-100 text-opacity-0 text-white text-sm font-jua">
          입장
        </span>
        <ArrowRightCircle className="size-6 absolute top-0 right-0 text-white" />
      </button>
    </form>
  );
}
