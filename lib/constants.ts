// email
export const REQUIRED_ERROR_EMAIL = "이메일을 입력하세요.";
export const DESCRIPTION_EMAIL = "반드시 사용 가능한 이메일을 입력하세요.";
export const INVALID_TYPE_ERROR_EMAIL = "이메일 형식이 아닙니다.";
export const MAX_LENGTH_EMAIL = 100;
export const MAX_LENGTH_EMAIL_ERROR =
  "이메일은 100자리를 넘을 수 없습니다. 다른 이메일을 사용하세요.";
export const DUPLICATE_ERROR_EMAIL = "이미 존재하는 이메일입니다.";

// password
export const REQUIRED_ERROR_PWD = "비밀번호를 입력하세요.";
export const DESCRIPTION_PWD =
  "비밀번호는 10자리 이상이어야 하며 각각 한자리 이상의 영어 대소문자, 숫자, 특수문자(#?!@$%^&*-)를 포함해야 합니다.";
export const MIN_LENGTH_PWD = 10;
export const MIN_LENGTH_PWD_ERROR =
  "비밀번호는 반드시 10자리 이상이어야 합니다.";
export const MAX_LENGTH_PWD = 100;
export const MAX_LENGTH_PWD_ERROR = "비밀번호는 100자리를 넘을 수 없습니다.";
export const PWD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PWD_REGEX_ERROR =
  "비밀번호는 10자리 이상이어야 하며 각각 한자리 이상의 영어 대소문자, 숫자, 특수문자(#?!@$%^&*-)를 포함해야 합니다.";

// confirmPassword
export const CONFIRM_PASSWORD_ERROR = "비밀번호가 서로 일치하지 않습니다.";

// nickname
export const REQUIRED_ERROR_NICKNAME = "닉네임을 입력하세요.";
export const MIN_LENGTH_NICKNAME = 2;
export const MAX_LENGTH_NICKNAME = 10;
export const LENGTH_NICKNAME_ERROR = "닉네임은 2 ~ 10 자리이어야 합니다.";
export const DUPLICATE_ERROR_NICKNAME = "이미 존재하는 닉네임입니다.";
export const DELETED_ACCOUNT_NICKNAME = "@탈퇴한 계정";

// login failed
export const FAILED_LOGIN_ERROR = "이메일 또는 비밀번호가 맞지 않습니다.";

// post
export const MIN_LENGTH_POST_NAME = 2;
export const MIN_LENGTH_POST_NAME_ERROR =
  "제목은 최소 2글자 이상이어야 합니다.";
export const MIN_LENGTH_POST_CONTENT = 10;
export const MIN_LENGTH_POST_CONTENT_ERROR =
  "본문은 최소 10글자 이상이어야 합니다.";

// comment
export const MIN_LENGTH_COMMENT = 1;
export const MIN_LENGTH_COMMENT_ERROR = "댓글을 입력하세요.";
export const FETCH_COMMENTS_SIZE = 20;
export const FETCH_COMMENTS_ERROR = "댓글을 불러오는데 실패하였습니다.";
export const COMMENT_SAVE_ERROR = "댓글 작성에 실패하였습니다.";

// common
export const DELETE_COMPLETE = "삭제가 완료되었습니다.";

// topic
export const MIN_LENGTH_TOPIC = 10;
export const MIN_LENGTH_TOPIC_ERROR = "주제는 최소 10글자 이상이어야 합니다.";
export const MIN_LENGTH_TOPIC_PROPOSE_REASON = 10;
export const MIN_LENGTH_TOPIC_PROPOSE_REASON_ERROR =
  "주제 제시 이유는 최소 10글자 이상이어야 합니다.";

export interface ObjectType {
  [key: string]: { [key: string]: string | any };
}

export const categories: ObjectType = {
  politics_society: {
    title: "정치 및 사회 문제",
    description:
      "정치와 사회 문제에 관심을 갖고 논쟁하며 사회의 변화를 모색합니다.",
    icon: null,
  },
  economy_finance: {
    title: "경제 및 금융",
    description:
      "금융 시장과 경제 동향에 대해 토론하며 금융 지식을 공유합니다.",
    icon: null,
  },
  culture_arts: {
    title: "문화 및 예술",
    description:
      "문화와 예술의 다양성을 탐구하고 논의하는 장으로, 예술 작품과 문화 현상에 대한 의견을 나눕니다.",
    icon: null,
  },
  science_technology: {
    title: "과학 및 기술",
    description:
      "과학과 기술의 최신 동향을 공유하고, 기술 혁신에 대한 토론을 통해 미래를 모색합니다.",
    icon: null,
  },
  sports_entertainment: {
    title: "스포츠 및 엔터테인먼트",
    description: "스포츠 경기와 엔터테인먼트 콘텐츠에 대해 의견을 나눕니다.",
    icon: null,
  },
  environment_sustainability: {
    title: "환경 및 지속 가능성",
    description:
      "지구 환경 보호와 지속 가능한 발전에 대한 아이디어를 공유하고, 환경 문제에 대한 대안을 모색합니다.",
    icon: null,
  },
  education_scholarship: {
    title: "교육 및 학문",
    description:
      "교육과 학문의 가치를 높이는 논의를 통해 지식을 공유하고, 학습에 대한 열정을 나눕니다.",
    icon: null,
  },
  health_well_being: {
    title: "건강 및 복지",
    description:
      "건강한 삶과 복지에 대한 정보를 공유하고, 건강한 라이프스타일에 관한 의견을 나눕니다.",
    icon: null,
  },
  religion_philosophy: {
    title: "종교 및 철학",
    description:
      "종교와 철학적인 질문에 대한 심도 있는 토론을 통해 영적 성장과 인간적 가치를 공유합니다.",
    icon: null,
  },
  history_anthropology: {
    title: "역사 및 인류학",
    description:
      "과거의 교훈과 현대 사회에 대한 인사이트를 제공하며, 역사와 인류학의 풍부한 지식을 나눕니다.",
    icon: null,
  },
};

// debate room
export const SUPABASE_URL = "https://toxakqydxmsmomvwkqsh.supabase.co";

// debateRoleKr
export const PROPONENT_KR = "찬성측 토론자";
export const PROPONENT_SUPPORTER_KR = "찬성측 토론 서포터";
export const OPPONENT_KR = "반대측 토론자";
export const OPPONENT_SUPPORTER_KR = "반대측 토론 서포터";
export const AUDIENCE_KR = "관중";

// debateRoleGroupKr
export const PROPONENT_SIDE_KR = "찬성측";
export const OPPONENT_SIDE_KR = "반대측";
export const DEBATER_KR = "토론자";
export const DEBATE_SUPPORTER_KR = "토론 서포터";
export const NEUTRALITY_KR = "중립";

// debate role
export const PROPONENT_TEXT = `토론자는 주제나 문제에 적극적으로 참여하여 자신의 견해를
분명하게 표현하고, 논리적인 주장을 전개합니다. 서로 다른
관점을 존중하고, 상대편의 주장을 분석하며 대응합니다. 필요한
정보와 근거를 제시하여 자신의 주장을 뒷받침하고, 반박에 대처할
준비를 갖춥니다. 이러한 노력과 역량은 토론의 질을 향상시키고
결과를 형성하는 데 중요한 역할을 합니다. 찬성측 서포터들과
함께 협력하여 찬성측이 승리할 수 있도록 노력합니다.`;
export const PROPONENT_SUPPORTER_TEXT = `찬성측이 승리할 수 있게 토론자를 서포트하는 집단입니다.
토론자의 의견을 강화하고, 그들이 자신의 주장을 명확하게
전달할 수 있도록 돕습니다. 서포터들은 주장을 뒷받침하고 필요한
정보나 근거를 제공하여 토론자가 효과적으로 논리를 전개할 수
있도록 돕습니다. 또한 토론자의 자신감을 높이고, 대응 전략을
개발하는 데도 기여합니다. 이 모든 것들은 찬성측의 입장을
강화하고, 토론에서 승리할 수 있도록 돕는 중요한 역할을 합니다.`;
export const OPPONENT_TEXT = `토론자는 주제나 문제에 적극적으로 참여하여 자신의 견해를
분명하게 표현하고, 논리적인 주장을 전개합니다. 서로 다른
관점을 존중하고, 상대편의 주장을 분석하며 대응합니다. 필요한
정보와 근거를 제시하여 자신의 주장을 뒷받침하고, 반박에 대처할
준비를 갖춥니다. 이러한 노력과 역량은 토론의 질을 향상시키고
결과를 형성하는 데 중요한 역할을 합니다. 반대측 서포터들과
함께 협력하여 반대측이 승리할 수 있도록 노력합니다.`;
export const OPPONENT_SUPPORTER_TEXT = `반대측이 승리할 수 있게 토론자를 서포트하는 집단입니다.
토론자의 의견을 강화하고, 그들이 자신의 주장을 명확하게
전달할 수 있도록 돕습니다. 서포터들은 주장을 뒷받침하고 필요한
정보나 근거를 제공하여 토론자가 효과적으로 논리를 전개할 수
있도록 돕습니다. 또한 토론자의 자신감을 높이고, 대응 전략을
개발하는 데도 기여합니다. 이 모든 것들은 반대측의 입장을
강화하고, 토론에서 승리할 수 있도록 돕는 중요한 역할을 합니다.`;
export const AUDIENCE_TEXT = `관중은 토론 과정을 관찰하고 참여하는 중립적인 집단으로, 다양한
관점과 의견을 가지고 있습니다. 그들은 토론자들의 주장을 듣고
평가하며, 토론의 주제에 대한 이해를 높이기 위해 노력합니다.
관중은 토론의 핵심 이슈에 대한 질문을 제기하거나, 추가적인
정보를 요청하여 토론의 깊이를 더합니다. 또한 관중은 토론자들의
논리와 주장을 검증하고, 공정한 판단을 내리는 데 도움이 됩니다.
그들의 존재는 토론의 다양성을 보장하고, 토론의 결과를 더욱
풍부하고 유의미하게 만듭니다.`;
