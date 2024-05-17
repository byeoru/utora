import { formatToTimeAgo } from "@/lib/utils";
import { getNotices } from "./actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "알림",
};

export default async function Notice() {
  const notices = await getNotices();
  return (
    <ul className="w-full mx-auto max-w-screen-md p-2 sm:mt-8 lg:mt-12">
      {notices.map((notice, index) => (
        <li
          key={index}
          className="w-full flex flex-col bg-white border-b border-slate-300 p-2"
        >
          <div className="flex items-center justify-between flex-1   text-slate-700">
            <span className="text-sm sm:text-base font-jua line-clamp-1 text-ellipsis">
              {notice.title}
            </span>
            <span className="text-xs sm:text-sm text-slate-500 font-notoKr font-medium">
              {formatToTimeAgo(notice.created_at)}
            </span>
          </div>
          <span className="font-jua text-xs text-slate-500 px-2 mt-1">
            | 개발자: <span>{notice.admin?.nickname ?? "@탈퇴한 개발자"}</span>
          </span>
          <span className="font-notoKr font-medium text-xs text-slate-500 px-2 mt-4">
            {notice.content}
          </span>
        </li>
      ))}
    </ul>
  );
}
