import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";
export default function Page() {
  return (
    <main className="mt-12 md:mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="object-cover object-top "
        alt="Mountains and forests with two cabins"
        quality={80}
      />

      <div className="relative z-10 text-center">
        <h1 className="mb-6 md:mb-10 font-normal tracking-tight text-5xl md:text-8xl text-primary-50">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="inline-block px-6 py-4 md:px-8 md:py-6 text-base md:text-lg font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
