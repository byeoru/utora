import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "process";

interface SessionDataType {
  id: number;
}

export default function getSession() {
  return getIronSession<SessionDataType>(cookies(), {
    cookieName: "utora-cookie",
    password: env.COOKIE_PASSWORD!,
  });
}
