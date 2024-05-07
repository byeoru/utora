"use client";

import { useFormStatus } from "react-dom";

interface ButtonPropsType {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  disabled = false,
}: ButtonPropsType) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || disabled}
      className={`bg-utora-primary py-3 disabled:cursor-not-allowed transition-all disabled:bg-neutral-400 disabled:text-neutral-300 ${className}`}
    >
      {children}
    </button>
  );
}
