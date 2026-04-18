"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex overflow-x-auto border border-primary-800 w-full md:w-auto">
      <button
        className="px-4 py-2 sm:px-5 hover:bg-primary-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
        onClick={() => handleFilter("all")}
      >
        All Cabins
      </button>
      <button
        className="px-4 py-2 sm:px-5 hover:bg-primary-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 Guests
      </button>
      <button
        className="px-4 py-2 sm:px-5 hover:bg-primary-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 Guests
      </button>
      <button
        className="px-4 py-2 sm:px-5 hover:bg-primary-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
        onClick={() => handleFilter("large")}
      >
        8&mdash; 12 Guests
      </button>
    </div>
  );
}

export default Filter;
