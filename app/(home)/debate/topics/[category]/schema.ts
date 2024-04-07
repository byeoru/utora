import {
  MIN_LENGTH_TOPIC,
  MIN_LENGTH_TOPIC_ERROR,
  MIN_LENGTH_TOPIC_PROPOSE_REASON,
  MIN_LENGTH_TOPIC_PROPOSE_REASON_ERROR,
} from "@/lib/constants";
import { EDebateCategory } from "@prisma/client";
import { z } from "zod";

export const topicProposeSchema = z.object({
  topic: z.string().min(MIN_LENGTH_TOPIC, MIN_LENGTH_TOPIC_ERROR),
  proposeReason: z
    .string()
    .min(
      MIN_LENGTH_TOPIC_PROPOSE_REASON,
      MIN_LENGTH_TOPIC_PROPOSE_REASON_ERROR
    ),
  category: z.nativeEnum(EDebateCategory),
});
