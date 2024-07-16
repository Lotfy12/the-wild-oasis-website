import "@/app/_styles/globals.css";

import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
console.log(josefin);

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome to the Wild Oasis",
  },
  description: "Luxury Cabins Located in the Woods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen bg-primary-950 text-primary-100 `}
      >
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="flex flex-col w-full mx-auto ">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
