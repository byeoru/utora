export default function Logo() {
  return (
    <div className="flex flex-col font-jua">
      <div className="flex justify-center gap-2">
        <span className="text-4xl w-26 inline-block bg-emerald-100 rounded-full shadow-xl px-3 text-center text-violet-600">
          유토
        </span>
        <span>PIA</span>
      </div>
      <div className="flex justify-center items-end gap-2">
        <span className="w-14 inline-block text-center">AGO</span>
        <span className="text-4xl bg-emerald-100 rounded-full shadow-xl px-3 text-violet-600">
          라
        </span>
      </div>
    </div>
  );
}
