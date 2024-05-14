"use client";

import { useEffect } from "react";

interface AlertComponentPropsType {
  text: string;
}

export default function AlertComponent({ text }: AlertComponentPropsType) {
  useEffect(() => {
    alert(text);
  });
  return null;
}
