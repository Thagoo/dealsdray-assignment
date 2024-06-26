import { auth, signOut } from "@/lib/auth";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });

export default async function Header() {
  const session = await auth();

  return (
    <div className="flex w-full gap-2 md:gap-10 items-center px-2 py-2 md:px-24 md:py-4 bg-slate-800 drop-shadow-md shadow-black">
      <Link href="/" className={pacifico.className}>
        <span className="text-xl md:text-4xl font-semibold text-white">
          Dealsdray
        </span>
      </Link>
      <Link
        href="/dashboard"
        className="hover:bg-slate-700 px-4 py-2 rounded-md"
      >
        <span className="text-xs md:text-lg uppercase font-light text-white">
          Dashboard
        </span>
      </Link>
      {session?.user.username && (
        <div className="flex ml-auto items-center">
          <div className="flex flex-col md:flex-row items-center">
            <Image
              src={"/assets/no-avatar.svg"}
              alt="avatar logo"
              width={40}
              height={24}
              className="rounded-full p-1"
            />
            <p className="text-white font-light cursor-default">
              {session?.user.username}
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex items-center justify-center gap-2 rounded-md bg-gray-50 text-xs px-2 py-2 md:text-sm font-medium hover:bg-sky-100 hover:text-slate-800 md:flex-none md:justify-start md:p-2 md:px-3">
              <div>Sign Out</div>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
