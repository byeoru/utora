import {
  CONFIRM_PASSWORD_ERROR,
  DESCRIPTION_EMAIL,
  DESCRIPTION_PWD,
  DUPLICATE_ERROR_EMAIL,
  DUPLICATE_ERROR_NICKNAME,
  INVALID_TYPE_ERROR,
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
  NOT_AVAILABLE_CHARACTOR_NICKNAME,
  PWD_REGEX,
  PWD_REGEX_ERROR,
  REQUIRED_AGEGROUP,
  REQUIRED_ERROR_EMAIL,
  REQUIRED_ERROR_NICKNAME,
  REQUIRED_ERROR_PWD,
  REQUIRED_GENDER,
} from "@/lib/constants";
import db from "@/lib/db";
import { EAgeGroup, EGender } from "@prisma/client";
import { z } from "zod";

const checkConfirmPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const checkGender = ({
  passSelectForm,
  gender,
}: {
  passSelectForm: boolean;
  gender: EGender | null;
}) => {
  if (!passSelectForm && !gender) {
    return false;
  }
  return true;
};

const checkAgeGroup = ({
  passSelectForm,
  ageGroup,
}: {
  passSelectForm: boolean;
  ageGroup: EAgeGroup | null;
}) => {
  if (!passSelectForm && !ageGroup) {
    return false;
  }
  return true;
};

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

export const isAvailableNickname = async (
  nickname: string,
  ctx: z.RefinementCtx
) => {
  if (nickname[0] === "@") {
    ctx.addIssue({
      code: "custom",
      message: NOT_AVAILABLE_CHARACTOR_NICKNAME,
      path: ["nickname"],
      fatal: true,
    });
    return z.NEVER;
  }
  const user = await db.user.findUnique({
    where: {
      nickname,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: DUPLICATE_ERROR_NICKNAME,
      path: ["nickname"],
      fatal: true,
    });
    return z.NEVER;
  }
};

export const signupSchema = z
  .object({
    email: z
      .string({
        required_error: REQUIRED_ERROR_EMAIL,
        description: DESCRIPTION_EMAIL,
      })
      .trim()
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
      .trim()
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
      .trim()
      .min(MIN_LENGTH_NICKNAME, LENGTH_NICKNAME_ERROR)
      .max(MAX_LENGTH_NICKNAME, LENGTH_NICKNAME_ERROR)
      .superRefine(isAvailableNickname),
    gender: z
      .nativeEnum(EGender, { invalid_type_error: INVALID_TYPE_ERROR })
      .nullable(),
    ageGroup: z
      .nativeEnum(EAgeGroup, { invalid_type_error: INVALID_TYPE_ERROR })
      .nullable(),
    passSelectForm: z.boolean(),
  })
  .refine(checkConfirmPassword, {
    message: CONFIRM_PASSWORD_ERROR,
    path: ["confirmPassword"],
  })
  .refine(checkGender, {
    message: REQUIRED_GENDER,
    path: ["gender"],
  })
  .refine(checkAgeGroup, {
    message: REQUIRED_AGEGROUP,
    path: ["ageGroup"],
  });
