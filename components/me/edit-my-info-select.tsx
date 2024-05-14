"use client";

import { useFormState } from "react-dom";
import Button from "../button";
import Input from "../input";
import { useState } from "react";
import { ObjectType } from "@/lib/constants";

interface EditMyInfoSelectPropsType {
  title: string;
  formName: string;
  currentData?: string;
  confirmFinal: boolean;
  buttonText?: string;
  optionsObj: ObjectType;
  editFn: (formData: FormData) => Promise<any>;
}

export default function EditMyInfoSelect({
  title,
  formName,
  currentData,
  confirmFinal,
  buttonText,
  optionsObj,
  editFn,
}: EditMyInfoSelectPropsType) {
  const [currentDataState, setCurrentDataState] = useState<string>(
    currentData ?? ""
  );
  const onEditClick = async (_: any, formData: FormData) => {
    if (confirmFinal) {
      const isConfirmed = confirm(
        "한 번 설정 시 변경 불가능합니다 계속하시겠습니까?"
      );
      if (!isConfirmed) {
        return;
      }
    }
    const result = await editFn(formData);
    if (result === null) {
      alert(`${title} 변경에 실패하였습니다.`);
      return;
    }
    if (result === true) {
      alert(`${title} ${buttonText ?? "변경"} 완료`);
      const newValue = formData.get(formName)?.toString();
      setCurrentDataState(newValue ? optionsObj[newValue] : "[error]");
      return;
    }
    return result;
  };
  const [state, action] = useFormState(onEditClick, null);

  return (
    <div className="flex flex-col font-notoKr rounded-md aspect-auto bg-slate-100">
      <h2 className="font-semibold p-3">{title}</h2>
      <div className="flex flex-col gap-3 p-3">
        {currentData ? (
          <Input
            id="current"
            name="current"
            disabled
            value={currentDataState}
            label="현재"
          />
        ) : null}
        <form action={action} className="flex flex-col">
          <label htmlFor={formName}>{`${title} 변경`}</label>
          <select name={formName} className="mb-2 rounded-md text-sm">
            {Object.keys(optionsObj).map((gender, index) => (
              <option key={index} value={gender}>
                {optionsObj[gender]}
              </option>
            ))}
          </select>
          <span className="flex flex-col gap-1 text-warn text-xs">
            {state?.fieldErrors[title]}
          </span>
          <Button className="rounded-md text-sm font-semibold p-2 self-end bg-slate-100">
            <span>{buttonText ?? "변경하기"}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
