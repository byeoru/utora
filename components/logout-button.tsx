"use client";

import { logout } from "@/app/(home)/(use-side-nav)/me/actions";
import { redirect, useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const onLogoutClick = async () => {
    const isConfirmed = confirm("정말 로그아웃 하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    await logout();
    router.replace("/");
  };
  return (
    <button onClick={onLogoutClick} className="font-doHyeon">
      로그아웃
    </button>
  );
}
