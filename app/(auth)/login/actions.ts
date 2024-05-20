"use server";

import db from "@/lib/db";
import { loginSchema } from "./schema";
import bcrypt from "bcrypt";
import { FAILED_LOGIN_ERROR } from "@/lib/constants";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { getIP } from "@/lib/utils";
import { headers } from "next/headers";
import { writeLog } from "@/app/(main)/actions";

export const login = async (_: any, formData: FormData) => {
  // login data 검증
  const validation = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    autoLogin: formData.get("autoLogin"),
  });
  if (!validation.success) {
    return validation.error.flatten();
  }
  // email로 user 조회
  const user = await db.user.findUnique({
    where: {
      email: validation.data.email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  // compare password
  const isPasswordRight = await bcrypt.compare(
    validation.data.password,
    user?.password ?? ""
  );

  // email or password 틀렸을 경우
  if (!user || !isPasswordRight) {
    return {
      fieldErrors: {
        email: [],
        password: [FAILED_LOGIN_ERROR],
        autoLogin: [],
      },
    };
  }

  // login
  const session = await getSession(validation.data.autoLogin === "on");
  session.id = user.id;
  session.visitDate = new Date();
  session.ipAddress = getIP(headers());
  await session.save();
  await writeLog(session.id, getIP(headers()));
  redirect("/");
};
