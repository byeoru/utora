import { InputHTMLAttributes } from "react";

interface InputPropsType {
  label: string;
}

export default function Input({
  label,
  ...extraAttributes
}: InputPropsType & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={extraAttributes.name}>{label}</label>
      <input
        className="w-full ring-2 focus:ring-4 focus:ring-slate-500 ring-slate-300 transition bg-transparent focus:outline-none border-none rounded-md"
        {...extraAttributes}
      />
    </div>
  );
}
