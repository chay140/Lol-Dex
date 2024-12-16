"use server";

// 최신 버전 fetching
export async function fetchLatestVersion(): Promise<string> {
  try {
    const response: Response = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(
        `fetchLatestVersion error message: ${body.status.message}`
      );
    }

    const data: string[] = await response.json();

    return data[0];
  } catch (error: any) {
    // error type이 모두 any로 바뀌었다고 합니다 TS 4.0
    console.error(error.message);
    throw error;
  }
}

// 전체 챔피언 목록 fetching
export async function fetchChampionList(): Promise<Champion[]> {
  try {
    const latestVersion = await fetchLatestVersion();

    const response: Response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`,
      {
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`fetchChampions error message: ${body.status.message}`);
    }

    const { data } = await response.json();
    return Object.values(data);
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

// 챔피언 상세 정보 fetching
export async function fetchChampionDetail(id: string): Promise<ChampionDetail> {
  try {
    const latestVersion = await fetchLatestVersion();

    // console.log("API 호출 시간:", new Date().toISOString());
    const response: Response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion/${id}.json`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(
        `fetchChampionDetail error message [${body.status.message}]`
      );
    }

    const { data } = await response.json();
    return data[id];
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

// 아이템 목록 fetching
export async function fetchItemList(): Promise<Record<string, Item>> {
  try {
    const latestVersion = await fetchLatestVersion();

    console.log("빌드 때만!!");
    const response: Response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item.json`,
      { cache: "force-cache" }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(
        `fetchChampionDetail error message [${body.status.message}]`
      );
    }

    const { data } = await response.json();
    // console.log(data);
    return data
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}
