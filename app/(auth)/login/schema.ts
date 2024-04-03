import {
  INVALID_TYPE_ERROR_EMAIL,
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_EMAIL_ERROR,
  MAX_LENGTH_PWD,
  MAX_LENGTH_PWD_ERROR,
  REQUIRED_ERROR_EMAIL,
  REQUIRED_ERROR_PWD,
} from "@/lib/constants";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: REQUIRED_ERROR_EMAIL,
    })
    .email(INVALID_TYPE_ERROR_EMAIL)
    .min(1, REQUIRED_ERROR_EMAIL)
    .max(MAX_LENGTH_EMAIL, MAX_LENGTH_EMAIL_ERROR),
  password: z
    .string({
      required_error: REQUIRED_ERROR_PWD,
    })
    .min(1, REQUIRED_ERROR_PWD)
    .max(MAX_LENGTH_PWD, MAX_LENGTH_PWD_ERROR),
});
