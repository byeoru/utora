import { isAvailableNickname } from "@/app/(auth)/signup/schema";
import {
  DESCRIPTION_PWD,
  INVALID_TYPE_ERROR,
  LENGTH_NICKNAME_ERROR,
  MAX_LENGTH_NICKNAME,
  MAX_LENGTH_PWD,
  MAX_LENGTH_PWD_ERROR,
  MIN_LENGTH_NICKNAME,
  MIN_LENGTH_PWD,
  MIN_LENGTH_PWD_ERROR,
  PWD_REGEX,
  PWD_REGEX_ERROR,
  REQUIRED_ERROR_NICKNAME,
  REQUIRED_ERROR_PWD,
} from "@/lib/constants";
import { EAgeGroup, EGender } from "@prisma/client";
import { z } from "zod";

export const nicknameSchema = z.object({
  nickname: z
    .string({
      required_error: REQUIRED_ERROR_NICKNAME,
    })
    .trim()
    .min(MIN_LENGTH_NICKNAME, LENGTH_NICKNAME_ERROR)
    .max(MAX_LENGTH_NICKNAME, LENGTH_NICKNAME_ERROR)
    .superRefine(isAvailableNickname),
});

export const genderSchema = z
  .nativeEnum(EGender, { invalid_type_error: INVALID_TYPE_ERROR })
  .nullable();
export const ageGroupSchema = z
  .nativeEnum(EAgeGroup, { invalid_type_error: INVALID_TYPE_ERROR })
  .nullable();

export const editPasswordSchema = z.object({
  password: z.string({
    required_error: REQUIRED_ERROR_PWD,
  }),
  newPassword: z
    .string({
      required_error: REQUIRED_ERROR_PWD,
      description: DESCRIPTION_PWD,
    })
    .trim()
    .min(MIN_LENGTH_PWD, MIN_LENGTH_PWD_ERROR)
    .max(MAX_LENGTH_PWD, MAX_LENGTH_PWD_ERROR)
    .regex(PWD_REGEX, PWD_REGEX_ERROR),
});
