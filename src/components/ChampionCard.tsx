import Image from "next/image";
import Link from "next/link";

interface ChampionCardProps {
  champion: Champion;
}
const ChampionCard = ({ champion }: ChampionCardProps) => {
  return (
    <Link
      className="flex flex-col items-center border rounded p-4 hover:shadow-lg text-center w-[195px] "
      href={`/champions/${champion.id}`}
      scroll={true}
    >
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.image.full}`}
        alt={`${champion.id}.png`}
        width="100"
        height="100"
      />
      <h2 className="mt-2 text-xl font-semibold">{champion.name}</h2>
      <p className="text-gray-500">{champion.title}</p>
    </Link>
  );
};

export default ChampionCard;
