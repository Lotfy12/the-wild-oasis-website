import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  let displayedCabins;

  if (filter == "all") displayedCabins = cabins;

  if (filter == "small")
    displayedCabins = cabins.filter((item) => item.maxCapacity <= 3);

  if (filter == "medium")
    displayedCabins = cabins.filter(
      (item) => item.maxCapacity >= 4 && item.maxCapacity < 7
    );

  if (filter == "large")
    displayedCabins = cabins.filter((item) => item.maxCapacity >= 8);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
