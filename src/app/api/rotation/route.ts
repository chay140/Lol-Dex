import { NextResponse } from "next/server";

// route handler GET
export async function GET() {
  try {
    const RIOT_API_KEY = process.env.NEXT_PUBLIC_RIOT_API_KEY;

    // API 키가 없는 경우
    if (!RIOT_API_KEY) {
      return NextResponse.json({message:"unauthorized key", status: 400});
    }

    // 데이터 요청
    const response: Response = await fetch(
      `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY as string },
      }
    );

    // 요청 유효성 확인
    // 서버에서 에러를 던지는 중
    if (!response.ok) {
      const body = await response.json();
      return NextResponse.json({message: body.status.message, status: body.status.status_code});
    }

    // 응답 데이터 변환
    const data: ChampionRotation = await response.json();
    return NextResponse.json(data, {status: 200});
  } catch (error: any) {
    // 문법 에러 뜰 수 있음
    console.error(error.message);
    throw error; // 에러 반환
  }
}
