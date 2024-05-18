"use client";

import { logout } from "@/app/(main)/(use-side-nav)/me/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AlertLogoutComponentPropsType {
  text: string;
}

export default function AlertLogoutComponent({
  text,
}: AlertLogoutComponentPropsType) {
  const router = useRouter();
  useEffect(() => {
    alert(text);
    logout();
    router.replace("/");
  });
  return null;
}
