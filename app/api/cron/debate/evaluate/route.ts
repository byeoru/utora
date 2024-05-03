import db from "@/lib/db";
import { NextRequest } from "next/server";

/**
 *
 * 토론 평가 시작
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
    // 토론방 토론 종료, 토론 평가로 전환
    await db.debateRoom.updateMany({
      data: {
        status: "under_evaluation",
      },
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
