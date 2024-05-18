import {
  INVALID_TYPE_ERROR,
  MIN_LENGTH_POST_CONTENT,
  MIN_LENGTH_POST_CONTENT_ERROR,
  MIN_LENGTH_POST_NAME,
  MIN_LENGTH_POST_NAME_ERROR,
  SELECT_POST_CATEGORY,
} from "@/lib/constants";
import { EPostCategory } from "@prisma/client";
import { z } from "zod";

const checkPostCategory = ({
  postCategory,
}: {
  postCategory: EPostCategory | null;
}) => {
  return Boolean(postCategory);
};

export const postSchema = z
  .object({
    title: z.string().min(MIN_LENGTH_POST_NAME!, MIN_LENGTH_POST_NAME_ERROR),
    content: z
      .string()
      .min(MIN_LENGTH_POST_CONTENT, MIN_LENGTH_POST_CONTENT_ERROR),
    postCategory: z
      .nativeEnum(EPostCategory, { invalid_type_error: INVALID_TYPE_ERROR })
      .nullable(),
  })
  .refine(checkPostCategory, {
    message: SELECT_POST_CATEGORY,
    path: ["postCategory"],
  });

// TODO: title or content에 유해한 텍스트가 존재하는지 검사할 것
