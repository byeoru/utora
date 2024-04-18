import { categories } from "@/lib/constants";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="w-full flex flex-col m-auto">
      <div className="w-full shadow-md p-5 lg:p-12 bg-slate-50 gap-2 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col gap-2 justify-center items-center max-w-screen-lg m-auto break-words">
          <span className="font-notoKr font-bold text-sm lg:text-lg">
            관심 있는 카테고리를 선택하세요.
          </span>
          <span className="font-notoKr font-semibold text-xs lg:text-base">
            직접 토론 주제를 발의하거나 타인이 발의한 주제에 투표할 수 있습니다.
          </span>
        </div>
      </div>
      <div className="w-full max-w-screen-lg p-2 md:p-5 flex flex-col gap-2 m-auto lg:grid lg:grid-cols-3 lg:aspect-auto">
        {Object.keys(categories).map((category, index) => (
          <Link
            key={index}
            href={`/vote/categories/${category}`}
            className="w-full bg-slate-200 font-notoKr rounded-md p-5 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              {categories[category].icon}
              <span className="font-semibold">
                {categories[category].title}
              </span>
            </div>
            <div className="text-sm">{categories[category].description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
