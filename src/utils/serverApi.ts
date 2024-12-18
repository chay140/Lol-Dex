"use server";

// 최신 버전 fetching
export async function fetchLatestVersion(): Promise<string> {
  try {
    // 데이터 요청청
    const response: Response = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    // 유효성 확인인
    if (!response.ok) {
      const body = await response.json();
      throw new Error(
        `fetchLatestVersion error message: ${body.status.message}`
      );
    }

    const data: string[] = await response.json();

    // 최신것만만
    return data[0];
  } catch (error: any) {
    // error type이 모두 any로 바뀌었다고 합니다 TS 4.0
    console.error(error.message);
    throw error;
  }
}

// 전체 챔피언 목록 fetching (ISR)
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

// 챔피언 상세 정보 fetching (SSR)
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

// 아이템 목록 fetching (SSG)
export async function fetchItemList(): Promise<Record<string, Item>> {
  try {
    const latestVersion = await fetchLatestVersion();

    const response: Response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item.json`,
      { cache: "force-cache" }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`fetchItemList error message [${body.status.message}]`);
    }

    const { data } = await response.json();
    // console.log(data);
    return data;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

// 랜덤 챔피언 받아오기 (SSG) -> Home page에서 사용됨됨
export async function fetchRandomChampionDetail(): Promise<ChampionDetail> {
  // fetchChampionList는 ISR, fetchChampionDetail은 SSR이라
  // 그냥 SSG로 모두 새로 받기 (기존 함수 사용 X)
  try {
    // SSG로 챔피언 데이터 불러오기
    const latestVersion = await fetchLatestVersion();
    const championListResponse: Response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`,
      { cache: "force-cache" }
    );

    if (!championListResponse.ok) {
      const listResponseBody = await championListResponse.json();
      throw new Error(
        `fetchRandomChampionDetail error: ${listResponseBody.status.message}`
      );
    }

    const { data } = await championListResponse.json();
    const championList: Champion[] = Object.values(data);

    // 랜덤 챔피언 배정
    const randomIndex = Math.floor(Math.random() * championList.length);
    const randomChampId = championList[randomIndex].id;

    // 디테일 SSG로 불러오기
    const champDetailResponse: Response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion/${randomChampId}.json`,
      { cache: "force-cache" }
    );

    if (!champDetailResponse.ok) {
      const detailResponseBody = await champDetailResponse.json();
      throw new Error(
        `fetchRandomChampionDetail error: ${detailResponseBody.status.message}`
      );
    }

    const { data: detailData } = await champDetailResponse.json();
    return detailData[randomChampId];
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}
