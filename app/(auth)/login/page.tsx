"use client";

import BackButton from "@/components/back-button";
import Input from "@/components/input";
import Link from "next/link";
import { login } from "./actions";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, action] = useFormState(login, null);
  return (
    <>
      <BackButton />
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
          required
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          errors={state?.fieldErrors.password}
        />
        <button className="bg-primary py-3 rounded-md">로그인하기</button>
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
