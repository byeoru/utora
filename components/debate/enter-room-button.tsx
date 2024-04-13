"use client";

import {
  checkDebateRoom,
  createDebateRoom,
} from "@/app/(home)/(use-side-nav)/debate/actions";
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
      className="font-notoKr rounded-lg font-semibold text-sm shadow-md disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
      action={enterDebateRoom}
    >
      <button
        className="w-full h-full bg-primary text-white rounded-lg flex justify-center items-center p-3 lg:p-2"
        disabled={pending}
      >
        입장
      </button>
    </form>
  );
}
