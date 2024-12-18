"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { refresh } = useRouter();;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center">
      <h2 className="mt-2 text-xl font-semibold">에러가 발생했어요!!</h2>
      <p className="text-red-800 mt-2 text-base font-semibold">
        Error message: {error.message}
      </p>
      <button
        onClick={() =>
          startTransition(() => {
            refresh();
            reset();
          })
        }
        className="bg-gray-800 text-white p-4 rounded-lg m-4"
      >
        다시 시도하기
      </button>
    </div>
  );
}
