import {
  MIN_LENGTH_POST_CONTENT,
  MIN_LENGTH_POST_CONTENT_ERROR,
  MIN_LENGTH_POST_NAME,
  MIN_LENGTH_POST_NAME_ERROR,
} from "@/lib/constants";
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(MIN_LENGTH_POST_NAME!, MIN_LENGTH_POST_NAME_ERROR),
  content: z
    .string()
    .min(MIN_LENGTH_POST_CONTENT, MIN_LENGTH_POST_CONTENT_ERROR),
});

// TODO: title or content에 유해한 텍스트가 존재하는지 검사할 것
