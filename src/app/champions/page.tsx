"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChampions } from "../../utils/serverApi";
import ChampionCard from "@/components/ChampionCard";

const ChampionsPage = () => {
  const {
    data: champions,
    isPending,
    error,
  } = useQuery<Champion[]>({
    queryKey: ["champions"],
    queryFn: fetchChampions,
  });

  if (isPending) return <div>로딩 중</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">챔피언 목록</h1>

      {/* 매핑 */}
      <div className="grid grid-cols-4 gap-4">
        {champions?.map((champion) => (
          <ChampionCard key={champion.id} champion={champion} />
        ))}
      </div>
    </div>
  );
};

export default ChampionsPage;
