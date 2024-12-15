export async function fetchChampionRotation(): Promise<ChampionRotation> {
  try {
    const RIOT_API_KEY = process.env.NEXT_PUBLIC_RIOT_API_KEY;

    if (!RIOT_API_KEY) throw new Error("fetchChampionRotation: No API key");

    const response: Response = await fetch(
      `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

		if (!response.ok) {
			// 에러 메세지 추출
			const body = await response.json();
      throw new Error(`fetchChampionRotation: response not okay [${body.status.message}]`);
		}
		
		const data = await response.json();
		return data;
  } catch (error: any) {
		console.error(error.message);
		throw error
  }
}
