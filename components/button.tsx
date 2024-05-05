"use client";

import { useFormStatus } from "react-dom";

interface ButtonPropsType {
  children: React.ReactNode;
  className?: string;
  pendingOr?: boolean;
}

export default function Button({
  children,
  className,
  pendingOr = false,
}: ButtonPropsType) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || pendingOr}
      className={`bg-primary py-3 disabled:cursor-not-allowed transition-all disabled:bg-neutral-400 disabled:text-neutral-300 ${className}`}
    >
      {children}
    </button>
  );
}
