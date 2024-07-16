import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};
export default async function Page() {
  const session = await auth();
  console.log(session);

  const welcomeMessage = session?.user
    ? `Welcome ${session.user.name}`
    : "Welcome ";

  return (
    <h1 className="text-2xl font-semibold text-accent-400 mb-7">
      {welcomeMessage}
    </h1>
  );
}
