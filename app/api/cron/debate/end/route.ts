import db from "@/lib/db";
import { NextRequest } from "next/server";

/**
 *
 * 토론 전 과정 종료, 토론 통계 집계
 */
export async function PUT(req: NextRequest) {
  // upstash를 통한 요청만 허가
  const apiKey = req.headers.get("utora-apikey");
  if (apiKey !== process.env.UTORA_API_KEY!) {
    return Response.json(
      {
        success: false,
        error: "허가되지 않은 요청입니다.",
      },
      { status: 401 }
    );
  }

  try {
    // 토론 평가 종료
    await db.debateRoom.updateMany({
      data: {
        status: "end",
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
