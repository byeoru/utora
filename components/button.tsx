"use client";

import { useFormStatus } from "react-dom";

interface ButtonPropsType {
  text: string;
}

export default function Button({ text }: ButtonPropsType) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-primary py-3 rounded-md disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
    >
      {text}
    </button>
  );
}
