"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../_lib/supabase";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "../_lib/auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("user must be logged in first");

  const nationalId = formData.get("nationalId");
  const nationality = formData.get("nationality");
  const countryFlag = formData.get("countryFlag");

  const updateData = { nationalId, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  if (error) throw new Error("Guest Could not be Updated");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("user must be logged in first");
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
  return;
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session) throw new Error("user must be logged in first");

  const updatedDate = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedDate)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("user must be logged in first");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extracePrice: 0,
    totalPrice: bookingData.cabinsPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
