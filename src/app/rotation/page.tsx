"use client";

import ChampionCard from "@/components/champions/ChampionCard";
import GridSkeleton from "@/components/champions/ChampionGridSkeleton";
import { getChampionRotation, getNewbieChampionRotation } from "@/utils/riotApi";
import { delay } from "@/utils/utilConst";
// CRS는 build && start
// dev에서 하면 터미널에서도 콘솔이 찍힘

import { useQuery } from "@tanstack/react-query";

const delayedGetChampionRotation = async () => {
  await delay(100); // 1.5초 딜레이 줘보기 (로딩 보여주기 용)
  return getChampionRotation();
};

const delayedNewbieChampionRotation = async () => {
  await delay(2000); // 로딩 보여주기용
  return getNewbieChampionRotation();
}

const RotationPage = () => {
  const {
    data: rotations,
    isPending: rotPending,
    error: rotError,
  } = useQuery({
    queryKey: ["rotations"],
    queryFn: delayedGetChampionRotation,
  });

  const {
    data: newbieRotations,
    isPending: newbiePending,
    error: newbieError,
  } = useQuery({
    queryKey: ["newbieRotations"],
    queryFn: delayedNewbieChampionRotation,
  });

  if (rotError || newbieError) return <div>에러 발생 새로고침 시도</div>;

  const { rotationChamps: newbieRotationChamps, maxLevel } = newbieRotations || {};

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">챔피언 로테이션</h1>
      {rotPending ? (
        <GridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {rotations.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      )}
      <h1 className="text-2xl font-bold my-4">뉴비 챔피언 로테이션 Max Level.{!newbiePending && maxLevel}</h1>
      {newbiePending ? (
        <GridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {newbieRotationChamps?.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RotationPage;
