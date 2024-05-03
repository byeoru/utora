import { Client } from "@upstash/qstash/.";
import db from "./lib/db";

export function register() {
  createDebateRoom();
  evaluateDebate();
  endEvaluate();
  createArchive();
  deleteAllDebate();
}

const client = new Client({
  token: process.env.QSTASH_TOKEN!,
});

const createDebateRoom = async () => {
  const schedule = await db.schedule.findUnique({
    where: {
      name: "createDebate",
    },
  });

  if (schedule) {
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
      name: "createDebate",
    },
  });
};

const createArchive = async () => {
  const schedule = await db.schedule.findUnique({
    where: {
      name: "createArchive",
    },
  });

  if (schedule) {
    return;
  }

  const s = await client.schedules.create({
    destination: "https://utora.vercel.app/api/cron/archive",
    method: "POST",
    // (KST, UTC+9) 매주 일요일 23시마다 실행
    // UTC 기준 매주 일요일 14시 실행
    cron: "0 14 * * 0",
    headers: {
      "Content-Type": "application/json",
      "Utora-Apikey": process.env.UTORA_API_KEY!,
    },
  });
  await db.schedule.create({
    data: {
      id: s.scheduleId,
      name: "createArchive",
    },
  });
};

const evaluateDebate = async () => {
  const schedule = await db.schedule.findUnique({
    where: {
      name: "evaluateDebate",
    },
  });

  if (schedule) {
    return;
  }

  const s = await client.schedules.create({
    destination: "https://utora.vercel.app/api/cron/debate/evaluate",
    method: "PUT",
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
      name: "evaluateDebate",
    },
  });
};

const endEvaluate = async () => {
  const schedule = await db.schedule.findUnique({
    where: {
      name: "endEvaluate",
    },
  });

  if (schedule) {
    return;
  }

  const s = await client.schedules.create({
    destination: "https://utora.vercel.app/api/cron/debate/end",
    method: "PUT",
    // (KST, UTC+9) 매주 일요일 22시마다 실행
    // UTC 기준 매주 일요일 13시 실행
    cron: "0 13 * * 0",
    headers: {
      "Content-Type": "application/json",
      "Utora-Apikey": process.env.UTORA_API_KEY!,
    },
  });
  await db.schedule.create({
    data: {
      id: s.scheduleId,
      name: "endEvaluate",
    },
  });
};

const deleteAllDebate = async () => {
  const schedule = await db.schedule.findUnique({
    where: {
      name: "deleteDebate",
    },
  });

  if (schedule) {
    return;
  }

  const s = await client.schedules.create({
    destination: "https://utora.vercel.app/api/cron/debate",
    method: "DELETE",
    // (KST, UTC+9) 매주 일요일 23시 30분마다 실행
    // UTC 기준 매주 일요일 14시 30분 실행
    cron: "30 14 * * 0",
    headers: {
      "Content-Type": "application/json",
      "Utora-Apikey": process.env.UTORA_API_KEY!,
    },
  });
  await db.schedule.create({
    data: {
      id: s.scheduleId,
      name: "deleteDebate",
    },
  });
};
