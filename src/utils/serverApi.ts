async function fetchLatestVersion(): Promise<string> {
  try {
    const response: Response = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`fetchLatestVersion: error [${body.status.message}]`);
    }

    const data = await response.json();

    return data[0];
  } catch (error: any) {
    // error type이 모두 any로 바뀌었다고 합니다 TS 4.0
    console.error(error.message);
    throw error;
  }
}

export async function fetchChampions(): Promise<Champion[]> {
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
      throw new Error(`fetchChampions: error [${body.status.message}]`);
    }

    const { data } = await response.json();
    return Object.values(data);
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export async function fetchChampionDetail(id: string): Promise<ChampionDetail> {
  try {
    const latestVersion = await fetchLatestVersion();

    const response: Response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion/${id}.json`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`fetchChampionDetail: error [${body.status.message}]`);
    }

    const { data } = await response.json();
    return data[id];
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}
