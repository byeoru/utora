export default function BlankPostItem() {
  return (
    <div className="w-full border-b flex odd:bg-gray-100">
      <div className="w-full flex">
        <div className="p-2 bg-slate-400" />
        <div className="flex flex-1 flex-col p-2.5 pr-0 gap-1">
          <h2 className="w-full text-sm text-transparent">_</h2>
          <div className="flex items-center text-xs">
            <span className="px-1 flex-1 text-transparent">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}
