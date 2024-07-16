"use client";

import { differenceInDays, format } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "./actions";

function ReservationForm({ cabin }) {
  const { range } = useReservation();
  const { maxCapacity, regularPrice, discond, id } = cabin;
  const startDate = range?.from;
  const endDate = range?.to;

  const numNights =
    range?.from && range?.to ? differenceInDays(range?.to, range?.from) + 1 : 0;

  const cabinsPrice = numNights * (regularPrice - discond);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinsPrice,
    cabinId: id,
  };

  const createBookingWithDate = createBooking.bind(null, bookingData);

  const formattedFromDate = range?.from
    ? format(new Date(range?.from), "MMM dd yyyy")
    : " from ...";
  const formattedToDate = range?.to
    ? format(new Date(range?.to), "MMM dd yyyy")
    : "  ...";
  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between px-16 py-2 bg-primary-800 text-primary-300">
        {formattedFromDate} to {formattedToDate}
      </div>

      <form
        className="flex flex-col gap-5 px-16 py-10 text-lg bg-primary-900"
        action={createBookingWithDate}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-base text-primary-300">Start by selecting dates</p>

          <button className="px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
