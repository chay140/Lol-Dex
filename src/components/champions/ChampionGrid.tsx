import React from "react";
import ChampionCard from "./ChampionCard";

interface ChampionGridProps {
  champions: Champion[];
}
const ChampionGrid = ({ champions }: ChampionGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {champions?.map((champion) => (
        <ChampionCard key={champion.id} champion={champion} />
      ))}
    </div>
  );
};

export default ChampionGrid;
