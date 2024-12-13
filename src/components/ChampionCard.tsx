import Link from 'next/link'
import React from 'react'

interface ChampionCardProps {
	champion: Champion
}
const ChampionCard = ({champion} : ChampionCardProps) => {
  return (
    <Link className='border rounded p-4 hover:shadow-lg' href={`/champions/`}>
          <img />
			<h2 className="mt-2 text-xl font-semibold">{champion.id}</h2>
			<p className="text-gray-500">{champion.title}</p>
    </Link>
  )
}

export default ChampionCard
