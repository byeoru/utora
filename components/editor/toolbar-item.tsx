interface ToolbarItemPropsType {
  onClick: Function;
  isActive: boolean;
  icon: React.ReactNode;
}

export default function ToolbarItem({
  onClick,
  isActive,
  icon,
}: ToolbarItemPropsType) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`${
        isActive ? "text-primary ring-2 ring-violet-300" : "text-slate-500"
      } p-1 rounded-md`}
    >
      {icon}
    </button>
  );
}
