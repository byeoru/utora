import getSession from "@/lib/session";
import Link from "next/link";

export default async function LoginMyInfoButton() {
  const session = await getSession();
  return session.id ? (
    <Link href="/me">내 정보</Link>
  ) : (
    <Link href="/login">로그인</Link>
  );
}
