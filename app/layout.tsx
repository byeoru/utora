import type { Metadata, Viewport } from "next";
import { Jua, Do_Hyeon, Noto_Sans_KR } from "next/font/google";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  description: "다양한 분야의 커뮤니티 기능과 실시간 토론 서비스를 제공합니다.",
  verification: {
    other: {
      "naver-site-verification": "1507561c95d2af80f816458a5ecc668b34d9dfc8",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <meta
        name="google-adsense-account"
        content="ca-pub-6283813776166899"
      ></meta>
      <body
        className={`${jua.variable} ${doHyeon.variable} ${notoKr.variable} w-full`}
      >
        <SpeedInsights />
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
