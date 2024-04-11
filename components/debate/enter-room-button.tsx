"use client";

import { checkDebateRoom, createDebateRoom } from "@/app/(home)/debate/actions";
import { redirect } from "next/navigation";
import { useFormStatus } from "react-dom";

interface EnterRoomButtonPropsType {
  thisWeekTopicId: number;
}

export default function EnterRoomButton({
  thisWeekTopicId,
}: EnterRoomButtonPropsType) {
  const { pending } = useFormStatus();
  const enterDebateRoom = async () => {
    let roomId = await checkDebateRoom(thisWeekTopicId);
    if (!roomId) {
      roomId = await createDebateRoom(thisWeekTopicId);
    }
    redirect(`/debate/${roomId}`);
  };
  return (
    <form
      className="flex justify-center items-center font-notoKr p-3 lg:p-2 bg-primary rounded-lg text-white font-semibold text-sm shadow-md disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
      action={enterDebateRoom}
    >
      <button disabled={pending}>입장</button>
    </form>
  );
}
