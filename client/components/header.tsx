import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import Image from "next/image";
export default async function Header() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div className=" text-neutral-100">
      <div className="container flex items-center justify-between font-custom pt-6">
        <div className="flex gap-2 items-center">
          <Link
            href="/"
            className="font-bold text-2xl flex  items-center gap-3"
          >
            <Image
              src="/logo.jpg"
              height={40}
              width={40}
              alt="logo"
              className="object-cover rounded-full h-14 w-14 bg-transparent"
            />
            ClipCognition
          </Link>
        </div>
        <div className="flex gap-2">
          {userId ? (
            <div className="flex gap-20 items-center">
              <div className="flex items-center gap-10 text-lg">
                <Link
                  href="/quizes"
                  className="hover:bg-gray-500/10 px-3 py-1 rounded-md"
                >
                  Quiz
                </Link>
                <Link
                  href="/leaderboard"
                  className="hover:bg-gray-500/10 px-3 py-1 rounded-md"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/upload"
                  className="hover:bg-gray-500/10 px-3 py-1 rounded-md"
                >
                  Upload
                </Link>
              </div>
              <div className="flex items-center gap-1 hover:bg-gray-500/10 px-3 py-1 rounded-md">
                <Link href="/profile" className="px-3 py-1 rounded-md">
                  {" "}
                  <span className="text-white text-xl font-semibold">
                    {user?.fullName}
                  </span>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/sign-up">
                <Button variant={"primary"} size={"sm"}>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
