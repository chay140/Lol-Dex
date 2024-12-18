"use client";

import ChampionCard from "@/components/champions/ChampionCard";
import GridSkeleton from "@/components/champions/ChampionGridSkeleton";
import { getChampionRotation } from "@/utils/riotApi";
import { delay } from "@/utils/utilConst";
// CRS는 build && start
// dev에서 하면 터미널에서도 콘솔이 찍힘

import { useQuery } from "@tanstack/react-query";

const delayedGetChampionRotation = async () => {
  await delay(1500); // 3초 딜레이 줘보기 (로딩 보여주기 용)
  return getChampionRotation();
};

const RotationPage = () => {
  const {
    data: rotations,
    isPending,
    error,
  } = useQuery({
    queryKey: ["rotations"],
    queryFn: delayedGetChampionRotation,
  });

  if (error) return <div>에러 발생 새로고침 시도</div>;

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">챔피언 로테이션</h1>
      {isPending && <GridSkeleton />}
      {!isPending && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {rotations.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RotationPage;
