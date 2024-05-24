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
  metadataBase: new URL("https://utora.vercel.app"),
  title: {
    template: "유토라 | %s",
    default: "유토라 | 자유로운 토론의 장",
  },
  keywords: [
    "토론",
    "커뮤니티",
    "정치",
    "사회",
    "경제",
    "금융",
    "문화",
    "예술",
    "과학",
    "기술",
    "스포츠",
    "엔터테인먼트",
    "환경",
    "교육",
    "학문",
    "건강",
    "복지",
    "종교",
    "철학",
    "역사",
    "인류학",
  ],
  description: "다양한 분야의 커뮤니티 기능과 실시간 토론 서비스를 제공합니다.",
  openGraph: {
    title: "유토라 | 자유로운 토론의 장",
    siteName: "유토라 | 자유로운 토론의 장",
    description: "토론 특화 커뮤니티 유토라입니다.",
    locale: "ko",
    type: "website",
    url: "https://utora.vercel.app",
    images: {
      url: "/opengraph-image.png",
    },
  },
  verification: {
    google: "mWsCN8In2oMvAtpgqwB9QMF1lfCxdMjp-PchLkUXk8I",
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
