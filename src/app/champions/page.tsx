import { Metadata } from "next";
import { fetchChampionList } from "../../utils/serverApi";
import ChampionGrid from "@/components/champions/ChampionGrid";

export const metadata: Metadata = {
  title: "챔피언 목록",
  description: "리그 오브 레전드 챔피언 목록 페이지",
};

const ChampionsPage = async () => {
  const champions = await fetchChampionList();

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">챔피언 목록</h1>
      <ChampionGrid champions={champions} />
    </div>
  );
};

export default ChampionsPage;
