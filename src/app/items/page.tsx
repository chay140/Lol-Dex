import ItemCard from "@/components/items/ItemCard";
import { fetchItemList, fetchLatestVersion } from "@/utils/serverApi";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "아이템 목록",
  description: "리그 오브 레전드 아이템 목록 페이지",
};

const ItemsPage = async () => {
  const items = await fetchItemList();
  const version = await fetchLatestVersion();

  return (
    <div className="text-center">
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
