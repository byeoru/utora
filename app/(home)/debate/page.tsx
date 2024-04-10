import { categories } from "../vote/categories/page";

export default function Debate() {
  return (
    <div className="w-full max-w-screen-lg flex flex-col m-auto justify-center items-center gap-5">
      <div className="w-full h-32 bg-slate-200">
        TODO: 지난주 토론 주제, 통계
      </div>
      <div className="w-full flex flex-col">
        <h1 className="font-doHyeon text-base lg:text-xl p-2 md:p-5">
          이번주 토론
        </h1>
        <ul className="w-full flex flex-col gap-10 p-2 md:p-5 bg-slate-100">
          {Object.keys(categories).map((key, index) => (
            <li key={index} className="w-full flex flex-col gap-3">
              <span className="flex items-center gap-3">
                {categories[key].icon}
                <h2 className="text-sm lg:text-lg font-jua text-slate-600">
                  {categories[key].title}
                </h2>
              </span>
              <h3 className="text-slate-600 font-notoKr font-semibold text-xs lg:text-base">
                선정된 주제
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
