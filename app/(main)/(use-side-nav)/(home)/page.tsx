import { checkIpAddressProcess } from "../../actions";

export const revalidate = 1;

export default async function Home() {
  checkIpAddressProcess();
  return (
    <div className="w-full h-full max-w-screen-lg flex flex-col gap-5 justify-center items-center m-auto">
      <span>현재 페이지는 정식 출시 후 공개 예정입니다.</span>
      <div>
        <span className="text-utora-primary text-2xl font-jua">유토라</span>
        <span className="text-xs font-doHyeon text-utora-primary">.Beta</span>
      </div>
    </div>
  );
}
