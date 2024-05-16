import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "process";
import { COOKIE_NAME } from "./constants";

interface SessionDataType {
  id: number;
}

export default function getSession(isAutoLogin?: boolean) {
  return getIronSession<SessionDataType>(
    cookies(),
    isAutoLogin
      ? {
          cookieName: COOKIE_NAME,
          password: env.COOKIE_PASSWORD!,
        }
      : {
          cookieName: COOKIE_NAME,
          password: env.COOKIE_PASSWORD!,
          cookieOptions: {
            maxAge: undefined,
          },
        }
  );
}
