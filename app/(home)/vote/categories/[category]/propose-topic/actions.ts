"use server";

import getSession from "@/lib/session";
import { topicProposeSchema } from "./schema";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function createTopic(formData: FormData) {
  const validation = topicProposeSchema.safeParse({
    topic: formData.get("topic"),
    proposeReason: formData.get("proposeReason"),
    category: formData.get("category"),
  });

  if (!validation.success) {
    return validation.error.flatten();
  }

  const session = await getSession();
  try {
    await db.proposedTopic.create({
      data: {
        topic: validation.data.topic,
        propose_reason: validation.data.proposeReason,
        user_id: session.id,
        category: validation.data.category,
      },
    });
  } catch (error) {
    return null;
  }
}
