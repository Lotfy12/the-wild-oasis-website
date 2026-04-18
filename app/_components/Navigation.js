import Link from "next/link";
import { auth } from "@/app/_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl md:text-xl text-center w-full">
      <ul className="flex flex-col sm:flex-row items-center gap-8 md:gap-16 w-full justify-center">
        <li className="w-full sm:w-auto">
          <Link
            href="/cabins"
            className="block py-2 w-full transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li className="w-full sm:w-auto">
          <Link
            href="/about"
            className="block py-2 w-full transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li className="w-full sm:w-auto">
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex justify-center items-center gap-2 md:gap-4 py-2 w-full transition-colors hover:text-accent-400"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="block py-2 w-full transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
