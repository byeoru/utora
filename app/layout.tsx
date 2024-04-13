import type { Metadata } from "next";
import { Jua, Do_Hyeon, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const jua = Jua({
  subsets: ["latin"],
  weight: ["400"],
  style: "normal",
  variable: "--jua-font",
});

const doHyeon = Do_Hyeon({
  subsets: ["latin"],
  weight: ["400"],
  style: "normal",
  variable: "--doHyeon-font",
});

const notoKr = Noto_Sans_KR({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--notoKr-font",
});

export const metadata: Metadata = {
  title: {
    template: "유토라 | %s",
    default: "유토라 | 자유로운 토론의 장",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jua.variable} ${doHyeon.variable} ${notoKr.variable} w-full`}
      >
        {children}
      </body>
    </html>
  );
}
