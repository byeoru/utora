"use client";

import { useFormState } from "react-dom";
import Button from "../button";
import Input from "../input";
import { editMyPassword } from "@/app/(home)/(use-side-nav)/me/actions";
import { ChangeEvent, useState } from "react";

export default function EditMyPassword() {
  const [currentPwd, setCurrentPwd] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPwd(event.target.value);
  };

  const onNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPwd(event.target.value);
  };

  const onEditClick = async (_: any, formData: FormData) => {
    const result = await editMyPassword(formData);
    if (result === null) {
      alert("비밀번호 변경에 실패하였습니다.");
      return;
    }
    if (result === true) {
      alert("비밀번호 변경에 성공하였습니다.");
      return;
    }
    if (result === false) {
      alert("현재 비밀번호가 올바르지 않습니다.");
      return;
    }
    setCurrentPwd("");
    setNewPwd("");
    return result;
  };
  const [state, action] = useFormState(onEditClick, null);

  return (
    <div className="flex flex-col font-notoKr rounded-md aspect-auto bg-slate-100">
      <h2 className="font-semibold text-medium p-3">비밀번호</h2>
      <form action={action} className="flex flex-col gap-3 p-3">
        <Input
          value={currentPwd}
          onChange={onPasswordChange}
          type="password"
          label="현재 비밀번호"
          id="password"
          name="password"
          errors={state?.fieldErrors.password}
        />
        <Input
          value={newPwd}
          onChange={onNewPasswordChange}
          type="password"
          label="새 비밀번호"
          id="newPassword"
          name="newPassword"
          errors={state?.fieldErrors.newPassword}
        />
        <Button className="rounded-md text-sm font-semibold p-2 self-end bg-slate-100">
          <span>변경하기</span>
        </Button>
      </form>
    </div>
  );
}
