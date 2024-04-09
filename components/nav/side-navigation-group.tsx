interface SideNavigationGroupPropsType {
  children: React.ReactNode;
}

export default function SideNavigationGroup({
  children,
}: SideNavigationGroupPropsType) {
  return (
    <ul className="w-full pt-3 pb-3 flex flex-col gap-1 font-notoKr font-semibold textbase border-b border-slate-300 last:border-none first:pt-0">
      {children}
    </ul>
  );
}
