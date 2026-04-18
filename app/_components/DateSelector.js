"use client";

import { differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function DateSelector({ settings, cabin }) {
  const { regularPrice, discond } = cabin;
  const { minBookingLength, maxBookingLength } = settings;
  const { range, setRange, resetRange } = useReservation();

  const numNights =
    range?.from && range?.to ? differenceInDays(range?.to, range?.from) + 1 : 0;
  const cabinPrice = numNights * (regularPrice - discond);

  return (
    <div className="flex flex-col justify-between overflow-hidden">
      <div className="w-full overflow-x-auto">
        <DayPicker
          className="pt-12 place-self-center min-w-max pb-4 px-4 sm:px-0"
          mode="range"
          min={minBookingLength}
          max={maxBookingLength}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-0 bg-accent-500 text-primary-800 min-h-[72px] gap-4 sm:gap-0">
        <div className="flex flex-wrap items-baseline gap-4 sm:gap-6">
          <p className="flex items-baseline gap-2">
            {discond > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">${regularPrice - discond}</span>
                <span className="font-semibold line-through text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>

          <p className="px-3 py-2 text-xl sm:text-2xl bg-accent-600">
            <span>{numNights}</span>
          </p>
          <span className="text-xl sm:text-2xl">$ {cabinPrice}</span>
        </div>

        {range?.from || range?.to ? (
          <button
            className="px-4 py-2 text-sm font-semibold border border-primary-800 w-full sm:w-auto"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}

      </div>
    </div>
  );
}

export default DateSelector;
