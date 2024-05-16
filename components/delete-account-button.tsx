"use client";

import { deleteAccount } from "@/app/(main)/(use-side-nav)/me/actions";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton() {
  const router = useRouter();
  const onLogoutClick = async () => {
    const isConfirmed = confirm("정말 탈퇴하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    const isDeleted = await deleteAccount();
    if (!isDeleted) {
      alert(
        "오류 발생으로 인하여 탈퇴에 실패하였습니다 운영자에게 문의해 주세요."
      );
      return;
    }
    alert("탈퇴가 완료되었습니다.");
    router.replace("/");
  };
  return (
    <button onClick={onLogoutClick} className="font-doHyeon text-red-500">
      회원 탈퇴
    </button>
  );
}
