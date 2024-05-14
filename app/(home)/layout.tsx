import NoticeButton from "@/components/nav/notice-button";
import TopNavigationItem from "@/components/nav/top-navigation-item";
import getSession from "@/lib/session";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ClipboardList, Speech, Vote } from "lucide-react";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <div className="w-full sm:h-screen flex flex-col sm:flex-row">
      <div className="w-full sm:fixed bg-white">
        <div className="w-full h-8 lg:h-12 px-5 text-lg flex justify-between items-center ">
          <div className="lg:w-44 h-full flex items-center lg:text-3xl">
            <Link href="/">
              <span className="text-utora-primary font-jua">유토라</span>
              <span className="text-xs font-doHyeon text-utora-primary">
                .Alpha
              </span>
            </Link>
          </div>
          <div className="h-full flex items-center gap-5 text-sm font-doHyeon">
            <NoticeButton />
            {session.id ? (
              <Link href="/me">내 정보</Link>
            ) : (
              <Link href="/login">로그인</Link>
            )}
          </div>
        </div>
        <nav className="w-full h-10 shadow-sm sm:hidden flex gap-2 justify-center items-center">
          <TopNavigationItem href="/" icon={<HomeIcon className="size-5" />} />
          <TopNavigationItem
            href="/posts"
            icon={<ClipboardList className="size-5" />}
          />
          <TopNavigationItem
            href="/vote/categories"
            icon={<Vote className="size-5" />}
          />
          <TopNavigationItem
            href="/debate"
            icon={<Speech className="size-5" />}
          />
        </nav>
      </div>
      <div className="w-full flex">{children}</div>
    </div>
  );
}
