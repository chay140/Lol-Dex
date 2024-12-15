import { fetchChampions } from "../../utils/serverApi";
import ChampionCard from "@/components/ChampionCard";

const ChampionsPage = async () => {
  const champions = await fetchChampions();

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
