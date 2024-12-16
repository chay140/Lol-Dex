import { fetchChampionList } from "./serverApi";

export async function fetchChampionRotation(): Promise<Champion[]> {
  const champions = await fetchChampionList();

  const response: Response = await fetch("/api/rotation");

  if (!response.ok) {
    const body = await response.json();
    throw new Error(`fetchRotation error message: ${body.status.message}`);
  }

  const data: ChampionRotation = await response.json();
  console.log(data);
  const rotationChamps: Champion[] = champions.filter((champ) =>
    data.freeChampionIds.includes(Number(champ.key))
  );

  return rotationChamps;
}