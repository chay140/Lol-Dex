// import Image from "next/image";
import Link from "next/link";

interface ChampionCardProps {
  champion: Champion;
}
const ChampionCard = ({ champion }: ChampionCardProps) => {
  return (
    <Link
      className="flex flex-col items-center border border-black rounded p-4 hover:shadow-xl text-center w-[195px] dark:border-white dark:shadow-gray-500"
      href={`/champions/${champion.id}`}
      scroll={true}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.image.full}`}
        alt={`${champion.id}.png`}
        loading="lazy"
        width="100"
        height="100"
      />
      <h2 className="mt-2 text-xl font-semibold">{champion.name}</h2>
      <p className="text-gray-500">{champion.title}</p>
    </Link>
  );
};

export default ChampionCard;
