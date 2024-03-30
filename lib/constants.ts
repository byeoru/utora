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

// login failed
export const FAILED_LOGIN_ERROR = "이메일 또는 비밀번호가 맞지 않습니다.";
