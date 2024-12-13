export async function fetchChampions(): Promise<Champion[]> {
    const response: Response = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json"
    );
    if (!response.ok) throw new Error("fetchChampions error");

    const data = await response.json();
    console.log(data.data)
    return data.data;
}