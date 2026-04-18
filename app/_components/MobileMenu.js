"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function MobileMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="sm:hidden p-2 text-primary-100 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XMarkIcon className="w-8 h-8 text-primary-100" />
        ) : (
          <Bars3Icon className="w-8 h-8 text-primary-100" />
        )}
      </button>

      <div className="hidden sm:block">{children}</div>

      {isOpen && (
        <div className="absolute top-[88px] left-0 w-full bg-primary-950 border-b border-primary-900 p-8 z-40 sm:hidden shadow-lg h-screen md:h-auto pb-32 flex flex-col items-center">
          <div onClick={() => setIsOpen(false)} className="w-full">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
