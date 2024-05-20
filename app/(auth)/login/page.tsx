import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Login() {
  return (
    <>
      <LoginForm />
      <div className="w-full flex justify-center items-center gap-3 p-3 font-notoKr text-sm">
        <Link href="/policy/terms-of-service">이용약관</Link>
        <Link href="/policy/privacy-policy" className="font-bold">
          개인정보처리방침
        </Link>
      </div>
    </>
  );
}
