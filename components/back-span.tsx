"use client";

import { useRouter } from "next/navigation";

interface BackSpanPropsType {
  text: string;
}

export default function BackSpan({ text }: BackSpanPropsType) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <span onClick={onClick} className="text-utora-primary hover:cursor-pointer">
      {text}
    </span>
  );
}
