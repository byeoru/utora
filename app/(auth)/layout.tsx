import Logo from "@/components/logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="w-1/3 min-h-screen bg-primary flex-col gap-10 justify-center items-center hidden md:flex">
        <Logo />
        <span className="font-doHyeon text-center px-10">
          토론 커뮤니티
          <span className="text-primary"> 유토라</span>에 오신 것을 환영합니다.
        </span>
        <span className="font-bold font-notoKr">
          현재 <span className="text-red-500">Alpha Version</span> 개발 중입니다
        </span>
      </div>
      <div className="min-h-screen max-w-screen-sm w-full md:w-2/3 font-notoKr flex flex-col gap-14 justify-start md:justify-center pt-10 md:pt-0 items-start px-10">
        {children}
      </div>
    </div>
  );
}
