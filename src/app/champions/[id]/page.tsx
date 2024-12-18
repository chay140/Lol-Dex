import { fetchChampionDetail, fetchLatestVersion } from "@/utils/serverApi";
import { LOADING_URL, SPLASH_URL } from "@/utils/utilConst";
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

  return {
    title: `${data.name} - Lol Dex`,
    description: `${data.lore}`,
  };
}

const ChampionDetailPage = async ({ params }: ChampDetailProps) => {
  const championDetail = await fetchChampionDetail(params.id);
  const latestVersion = await fetchLatestVersion();
  const spellKeys = ["Q", "W", "E", "R"];
  const statKeys = ["공격", "방어", "마법", "난이도"]

  return (
    <div className="mx-auto text-white">
      {/* 챔피언 뒷배경 */}
      <div className="bg fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[-10] ">
        <span className="dimmed absolute w-full h-full bg-[rgba(0,0,0,0.6)]"></span>
        <Image
          className="min-w-full min-h-full object-cover blur-sm"
          src={`${SPLASH_URL}/${championDetail.id}_0.jpg`}
          alt={championDetail.id}
          width={500}
          height={500}
        />
      </div>

      <div className="rounded-lg bg-[rgba(142,142,142,0.6)] dark:bg-[rgba(0,0,0,0.6)] p-8">
        <div className="flex flex-col md:flex-row gap-4 items-center ">
          <Image
            className="object-cover mr-8 rounded-lg"
            src={`${LOADING_URL}/${championDetail.id}_0.jpg`}
            alt={`${championDetail.id} loading image`}
            width={308}
            height={560}
            priority
          />
          <div>
            {/* 챔피언 설명 */}
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">{championDetail.name}</h1>
              <h2 className="text-2xl text-gray-300 dark:text-gray-400 mb-4">
                {championDetail.title}
              </h2>
              <p className="mt-4">{championDetail.lore}</p>
            </div>

            {/* 스탯 및 스킬 */}
            <div className="flex flex-col min-[945px]:flex-row">
              {/* 스탯 부분 */}
              <div className="mt-6 mr-12">
                <h2 className="text-2xl font-semibold mb-4">스탯</h2>
                <ul className="list-none list-inside">
                  {Object.entries(championDetail.info).map(
                    ([key, value], i) => {
                      return <li key={key}>{`${statKeys[i]}: ${value}`}</li>;
                    }
                  )}
                </ul>
              </div>

              {/* 스킬 */}
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">스킬</h2>
                <div className="flex flex-row gap-6">
                  <div className="relative group flex flex-col items-center cursor-pointer">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/passive/${championDetail.passive.image.full}`}
                      alt=""
                      width="50"
                      height="50"
                      className="border my-4"
                    />
                    <h3 className="text-base font-semibold">{`[P]`}</h3>
                    {/* 호버 이팩트 */}
                    <div className="absolute top-full hidden group-hover:flex flex-col items-center bg-gray-800 text-white text-sm p-3 rounded shadow-lg w-64 z-5">
                      <h4 className="font-bold mb-2">
                        {championDetail.passive.name}
                      </h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: championDetail.passive.description,
                        }}
                      />
                    </div>
                  </div>
                  {championDetail.spells.map((spell, i) => {
                    return (
                      <div
                        key={spell.id}
                        className="relative group flex flex-col items-center cursor-pointer"
                      >
                        <Image
                          src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${spell.image.full}`}
                          alt=""
                          width="50"
                          height="50"
                          className="border my-4"
                        />
                        <h3 className="text-base font-semibold">{`[${spellKeys[i]}]`}</h3>
                        {/* 호버 이팩트 */}
                        <div className="absolute top-full hidden group-hover:flex flex-col items-center bg-gray-800 text-white text-sm p-3 rounded shadow-lg w-64 z-5">
                          <h4 className="font-bold mb-2">{spell.name}</h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: spell.description,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">스킨</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {championDetail.skins.map((skin) => (
              <div key={skin.num} className="flex flex-col items-center">
                <Image
                  src={`${LOADING_URL}/${championDetail.id}_${skin.num}.jpg`}
                  alt={skin.name}
                  width={250}
                  height={100}
                  className="rounded-lg"
                />

                <h3 className="text-base font-semibold">
                  {skin.name === "default" ? "기본 스킨" : skin.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionDetailPage;
