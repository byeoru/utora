"use server";

import db from "@/lib/db";
import { signupSchema } from "./schema";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export const signUp = async (_: any, formData: FormData) => {
  // validation
  const validation = await signupSchema.spa({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    nickname: formData.get("nickname"),
  });
  if (!validation.success) {
    return validation.error.flatten();
  }

  // hash password
  const hashedPassword = await bcrypt.hash(validation.data.password, 12);

  // save user to db
  const user = await db.user.create({
    data: {
      email: validation.data.email,
      password: hashedPassword,
      nickname: validation.data.nickname,
    },
    select: {
      id: true,
    },
  });

  // login
  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect("/");
};
