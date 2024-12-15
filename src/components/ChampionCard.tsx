import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ChampionCardProps {
	champion: Champion
}
const ChampionCard = ({champion} : ChampionCardProps) => {
  return (
    <Link className="border rounded p-4 hover:shadow-lg" href={`/champions/${champion.id}`}>
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
}

export default ChampionCard
