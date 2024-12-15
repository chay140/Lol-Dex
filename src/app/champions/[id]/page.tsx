import { fetchChampionDetail } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

type ChampDetailProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ChampDetailProps): Promise<Metadata> {
	// fetch 데이터
	const data = await fetchChampionDetail(params.id);

	// TODO: 더 추가할 정보 추가 바람
	return {
    title: `${data.name} - Lol Dex`,
    description: `${data.lore}`,
  };
}

const ChampionDetailPage = async ({ params }: ChampDetailProps) => {
  const championDetail = await fetchChampionDetail(params.id);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{championDetail.name}</h1>
      <h2 className="text-2xl text-gray-600 mb-4">{championDetail.title}</h2>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetail.id}_0.jpg`}
        alt={`${championDetail.id}.jpg`}
        width="512" 
        height="288" 
        className="mx-auto"
      />
      <p className="mt-4">{championDetail.lore}</p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">스탯</h3>
        <ul className="list-disc list-inside">
          <li>ATTACK: {championDetail.info.attack}</li>
          <li>DEFENSE: {championDetail.info.defense}</li>
          <li>MAGIC: {championDetail.info.magic}</li>
          <li>DIFFICULTY: {championDetail.info.difficulty}</li>
        </ul>
      </div>
    </div>
  );
};

export default ChampionDetailPage;
