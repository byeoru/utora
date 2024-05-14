"use client";

import { useFormState } from "react-dom";
import Button from "../button";
import Input from "../input";
import { ChangeEvent, useState } from "react";

interface EditMyInfoFormPropsType {
  title: string;
  formName: string;
  currentData: string;
  editFn: (formData: FormData) => Promise<any>;
}

export default function EditMyInfoForm({
  title,
  formName,
  currentData,
  editFn,
}: EditMyInfoFormPropsType) {
  const onEditClick = async (_: any, formData: FormData) => {
    const result = await editFn(formData);
    if (result === null) {
      alert(`${title} 변경에 실패하였습니다.`);
      return;
    }
    if (result === true) {
      alert(`${title} 변경에 성공하였습니다.`);
      const newData = formData.get(formName)?.toString();
      setCurrentDataState(newData ?? "[error]");
      setInputValue("");
      return;
    }
    return result;
  };
  const [state, action] = useFormState(onEditClick, null);
  const [currentDataState, setCurrentDataState] = useState<string>(currentData);
  const [inputValue, setInputValue] = useState<string>("");

  const onChnage = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="flex flex-col font-notoKr rounded-md aspect-auto bg-slate-100">
      <h2 className="font-semibold text-medium p-3">{title}</h2>
      <div className="flex flex-col gap-3 p-3">
        <Input
          disabled
          value={currentDataState}
          label="현재"
          id="current"
          name="current"
        />
        <form action={action} className="flex flex-col">
          <Input
            label={`새 ${title}`}
            id={formName}
            name={formName}
            value={inputValue}
            onChange={onChnage}
            errors={state?.fieldErrors[formName]}
          />
          <Button className="rounded-md text-sm font-semibold p-2 self-end bg-slate-100">
            <span>변경하기</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
