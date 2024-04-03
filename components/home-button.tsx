"use client";

import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-slate-300 transition rounded-full"
    >
      <HomeIcon className="size-7" />
    </button>
  );
}
