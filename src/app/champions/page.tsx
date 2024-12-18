import { Metadata } from "next";
import { fetchChampionList } from "../../utils/serverApi";
import ChampionCard from "@/components/ChampionCard";

export const metadata: Metadata = {
  title: "챔피언 목록",
  description: "리그 오브 레전드 챔피언 목록 페이지"
}

const ChampionsPage = async () => {
  const champions = await fetchChampionList();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">챔피언 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {champions?.map((champion) => (
          <ChampionCard key={champion.id} champion={champion} />
        ))}
      </div>
    </div>
  );
};

export default ChampionsPage;
