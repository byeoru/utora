"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AlertGoBackComponentPropsType {
  text: string;
}

export default function AlertGoBackComponent({
  text,
}: AlertGoBackComponentPropsType) {
  const router = useRouter();
  useEffect(() => {
    alert(text);
    router.back();
  });
  return null;
}
