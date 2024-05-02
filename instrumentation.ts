import { Client } from "@upstash/qstash/.";
import db from "./lib/db";

export function register() {
  setCron();
}

const setCron = async () => {
  const client = new Client({
    token: process.env.QSTASH_TOKEN!,
  });
  const schedule = await db.schedule.findUnique({
    where: {
      name: "topic",
    },
  });
  if (schedule) {
    return;
  }
  const result = await client.schedules.create({
    destination: "https://utora.vercel.app/api/cron",
    method: "POST",
    // 매주 월요일마다 실행
    cron: "0 9 * * 1",
    headers: {
      "Content-Type": "application/json",
      "Utora-Apikey": process.env.UTORA_API_KEY!,
    },
  });
  await db.schedule.create({
    data: {
      id: result.scheduleId,
      name: "topic",
    },
  });
};
