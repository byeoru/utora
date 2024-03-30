import {
  CONFIRM_PASSWORD_ERROR,
  DESCRIPTION_EMAIL,
  DESCRIPTION_PWD,
  DUPLICATE_ERROR_EMAIL,
  DUPLICATE_ERROR_NICKNAME,
  INVALID_TYPE_ERROR_EMAIL,
  LENGTH_NICKNAME_ERROR,
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_EMAIL_ERROR,
  MAX_LENGTH_NICKNAME,
  MAX_LENGTH_PWD,
  MAX_LENGTH_PWD_ERROR,
  MIN_LENGTH_NICKNAME,
  MIN_LENGTH_PWD,
  MIN_LENGTH_PWD_ERROR,
  PWD_REGEX,
  PWD_REGEX_ERROR,
  REQUIRED_ERROR_EMAIL,
  REQUIRED_ERROR_NICKNAME,
  REQUIRED_ERROR_PWD,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

const checkConfirmPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const isAvailableEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return user === null;
};

const isAvailableNickname = async (nickname: string) => {
  const user = await db.user.findUnique({
    where: {
      nickname,
    },
    select: {
      id: true,
    },
  });
  return user === null;
};

export const signupSchema = z
  .object({
    email: z
      .string({
        required_error: REQUIRED_ERROR_EMAIL,
        description: DESCRIPTION_EMAIL,
      })
      .email(INVALID_TYPE_ERROR_EMAIL)
      .max(MAX_LENGTH_EMAIL, MAX_LENGTH_EMAIL_ERROR)
      .refine(isAvailableEmail, {
        message: DUPLICATE_ERROR_EMAIL,
        path: ["email"],
      }),
    password: z
      .string({
        required_error: REQUIRED_ERROR_PWD,
        description: DESCRIPTION_PWD,
      })
      .min(MIN_LENGTH_PWD, MIN_LENGTH_PWD_ERROR)
      .max(MAX_LENGTH_PWD, MAX_LENGTH_PWD_ERROR)
      .regex(PWD_REGEX, PWD_REGEX_ERROR),
    confirmPassword: z.string({
      required_error: REQUIRED_ERROR_PWD,
    }),
    nickname: z
      .string({
        required_error: REQUIRED_ERROR_NICKNAME,
      })
      .min(MIN_LENGTH_NICKNAME, LENGTH_NICKNAME_ERROR)
      .max(MAX_LENGTH_NICKNAME, LENGTH_NICKNAME_ERROR)
      .refine(isAvailableNickname, DUPLICATE_ERROR_NICKNAME),
  })
  .refine(checkConfirmPassword, {
    message: CONFIRM_PASSWORD_ERROR,
    path: ["confirmPassword"],
  });
