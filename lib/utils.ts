import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function formatToTimeAgo(date: Date): string {
  const minsInMs = 1000 * 60;
  const hoursInMs = minsInMs * 60;
  const daysInMs = hoursInMs * 24;

  const ms = new Date(date).getTime();
  const nowMs = Date.now();

  const formatter = new Intl.RelativeTimeFormat("ko");

  let diff = ms - nowMs;

  if (-diff < minsInMs) {
    return "방금 전";
  } else if (-diff < hoursInMs) {
    diff = Math.round(diff / minsInMs);
    return formatter.format(diff, "minutes");
  } else if (-diff < daysInMs) {
    diff = Math.round(diff / hoursInMs);
    return formatter.format(diff, "hours");
  } else {
    // TODO: 윤년 적용해서 정확하게 다시 수정하기
    diff = Math.round(diff / daysInMs);
    return formatter.format(diff, "days");
  }
}

export function toFlattenArray(arr: any[]): any[] {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }

  return result;
}

export function isToday(date: Date) {
  const today = new Date();
  const sessionDate = new Date(date);
  return (
    sessionDate.getDate() === today.getDate() &&
    sessionDate.getMonth() === today.getMonth() &&
    sessionDate.getFullYear() === today.getFullYear()
  );
}

export function getIP(headers: ReadonlyHeaders) {
  const forwardedFor = headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0] ?? "Unknown";
}
