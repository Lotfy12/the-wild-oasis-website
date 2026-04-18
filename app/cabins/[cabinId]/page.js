import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import {
  getBookedDatesByCabinId,
  getCabin,
  getCabins,
  getSettings,
} from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import { Suspense } from "react";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

const Page = async ({ params }) => {
  const cabin = await getCabin(params.cabinId);

  const settings = await getSettings();
  const bookedDates = getBookedDatesByCabinId(params.cabinId);

  return (
    <div className="lg:max-w-6xl mt-4 md:ml-8 md:mt-8 sm:max-w-[800px]">
      <div className="flex flex-col lg:grid lg:grid-cols-[3fr_4fr] gap-8 lg:gap-20 border border-primary-800 py-6 px-5 lg:py-3 lg:px-10 mb-8 lg:mb-24">
        <div className="w-full relative aspect-square lg:scale-[1.15] lg:-translate-x-3">
          <Image
            className="object-cover"
            src={cabin.img}
            alt={`Cabin ${cabin.name}`}
            fill
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-3xl sm:text-4xl lg:text-7xl mb-5 lg:translate-x-[-254px] bg-primary-950 p-4 lg:p-6 lg:pb-1 w-full lg:w-[150%] text-center lg:text-left">
            Cabin {cabin.name}
          </h3>

          <p className="mb-6 lg:mb-10 text-base lg:text-lg text-primary-300">
            <TextExpander>{cabin.description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7 space-y-2 lg:space-y-0">
            <li className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <UsersIcon className="flex-shrink-0 w-5 h-5 text-primary-600" />
              <span className="text-sm sm:text-base lg:text-lg">
                For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <MapPinIcon className="flex-shrink-0 w-5 h-5 text-primary-600" />
              <span className="text-sm sm:text-base lg:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <EyeSlashIcon className="flex-shrink-0 w-5 h-5 text-primary-600" />
              <span className="text-sm sm:text-base lg:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="mb-6 lg:mb-10 text-2xl sm:text-3xl lg:text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Suspense fallback={<Spinner />}>
        <div className="flex flex-col lg:grid lg:grid-cols-2 border border-primary-800">
          <DateSelector
            settings={settings}
            bookedDates={bookedDates}
            cabin={cabin}
          />
          <ReservationForm cabin={cabin} />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
