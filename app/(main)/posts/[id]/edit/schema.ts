import {
  MIN_LENGTH_POST_CONTENT,
  MIN_LENGTH_POST_CONTENT_ERROR,
} from "@/lib/constants";
import { z } from "zod";

export const editPostSchema = z.object({
  content: z
    .string()
    .min(MIN_LENGTH_POST_CONTENT, MIN_LENGTH_POST_CONTENT_ERROR),
});
