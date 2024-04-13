import LoginButton from "@/components/auth/login-button";
import SideNavigationGroup from "@/components/nav/side-navigation-group";
import SideNavigationItem from "@/components/nav/side-navigation-item";
import TopNavigationItem from "@/components/nav/top-navigation-item";
import { ArrowTrendingUpIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Speech, Vote } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full sm:h-screen flex flex-col sm:flex-row">
      <div className="w-full sm:fixed bg-white">
        <div className="w-full h-8 lg:h-12 px-5 text-lg flex justify-between items-center ">
          <div className="lg:w-44 h-full flex items-center lg:text-3xl">
            <Link href="/">
              <span className="text-primary font-jua">유토라</span>
              <span className="text-xs font-doHyeon text-primary">.Alpha</span>
            </Link>
          </div>
          <div className="h-full flex items-center text-sm font-doHyeon">
            <LoginButton />
          </div>
        </div>
        <nav className="w-full h-10 shadow-sm sm:hidden flex gap-2 justify-center items-center">
          <TopNavigationItem href="/" icon={<HomeIcon className="size-5" />} />
          <TopNavigationItem
            href="/popular"
            icon={<ArrowTrendingUpIcon className="size-5" />}
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

      <nav className="bg-white sm:mt-8 lg:mt-12 pl-3 pr-3 py-2 overflow-y-auto hidden sm:flex flex-col lg:w-48">
        <SideNavigationGroup>
          <SideNavigationItem
            href="/"
            text="홈"
            icon={<HomeIcon className="size-6" />}
          />
          <SideNavigationItem
            href="/popular"
            text="인기"
            icon={<ArrowTrendingUpIcon className="size-6" />}
          />
        </SideNavigationGroup>
        <SideNavigationGroup>
          <SideNavigationItem
            href="/vote/categories"
            text="주제 투표"
            icon={<Vote className="size-6" />}
          />
          <SideNavigationItem
            href="/debate"
            text="토론장"
            icon={<Speech className="size-6" />}
          />
        </SideNavigationGroup>
      </nav>
      <div className="sm:mt-8 lg:mt-12 overflow-y-auto w-full">{children}</div>
    </div>
  );
}
