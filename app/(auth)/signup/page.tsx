import BackButton from "@/components/back-button";
import BackSpan from "@/components/back-span";
import Input from "@/components/input";

export default function SignUp() {
  return (
    <>
      <BackButton />
      <span className="font-bold text-2xl">회원가입</span>
      <form className="w-full font-semibold gap-5 flex flex-col justify-center">
        <Input label="이메일" required name="email" />
        <Input label="비밀번호" required name="password" />
        <Input label="비밀번호 재확인" required name="re-password" />
        <Input label="닉네임" required name="nickname" />
        <button className="bg-emerald-400 py-3 rounded-md">가입하기</button>
        <div className="text-xs text-slate-500 text-center">
          이미 <span className="text-violet-600">유토라 </span>
          <span className="mr-2">회원이신가요?</span>
          <BackSpan text="로그인" />
        </div>
      </form>
      <div className="w-full flex justify-between items-center">
        <div className="w-1/3 h-px bg-slate-300" />
        <div className="text-xs font-medium">간편 로그인</div>
        <div className="w-1/3 h-px bg-slate-300" />
      </div>
      <div className="w-full flex justify-center items-center">
        TODO : 간편인증 구현
      </div>
    </>
  );
}
