import LoginButton from "@/components/auth/login-button";
import SideNavigationGroup from "@/components/nav/side-navigation-group";
import SideNavigationItem from "@/components/nav/side-navigation-item";
import { ArrowTrendingUpIcon, HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="w-full h-12 px-5 flex justify-between items-center fixed">
        <div className="w-44 h-full flex items-center">
          <Link href="/">
            <span className="text-primary font-jua text-3xl">유토라</span>
          </Link>
        </div>
        <div className="h-full flex items-center font-doHyeon">
          <LoginButton />
        </div>
      </div>
      <nav className="w-48 mt-12 pl-3 pr-1 py-2 overflow-y-auto">
        <SideNavigationGroup>
          <SideNavigationItem
            href="/"
            text="홈"
            icon={<HomeIcon className="size-5" />}
          />
          <SideNavigationItem
            href="/popular"
            text="인기"
            icon={<ArrowTrendingUpIcon className="size-5" />}
          />
        </SideNavigationGroup>
      </nav>
      <div className="flex-1 mt-12 bg-white overflow-y-auto">{children}</div>
    </div>
  );
}
