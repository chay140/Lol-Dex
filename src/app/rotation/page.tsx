"use client";

import ChampionCard from "@/components/ChampionCard";
import { fetchChampionRotation } from "@/utils/riotApi";
// CRS는 build && start
// dev에서 하면 터미널에서도 콘솔이 찍힘

import { useQuery } from "@tanstack/react-query";

const RotationPage = () => {
  const {
    data: rotations,
    isPending,
    error,
  } = useQuery({
    queryKey: ["rotations"],
    queryFn: fetchChampionRotation,
  });

  if (error) return <div>에러 발생 새로고침 시도</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">챔피언 로테이션</h1>
      <div className="grid grid-cols-4 gap-4">
        {isPending && (
          <h2 className="text-xl font-semibold mb-4 text-gray-500">로딩 중</h2>
        )}
        {!isPending &&
          !error &&
          rotations.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
      </div>
    </div>
  );
};

export default RotationPage;
