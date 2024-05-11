"use client";

import { MouseEvent } from "react";
import { useFormStatus } from "react-dom";

interface ButtonPropsType {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  className,
  disabled = false,
  onClick,
}: ButtonPropsType) {
  const { pending } = useFormStatus();
  return (
    <button
      onClick={onClick}
      disabled={pending || disabled}
      className={`bg-utora-primary disabled:cursor-not-allowed transition-all disabled:bg-neutral-400 disabled:text-neutral-300 ${className}`}
    >
      {children}
    </button>
  );
}
