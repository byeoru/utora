"use client";

import { useFormStatus } from "react-dom";

interface ButtonPropsType {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className }: ButtonPropsType) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`${className} bg-primary py-3 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300`}
    >
      {children}
    </button>
  );
}
