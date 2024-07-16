import { updateBooking } from "@/app/_components/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;
  const booking = await getBooking(bookingId);
  const cabin = await getCabin(booking.cabinId);

  const maxCapacity = cabin.maxCapacity;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900"
        action={updateBooking}
      >
        <input type="hidden" value={bookingId} name="bookingId" />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            defaultValue={booking.numGuests}
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
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            defaultValue={booking.observations}
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <button className="px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update Reservation
          </button>
        </div>
      </form>
    </div>
  );
}
