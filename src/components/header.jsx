import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import React from "react";

export default async function Header() {
  const session = await auth();

  return (
    <div className="flex w-full gap-32 items-center pb-10">
      <Link href="/" className="hover:underline">
        <span className="text-2xl text-slate-700 font-semibold">Dealsdray</span>
      </Link>

      <Link href="/dashboard" className="hover:underline">
        <span className="text-lg text-slate-800">Employee</span>
      </Link>

      {session?.user.username && (
        <div className="flex gap-4 ml-auto">
          <p>{session?.user.username}</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
