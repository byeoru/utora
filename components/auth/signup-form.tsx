"use client";

import { signUp } from "@/app/(auth)/signup/action";
import { useFormState } from "react-dom";
import Input from "../input";
import BackSpan from "../back-span";
import Button from "../button";
import { ageGroups } from "@/lib/constants";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function SignupForm() {
  const [state, action] = useFormState(signUp, null);
  const [disableSelectFormState, setDisableSelectFormState] =
    useState<boolean>(false);
  const onSelectFormStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target: value } = event;
    if (value.checked) {
      setDisableSelectFormState(true);
    } else {
      setDisableSelectFormState(false);
    }
  };
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
        <div className="flex flex-col">
          <fieldset
            disabled={disableSelectFormState}
            className="flex flex-col border-2 px-5 py-2 rounded-md disabled:opacity-30"
          >
            <legend className="text-red-600 px-2">선택사항</legend>
            <div className="flex gap-10">
              <div className="flex flex-col gap-2">
                <span>성별</span>
                <div className="flex gap-3">
                  <div className="flex items-center gap-0.5">
                    <input type="radio" id="male" name="gender" value="male" />
                    <label htmlFor="male">남</label>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                    />
                    <label htmlFor="male">여</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span>나이</span>
                <select name="ageGroup" className="mb-2 rounded-md text-sm">
                  <option key="default" value="none">
                    선택
                  </option>
                  {Object.keys(ageGroups).map((ageGroup, index) => (
                    <option key={index} value={ageGroup}>
                      {ageGroups[ageGroup]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                {state?.fieldErrors.gender ? (
                  <span className="flex flex-col gap-1 text-warn text-xs">
                    {state?.fieldErrors.gender.map((error, index) => (
                      <span key={index} className="flex items-center gap-1">
                        <ExclamationTriangleIcon className="size-4" />
                        <span>{error}</span>
                      </span>
                    ))}
                  </span>
                ) : null}
                {state?.fieldErrors.ageGroup ? (
                  <span className="flex flex-col gap-1 text-warn text-xs">
                    {state?.fieldErrors.ageGroup.map((error, index) => (
                      <span key={index} className="flex items-center gap-1">
                        <ExclamationTriangleIcon className="size-4" />
                        <span>{error}</span>
                      </span>
                    ))}
                  </span>
                ) : null}
              </div>
            </div>
          </fieldset>
          <div className="flex items-end gap-2">
            <label htmlFor="passSelectForm" className="text-sm">
              다음에 입력
            </label>
            <input
              onChange={onSelectFormStateChange}
              type="checkbox"
              name="passSelectForm"
              id="passSelectForm"
              value="true"
            />
          </div>
          {disableSelectFormState ? (
            <span className="text-xs text-red-600 mt-3">
              선택사항은 이후 내 정보 페이지에서 다시 입력하실 수 있으며 선택
              사항을 입력하지 않은 경우 토론 주제 투표가 불가하며 토론방에
              입장하실 수 없습니다.
            </span>
          ) : null}
        </div>
        <Button className="w-full rounded-md">가입하기</Button>
        <div className="text-xs text-slate-500 text-center">
          이미 <span className="text-utora-primary">유토라 </span>
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
        개발중입니다
      </div>
    </>
  );
}
