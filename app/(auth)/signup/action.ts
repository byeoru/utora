"use server";

import db from "@/lib/db";
import { signupSchema } from "./schema";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const signUp = async (_: any, formData: FormData) => {
  // validation
  const validation = await signupSchema.spa({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    nickname: formData.get("nickname"),
    passSelectForm: Boolean(formData.get("passSelectForm")),
    gender: formData.get("gender"),
    ageGroup:
      formData.get("ageGroup") === "none" ? null : formData.get("ageGroup"),
    minAgeCheck: Boolean(formData.get("minAgeCheck")),
    termsOfServiceCheck: Boolean(formData.get("termsOfServiceCheck")),
    privacyPolicyCheck: Boolean(formData.get("privacyPolicyCheck")),
  });
  if (!validation.success) {
    return validation.error.flatten();
  }

  // hash password
  const hashedPassword = await bcrypt.hash(validation.data.password, 12);

  // save user to db
  await db.user.create({
    data: {
      email: validation.data.email,
      password: hashedPassword,
      nickname: validation.data.nickname,
      gender: validation.data.gender,
      age_group: validation.data.ageGroup,
    },
  });

  redirect("/login");
};
