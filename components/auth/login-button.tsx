import { logout } from "@/app/(home)/actions";
import getSession from "@/lib/session";
import Link from "next/link";

export default async function LoginButton() {
  const session = await getSession();
  return session.id ? (
    <form action={logout}>
      <button>로그아웃</button>
    </form>
  ) : (
    <Link href="/login">로그인</Link>
  );
}
