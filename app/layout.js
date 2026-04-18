import "@/app/_styles/globals.css";

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
        className={`${josefin.className} flex flex-col min-h-screen bg-primary-950 text-primary-100 `}
      >
        <Header />
        <div className="flex-1 px-4 py-8 md:px-8 md:py-12">
          <main className="flex flex-col w-full mx-auto max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
