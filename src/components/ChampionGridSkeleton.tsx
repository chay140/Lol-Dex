export default function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 28 }).map((_, index) => (
        <div
          key={index}
          className="border border-black rounded p-4 animate-pulse w-[195px] dark:border-white"
        >
          {/* 이미지 부분 */}
          <div className="w-24 h-24 bg-gray-300 rounded mx-auto dark:bg-gray-600"></div>

          {/* 설명 부분 */}
          <div className="mt-4 h-6 bg-gray-300 rounded w-3/4 mx-auto dark:bg-gray-600"></div>
          <div className="mt-2 h-4 bg-gray-300 rounded w-2/4 mx-auto dark:bg-gray-600"></div>
        </div>
      ))}
    </div>
  );
}
