import { fetchRandomChampionDetail } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const champ_one = await fetchRandomChampionDetail();
  const champ_two = await fetchRandomChampionDetail();
  const champ_three = await fetchRandomChampionDetail();
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">리그 오브 레전드 정보 앱</h1>
        <p className="mt-4 text-gray-500">
          Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.
        </p>
      </div>
      <div className="mt-[40px] grid grid-cols-3 gap-10 h-full">
        <Link href="/champions" className="rounded p-4">
          <Image
            className="object-cover"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ_one.id}_0.jpg`}
            alt={`${champ_one.id} loading image`}
            width={308}
            height={560}
            priority
          />
          <span className="block text-center mt-2 text-lg font-semibold">
            챔피언
          </span>
        </Link>
        <Link href="/items" className="rounded p-4 ">
          <Image
            className="object-cover"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ_two.id}_0.jpg`}
            alt={`items loading image`}
            width={308}
            height={560}
            priority
          />
          <span className="block text-center mt-2 text-lg font-semibold">
            아이템 목록
          </span>
        </Link>
        <Link href="/rotation" className="rounded p-4 ">
          <Image
            className="object-cover"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ_three.id}_0.jpg`}
            alt={`${champ_three.id} loading image`}
            width={308}
            height={560}
            priority
          />
          <span className="block text-center mt-2 text-lg font-semibold">
            챔피언 로테이션
          </span>
        </Link>
      </div>
    </>
  );
}
