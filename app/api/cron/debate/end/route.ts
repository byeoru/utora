import db from "@/lib/db";
import { NextRequest } from "next/server";

interface StatisticsType {
  [key: string]: {
    proponent: {
      //
      male: number;
      female: number;
      //
      teens: number;
      twenties: number;
      thirties: number;
      forties: number;
      fifty_and_over: number;
    };
    opponent: {
      //
      male: number;
      female: number;
      //
      teens: number;
      twenties: number;
      thirties: number;
      forties: number;
      fifty_and_over: number;
    };
  };
}
const BATCH_SIZE = 50;

/**
 *
 * 토론 전 과정 종료, 평가 통계 집계
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
    // 평가 투표지 개수
    const debateRooms = await db.debateRoom.findMany({
      select: {
        id: true,
        _count: {
          select: {
            debate_evaluation_ballets: true,
          },
        },
      },
    });
    const statisticsObj: StatisticsType = {};

    for (const debateRoom of debateRooms) {
      const loopCount = Math.ceil(
        debateRoom._count.debate_evaluation_ballets / BATCH_SIZE
      );
      // obj init
      statisticsObj[debateRoom.id] = {
        proponent: {
          male: 0,
          female: 0,
          teens: 0,
          twenties: 0,
          thirties: 0,
          forties: 0,
          fifty_and_over: 0,
        },
        opponent: {
          male: 0,
          female: 0,
          teens: 0,
          twenties: 0,
          thirties: 0,
          forties: 0,
          fifty_and_over: 0,
        },
      };
      // batch size 만큼 evaluation ballet fetch
      for (let index = 0; index < loopCount; index++) {
        const evaluationBallets = await db.debateEvaluationBallet.findMany({
          where: {
            debate_room_id: debateRoom.id,
          },
          select: {
            debate_room_id: true,
            gender: true,
            age_group: true,
            evaluation: true,
          },
          take: BATCH_SIZE,
          skip: index * BATCH_SIZE,
        });
        evaluationBallets.forEach((ballet) => {
          ++statisticsObj[debateRoom.id][ballet.evaluation][ballet.gender];
          ++statisticsObj[debateRoom.id][ballet.evaluation][ballet.age_group];
        });
      }
    }
    // 통계 archive 생성
    await db.debateEvaluationStatisticsArchive.createMany({
      data: Object.keys(statisticsObj).map((debateRoomId) => {
        return {
          // debate_room_id: debateRoomId,
          proponent_male: statisticsObj[debateRoomId].proponent.male,
          proponent_female: statisticsObj[debateRoomId].proponent.female,
          proponent_teens: statisticsObj[debateRoomId].proponent.teens,
          proponent_twenties: statisticsObj[debateRoomId].proponent.twenties,
          proponent_thirties: statisticsObj[debateRoomId].proponent.thirties,
          proponent_forties: statisticsObj[debateRoomId].proponent.forties,
          proponent_fifty_and_over:
            statisticsObj[debateRoomId].proponent.fifty_and_over,

          opponent_male: statisticsObj[debateRoomId].opponent.male,
          opponent_female: statisticsObj[debateRoomId].opponent.female,
          opponent_teens: statisticsObj[debateRoomId].opponent.teens,
          opponent_twenties: statisticsObj[debateRoomId].opponent.twenties,
          opponent_thirties: statisticsObj[debateRoomId].opponent.thirties,
          opponent_forties: statisticsObj[debateRoomId].opponent.forties,
          opponent_fifty_and_over:
            statisticsObj[debateRoomId].opponent.fifty_and_over,
        };
      }),
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
