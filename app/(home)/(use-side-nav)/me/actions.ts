"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import {
  ageGroupSchema,
  editPasswordSchema,
  genderSchema,
  nicknameSchema,
} from "./schema";
import bcrypt from "bcrypt";

export async function getMyInfo() {
  const session = await getSession();
  try {
    const myInfo = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        email: true,
        nickname: true,
        age_group: true,
        gender: true,
      },
    });
    return myInfo;
  } catch (error) {
    console.error(error);
    return notFound();
  } finally {
    db.$disconnect();
  }
}

export async function editMyNickname(formData: FormData) {
  const session = await getSession();
  try {
    const validation = await nicknameSchema.spa({
      nickname: formData.get("nickname"),
    });
    if (!validation.success) {
      return validation.error.flatten();
    }

    await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        nickname: validation.data.nickname,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function editMyGender(formData: FormData) {
  const session = await getSession();
  try {
    const validation = genderSchema.safeParse(formData.get("gender"));
    if (!validation.success) {
      return validation.error.flatten();
    }

    await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        gender: validation.data,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function editMyAgeGroup(formData: FormData) {
  const session = await getSession();
  try {
    const validation = ageGroupSchema.safeParse(formData.get("ageGroup"));
    if (!validation.success) {
      return validation.error.flatten();
    }

    await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        age_group: validation.data,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function editMyPassword(formData: FormData) {
  const session = await getSession();
  try {
    const validation = editPasswordSchema.safeParse({
      password: formData.get("password"),
      newPassword: formData.get("newPassword"),
    });
    if (!validation.success) {
      return validation.error.flatten();
    }

    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    // compare password
    const isPasswordRight = await bcrypt.compare(
      validation.data.password,
      user?.password ?? ""
    );
    if (!isPasswordRight) {
      return false;
    }

    // hash password
    const newPassword = await bcrypt.hash(validation.data.newPassword, 12);
    await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        password: newPassword,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

export async function deleteAccount() {
  const session = await getSession();
  try {
    await db.user.delete({
      where: {
        id: session.id,
      },
    });
    session.destroy();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
