"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AlertComponentPropsType {
  text: string;
}

export default function AlertGoHomeComponent({
  text,
}: AlertComponentPropsType) {
  const router = useRouter();
  useEffect(() => {
    alert(text);
    router.replace("/");
  });
  return null;
}
