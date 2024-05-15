import {
  INVALID_TYPE_ERROR,
  MIN_LENGTH_TOPIC,
  MIN_LENGTH_TOPIC_ERROR,
  MIN_LENGTH_TOPIC_PROPOSE_REASON,
  MIN_LENGTH_TOPIC_PROPOSE_REASON_ERROR,
} from "@/lib/constants";
import { EDebateCategory, EDebateType } from "@prisma/client";
import { z } from "zod";

export const topicProposeSchema = z.object({
  topic: z.string().min(MIN_LENGTH_TOPIC, MIN_LENGTH_TOPIC_ERROR),
  proposeReason: z
    .string()
    .min(
      MIN_LENGTH_TOPIC_PROPOSE_REASON,
      MIN_LENGTH_TOPIC_PROPOSE_REASON_ERROR
    ),
  category: z.nativeEnum(EDebateCategory, {
    invalid_type_error: INVALID_TYPE_ERROR,
  }),
  debateType: z.nativeEnum(EDebateType, {
    invalid_type_error: INVALID_TYPE_ERROR,
  }),
});
