import SideNavigationGroup from "@/components/nav/side-navigation-group";
import SideNavigationItem from "@/components/nav/side-navigation-item";
import { ArrowTrendingUpIcon, HomeIcon } from "@heroicons/react/24/outline";
import { ClipboardList, Speech, Vote } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
            href="/posts/general"
            text="게시판"
            icon={<ClipboardList className="size-6" />}
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
    </>
  );
}
