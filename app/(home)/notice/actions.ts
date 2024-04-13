"use server";

import db from "@/lib/db";
import { notFound } from "next/navigation";

export async function getNotices() {
  try {
    const notices = await db.notice.findMany({
      select: {
        title: true,
        content: true,
        created_at: true,
        admin: {
          select: {
            nickname: true,
          },
        },
      },
    });
    return notices;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
