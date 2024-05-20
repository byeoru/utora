"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { getIP, isToday } from "@/lib/utils";
import { headers } from "next/headers";

export async function checkIpAddressProcess() {
  const session = await getSession();
  if (!session.id) {
    return;
  }
  const beforeIp = session.ipAddress;
  const currentIp = getIP(headers());
  const isFirstTimeToday = !isToday(session.visitDate);
  // 오늘 첫 접속인 경우 or 이전 ip주소와 현재 ip주소가 다른 경우
  if (isFirstTimeToday || beforeIp !== currentIp) {
    await writeLog(session.id, currentIp);
    session.visitDate = new Date();
    session.ipAddress = currentIp;
    await session.save();
  }
}

export async function writeLog(userId: number, ipAddress: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });
    await db.visitLog.create({
      data: {
        user_id: userId,
        ip_address: ipAddress,
        email: user?.email ?? "",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
