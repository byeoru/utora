"use client";

import { login } from "@/app/(auth)/login/actions";
import { useFormState } from "react-dom";
import Input from "../input";
import Link from "next/link";
import Button from "../button";

export default function LoginForm() {
  const [state, action] = useFormState(login, null);
  return (
    <>
      <span className="font-bold text-2xl">로그인</span>
      <form
        action={action}
        className="w-full font-semibold gap-5 flex flex-col justify-center"
      >
        <Input
          label="이메일"
          id="email"
          name="email"
          type="email"
          errors={state?.fieldErrors.email}
        />
        <Input
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인하기" />
        <div className="text-xs text-slate-500 text-center">
          아직 <span className="text-primary">유토라</span>회원이 아니신가요?
          <Link href="/signup" className="text-primary ml-2">
            회원가입
          </Link>
        </div>
      </form>
      <div className="w-full flex justify-between items-center">
        <div className="w-1/3 h-px bg-slate-300" />
        <div className="text-xs font-medium">간편 로그인</div>
        <div className="w-1/3 h-px bg-slate-300" />
      </div>
      <div className="w-full flex justify-center items-center">
        TODO : 간편인증 구현
      </div>
    </>
  );
}
