import { Client } from "@upstash/qstash/.";
import db from "./lib/db";

export function register() {
  createDebateRoom();
  saveToTheArchive();
}

const client = new Client({
  token: process.env.QSTASH_TOKEN!,
});

const createDebateRoom = async () => {
  const schedule = await db.schedule.findUnique({
    where: {
      name: "topic",
    },
  });

  if (schedule && (await client.schedules.get(schedule.id))) {
    return;
  }

  const s = await client.schedules.create({
    destination: "https://utora.vercel.app/api/cron/debate",
    method: "POST",
    // (KST, UTC+9) 매주 월요일 0시마다 실행
    // UTC 기준 매주 일요일 15시 실행
    cron: "0 15 * * 0",
    headers: {
      "Content-Type": "application/json",
      "Utora-Apikey": process.env.UTORA_API_KEY!,
    },
  });
  await db.schedule.create({
    data: {
      id: s.scheduleId,
      name: "topic",
    },
  });
};

const saveToTheArchive = async () => {
  const schedule = await db.schedule.findUnique({
    where: {
      name: "archive",
    },
  });

  if (schedule && (await client.schedules.get(schedule.id))) {
    return;
  }

  const s = await client.schedules.create({
    destination: "https://utora.vercel.app/api/cron/archive",
    method: "POST",
    // (KST, UTC+9) 매주 금요일 22시마다 실행
    // UTC 기준 매주 금요일 13시 실행
    cron: "0 13 * * 5",
    headers: {
      "Content-Type": "application/json",
      "Utora-Apikey": process.env.UTORA_API_KEY!,
    },
  });
  await db.schedule.create({
    data: {
      id: s.scheduleId,
      name: "archive",
    },
  });
};
