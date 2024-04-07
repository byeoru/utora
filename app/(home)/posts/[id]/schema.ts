import { MIN_LENGTH_COMMENT, MIN_LENGTH_COMMENT_ERROR } from "@/lib/constants";
import { z } from "zod";

export const comment = z
  .string()
  .min(MIN_LENGTH_COMMENT, MIN_LENGTH_COMMENT_ERROR);
