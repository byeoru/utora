import { InputHTMLAttributes } from "react";

interface InputPropsType {
  label?: string;
  id: string;
  name: string;
  errors?: string[];
}

export default function Input({
  label,
  id,
  name,
  errors,
  ...extraAttributes
}: InputPropsType & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col w-full gap-1">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        id={id}
        name={name}
        className="w-full h-8 ring-2 disabled:opacity-50 focus:ring-4 focus:ring-slate-500 ring-slate-300 transition bg-transparent focus:outline-none border-none rounded-md"
        {...extraAttributes}
      />
      <span className="flex flex-col gap-1 text-warn text-xs">
        {errors?.map((error, index) => (
          <span key={index} className="flex items-center gap-1">
            {`• ${error}`}
          </span>
        ))}
      </span>
    </div>
  );
}
