import ItemCard from "@/components/ItemCard";
import { fetchItemList, fetchLatestVersion } from "@/utils/serverApi";
import React from "react";

const ItemsPage = async () => {
  const items = await fetchItemList();
  const version = await fetchLatestVersion();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">아이템 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {Object.entries(items).map(([key, item]) => (
          <ItemCard key={key} item={item} version={version} />
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;
