"use client";

import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Posts() {
  const router = useRouter();
  const onAddPostPageClick = () => {
    router.push("/posts/add");
  };
  return (
    <div className="w-full max-w-screen-lg sm:h-full relative m-auto">
      <button
        onClick={onAddPostPageClick}
        className="fixed sm:absolute right-3 bottom-3 size-12 rounded-full shadow-md flex justify-center items-center"
      >
        <PencilSquareIcon className="size-7" />
      </button>
    </div>
  );
}
