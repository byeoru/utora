"use client";

import { logout } from "@/app/(main)/(use-side-nav)/me/actions";
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
    logout();
    router.replace("/");
  });
  return null;
}
