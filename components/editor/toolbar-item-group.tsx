interface ToolbarItemGroupPropsType {
  children: React.ReactNode;
}

export default function ToolbarItemGroup({
  children,
}: ToolbarItemGroupPropsType) {
  return (
    <div className="flex justify-center items-center gap-1 px-2 border-r border-slate-300 last:border-none">
      {children}
    </div>
  );
}
