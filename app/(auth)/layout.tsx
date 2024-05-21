import Logo from "@/components/logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="w-1/3 fixed h-screen bg-utora-primary flex-col gap-10 justify-center items-center hidden md:flex">
        <Logo />
        <span className="font-doHyeon text-center px-10">
          토론 커뮤니티
          <span className="text-utora-primary"> 유토라</span>에 오신 것을
          환영합니다.
        </span>
      </div>
      <div className="md:ml-[33.333333%] max-w-screen-sm w-full md:w-2/3 font-notoKr flex flex-col gap-14 pt-10 pb-5 items-start px-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
