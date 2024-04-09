export interface ObjectType {
  [key: string]: string;
}

export const categories: ObjectType = {
  politics_society: "정치 및 사회 문제",
  economy_finance: "경제 및 금융",
  culture_arts: "문화 및 예술",
  science_technology: "과학 및 기술",
  sports_entertainment: "스포츠 및 엔터테인먼트",
  environment_sustainability: "환경 및 지속 가능성",
  education_scholarship: "교육 및 학문",
  health_well_being: "건강 및 복지",
  religion_philosophy: "종교 및 철학",
  history_anthropology: "역사 및 인류학",
};

export default function Topics() {
  return <div></div>;
}

// 사회, 과학, 기술, 환경 등 다양한 카테고리 중 관심 있는 카테고리를 선택하세요. 직접 토론 주제를 발의하거나 타인이 발의한 주제에 투표할 수 있습니다.
