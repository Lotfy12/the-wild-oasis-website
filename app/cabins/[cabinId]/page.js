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
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="scale-[1.15] -translate-x-3 relative aspect-square">
          <Image
            className="object-cover"
            src={cabin.img}
            alt={`Cabin ${cabin.name}`}
            fill
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {cabin.name}
          </h3>

          <p className="mb-10 text-lg text-primary-300">
            <TextExpander>{cabin.description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex items-center gap-3">
              <UsersIcon className="w-5 h-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{cabin.maxCapacity}</span>
                guests
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon className="w-5 h-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <EyeSlashIcon className="w-5 h-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="mb-10 text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Suspense fallback={<Spinner />}>
        <div className="grid grid-cols-2 border border-primary-800">
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
