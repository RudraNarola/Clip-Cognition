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
          <Image
            src="/logo.jpg"
            height={40}
            width={40}
            alt="logo"
            className="object-cover rounded-full h-14 w-14 bg-transparent"
          />
          <Link href="/" className="font-bold text-2xl">
            ClipCognition
          </Link>
        </div>
        <div className="flex gap-2">
          {userId ? (
            <div className="flex gap-20 items-center">
              <div className="flex items-center gap-10 text-lg">
                <Link
                  href="/upload"
                  className="hover:bg-gray-500/10 px-3 py-1 rounded-md"
                >
                  Upload
                </Link>

                <Link
                  href="/profile"
                  className="hover:bg-gray-500/10 px-3 py-1 rounded-md"
                >
                  Profile
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white text-lg">{user?.fullName}</span>
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
