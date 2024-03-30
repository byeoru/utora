export default function Logo() {
  return (
    <div className="flex flex-col font-jua bg-emerald-300 p-4 rounded-3xl">
      <div className="flex justify-center gap-2">
        <span className="text-4xl w-26 inline-block bg-emerald-100 rounded-full shadow-xl px-3 text-center text-primary">
          유토
        </span>
        <span>PIA</span>
      </div>
      <div className="flex justify-center items-end gap-2">
        <span className="w-14 inline-block text-center">AGO</span>
        <span className="text-4xl bg-emerald-100 rounded-full shadow-xl px-3 text-primary">
          라
        </span>
      </div>
    </div>
  );
}
