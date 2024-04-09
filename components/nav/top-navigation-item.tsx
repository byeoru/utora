"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TopNavigationItemPropsType {
  href: string;
  icon: React.ReactNode;
}

export default function TopNavigationItem({
  href,
  icon,
}: TopNavigationItemPropsType) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`p-1.5 rounded-lg ${
        pathname === href ? "bg-emerald-200" : ""
      } hover:bg-emerald-300 transition-colors`}
    >
      {icon}
    </Link>
  );
}
