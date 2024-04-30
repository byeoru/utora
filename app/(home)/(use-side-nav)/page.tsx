export const revalidate = 1;

export default async function Home() {
  return (
    <div className="w-full h-full max-w-screen-lg flex flex-col justify-center items-center m-auto">
      <span>현재 페이지(홈 페이지)는 정식 버전 출시 후 사용 가능합니다.</span>
      <span className="text-red-500">
        잦은 업데이트로 데이터가 유실될 수 있습니다.
      </span>
    </div>
  );
}
