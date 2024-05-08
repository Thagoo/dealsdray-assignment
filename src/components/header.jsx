import { auth, signOut } from "@/lib/auth";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });

export default async function Header() {
  const session = await auth();

  return (
    <div className="flex w-full gap-10 items-center mb-10">
      <Link href="/" className={pacifico.className}>
        <span className="text-4xl text-slate-700 font-semibold ">
          Dealsdray
        </span>
      </Link>
      <Link
        href="/dashboard"
        className="hover:bg-slate-100 px-4 py-2 rounded-md"
      >
        <span className="text-lg uppercase font-light">Dashboard</span>
      </Link>
      {session?.user.username && (
        <div className="flex gap-4 ml-auto items-center">
          <div className="flex-col">
            <Image
              src={"/assets/no-avatar.svg"}
              alt="avatar logo"
              width={40}
              height={24}
              className="rounded-full p-1 mr-2"
            />
            <p className="text-slate-800 font-light cursor-default">
              {session?.user.username}
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-slate-800 md:flex-none md:justify-start md:p-2 md:px-3">
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
