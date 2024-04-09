import {
  BookText,
  CandlestickChart,
  Cpu,
  Eye,
  Globe,
  GraduationCap,
  Leaf,
  Palette,
  Salad,
  Trophy,
} from "lucide-react";
import Link from "next/link";

export interface ObjectType {
  [key: string]: { [key: string]: string | any };
}

export const categories: ObjectType = {
  politics_society: {
    title: "정치 및 사회 문제",
    description:
      "정치와 사회 문제에 관심을 갖고 논쟁하며 사회의 변화를 모색합니다.",
    icon: <Globe />,
  },
  economy_finance: {
    title: "경제 및 금융",
    description:
      "금융 시장과 경제 동향에 대해 토론하며 금융 지식을 공유합니다.",
    icon: <CandlestickChart />,
  },
  culture_arts: {
    title: "문화 및 예술",
    description:
      "문화와 예술의 다양성을 탐구하고 논의하는 장으로, 예술 작품과 문화 현상에 대한 의견을 나눕니다.",
    icon: <Palette />,
  },
  science_technology: {
    title: "과학 및 기술",
    description:
      "과학과 기술의 최신 동향을 공유하고, 기술 혁신에 대한 토론을 통해 미래를 모색합니다.",
    icon: <Cpu />,
  },
  sports_entertainment: {
    title: "스포츠 및 엔터테인먼트",
    description: "스포츠 경기와 엔터테인먼트 콘텐츠에 대해 의견을 나눕니다.",
    icon: <Trophy />,
  },
  environment_sustainability: {
    title: "환경 및 지속 가능성",
    description:
      "지구 환경 보호와 지속 가능한 발전에 대한 아이디어를 공유하고, 환경 문제에 대한 대안을 모색합니다.",
    icon: <Leaf />,
  },
  education_scholarship: {
    title: "교육 및 학문",
    description:
      "교육과 학문의 가치를 높이는 논의를 통해 지식을 공유하고, 학습에 대한 열정을 나눕니다.",
    icon: <GraduationCap />,
  },
  health_well_being: {
    title: "건강 및 복지",
    description:
      "건강한 삶과 복지에 대한 정보를 공유하고, 건강한 라이프스타일에 관한 의견을 나눕니다.",
    icon: <Salad />,
  },
  religion_philosophy: {
    title: "종교 및 철학",
    description:
      "종교와 철학적인 질문에 대한 심도 있는 토론을 통해 영적 성장과 인간적 가치를 공유합니다.",
    icon: <Eye />,
  },
  history_anthropology: {
    title: "역사 및 인류학",
    description:
      "과거의 교훈과 현대 사회에 대한 인사이트를 제공하며, 역사와 인류학의 풍부한 지식을 나눕니다.",
    icon: <BookText />,
  },
};

export default function Topics() {
  return (
    <div className="w-full flex flex-col m-auto">
      <div className="w-full shadow-md p-5 lg:p-12 bg-slate-50 gap-2 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col gap-2 justify-center items-center max-w-screen-lg m-auto break-words">
          <span className="font-notoKr font-bold text-sm lg:text-lg">
            사회, 과학, 기술, 환경 등 다양한 카테고리 중 관심 있는 카테고리를
            선택하세요.
          </span>
          <span className="font-notoKr font-semibold text-xs lg:text-base">
            직접 토론 주제를 발의하거나 타인이 발의한 주제에 투표할 수 있습니다.
          </span>
        </div>
      </div>
      <div className="w-full max-w-screen-lg p-2 md:p-5 flex flex-col gap-2 m-auto lg:grid lg:grid-cols-3 lg:aspect-auto">
        {Object.keys(categories).map((key, index) => (
          <Link
            key={index}
            href={`/vote/categories/${key}`}
            className="w-full bg-slate-200 font-notoKr rounded-md p-5 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              {categories[key].icon}
              <span className=" font-semibold">{categories[key].title}</span>
            </div>
            <div className="text-sm">{categories[key].description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
