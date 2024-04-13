"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoticeButton() {
  const router = useRouter();
  const onNoticeClick = () => {
    router.push("/notice");
  };
  return (
    <button onClick={onNoticeClick}>
      <Bell className="size-4" />
    </button>
  );
}
