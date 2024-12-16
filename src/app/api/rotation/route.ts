import { NextResponse } from "next/server";

export async function GET() {
  try {
    const RIOT_API_KEY = process.env.NEXT_PUBLIC_RIOT_API_KEY;

    // API 키가 없는 경우
    if (!RIOT_API_KEY) {
      throw new Error(`fetchRotation error message: invalid API key`);
    }

    // 데이터 요청
    const response: Response = await fetch(
      `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY as string },
      }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`fetchRotation error message: [${body.status.message}]`);
    }

    // 응답 데이터 변환
    const data: ChampionRotation = await response.json();
    return NextResponse.json(data, {status: 200});
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}
