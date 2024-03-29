"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-slate-300 transition rounded-full"
    >
      <ArrowLeftIcon className="size-7" />
    </button>
  );
}
