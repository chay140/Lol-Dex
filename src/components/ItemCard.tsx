import Image from "next/image";

interface ItemCardProps {
  item: Item;
  version: string;
}
const ItemCard = ({ item, version }: ItemCardProps) => {
  return (
    <div className="border rounded p-4 hover:shadow-lg">
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
        alt={`${item.name}`}
        width="100"
        height="100"
      />
      <h2 className="mt-2 text-xl font-semibold">{item.name}</h2>
      <p className="text-gray-500">{item.plaintext}</p>
    </div>
  );
};

export default ItemCard;
