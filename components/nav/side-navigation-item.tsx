"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavigationItemPropsType {
  href: string;
  text: string;
  icon: React.ReactNode;
}

export default function SideNavigationItem({
  href,
  text,
  icon,
}: SideNavigationItemPropsType) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`w-full flex px-2 py-1.5 gap-5 items-center rounded-lg ${
        pathname === href ? "bg-emerald-200" : ""
      } hover:bg-emerald-300 transition-colors`}
    >
      {icon}
      <span className="hidden lg:flex">{text}</span>
    </Link>
  );
}
