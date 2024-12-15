import { fetchChampionDetail, fetchLatestVersion } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

type ChampDetailProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: ChampDetailProps): Promise<Metadata> {
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
  const latestVersion = await fetchLatestVersion();

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
        <h2 className="text-2xl font-semibold mb-4">스탯</h2>
        <ul className="list-disc list-inside">
          {Object.entries(championDetail.info).map(([key, value]) => {
            return <li key={key}>{`${key.toUpperCase()}: ${value}`}</li>;
          })}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">스킬</h2>
        {championDetail.spells.map((spell) => {
          return (
            <div key={spell.id} className="flex flex-col">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${spell.image.full}`}
                alt=""
                width="50"
								height="50"
								className="border my-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{`${spell.name} [${spell.id.replace(
                  params.id,
                  ""
                )}]`}</h3>
                <p>{spell.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChampionDetailPage;
