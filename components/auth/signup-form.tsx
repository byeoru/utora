"use client";

import { signUp } from "@/app/(auth)/signup/action";
import { useFormState } from "react-dom";
import Input from "../input";
import BackSpan from "../back-span";
import Button from "../button";

export default function SignupForm() {
  const [state, action] = useFormState(signUp, null);
  return (
    <>
      <span className="font-bold text-2xl">회원가입</span>
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
        <Input
          label="비밀번호 재확인"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          errors={state?.fieldErrors.confirmPassword}
        />
        <Input
          label="닉네임"
          id="nickname"
          name="nickname"
          type="text"
          errors={state?.fieldErrors.nickname}
        />
        <Button text="가입하기" />
        <div className="text-xs text-slate-500 text-center">
          이미 <span className="text-primary">유토라 </span>
          <span className="mr-2">회원이신가요?</span>
          <BackSpan text="로그인" />
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
