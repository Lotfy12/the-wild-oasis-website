"use client";
import { updateGuest } from "./actions";

export default function UpDateProfileCountry({ guest }) {
  const { fullName, email, nationality, nationalId, countryFlag } = guest;

  return (
    <form
      className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900"
      action={updateGuest}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          defaultValue={fullName}
          name="fullName"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          defaultValue={email}
          name="email"
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-3 space-y-2 ">
          <label htmlFor="nationalId">National ID number</label>
          <input
            id="nationalId"
            name="nationalId"
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            defaultValue={nationalId}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="nationalId">nationality ID name</label>
          <input
            id="nationality"
            name="nationality"
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            defaultValue={nationality}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="countryFlag">countryFlag ID symbol</label>
          <input
            id="countryFlag"
            name="countryFlag"
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            defaultValue={countryFlag}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-6">
        <button className="px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          Update profile
        </button>
      </div>
    </form>
  );
}
