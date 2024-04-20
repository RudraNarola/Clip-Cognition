import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
export default async function Header() {
  const { userId } = auth();

  return (
    <div className=" text-neutral-100">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/">Home</Link>
        <div>
          {userId ? (
            <div className="flex gap-4 items-center">
              <Link href="/dashboard">Dashboard</Link>
              {/* <Link href='/upload'>Upload</Link> */}
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/sign-up">Sign up</Link>
              <Link href="/sign-in">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
