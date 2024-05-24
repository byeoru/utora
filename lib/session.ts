import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "process";
import { COOKIE_NAME } from "./constants";

interface SessionDataType {
  id: number;
  visitDate: Date;
  ipAddress: string;
}

export default function getSession(isAutoLogin?: boolean) {
  return getIronSession<SessionDataType>(
    cookies(),
    isAutoLogin
      ? {
          cookieName: COOKIE_NAME,
          password: env.COOKIE_PASSWORD!,
          // 프로덕션 환경에서는 secure를 true로 설정해야 합니다.
          cookieOptions: {
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            httpOnly: true,
          },
        }
      : {
          cookieName: COOKIE_NAME,
          password: env.COOKIE_PASSWORD!,
          // 프로덕션 환경에서는 secure를 true로 설정해야 합니다.
          cookieOptions: {
            maxAge: undefined,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            httpOnly: true,
          },
        }
  );
}
