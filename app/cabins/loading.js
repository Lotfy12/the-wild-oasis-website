import Spinner from "@/app/_components/Spinner";
export default function Loading() {
  return (
    <div className="items-center grid justify-center">
      <Spinner />
      <div className="text-xl text-primary-200">Loading cabins ...</div>
    </div>
  );
}
