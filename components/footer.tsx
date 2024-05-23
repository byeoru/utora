import { DEPLOYMENT_YEAR } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  const nowYear = new Date().getFullYear();
  return (
    <footer className="w-full flex flex-col gap-2 justify-center items-center font-notoKr">
      <div className="w-full flex justify-center items-center gap-3  text-xs">
        <Link href="/policy/terms-of-service">이용약관</Link>
        <Link
          href="/policy/privacy-policy"
          className="font-bold text-violet-500"
        >
          개인정보처리방침
        </Link>
      </div>
      <span className="font-semibold text-slate-500 text-xxs">
        &copy;{" "}
        {DEPLOYMENT_YEAR === nowYear
          ? DEPLOYMENT_YEAR
          : `${DEPLOYMENT_YEAR} - ${nowYear}`}{" "}
        Utora. All rights reserved.
      </span>
    </footer>
  );
}
