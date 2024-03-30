import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { InputHTMLAttributes } from "react";

interface InputPropsType {
  label: string;
  name: string;
  errors?: string[];
}

export default function Input({
  label,
  name,
  errors,
  ...extraAttributes
}: InputPropsType & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={extraAttributes.id}>{label}</label>
      <input
        name={name}
        className="w-full ring-2 focus:ring-4 focus:ring-slate-500 ring-slate-300 transition bg-transparent focus:outline-none border-none rounded-md"
        {...extraAttributes}
      />
      <span className="flex flex-col gap-1 text-warn text-xs">
        {errors?.map((error, index) => (
          <span key={index} className="flex items-center gap-1">
            <ExclamationTriangleIcon className="size-4" />
            <span>{error}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
