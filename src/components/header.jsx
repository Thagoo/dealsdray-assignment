import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex w-full gap-32 items-center pb-10">
      <Link href="/" className="hover:underline">
        <span className="text-2xl text-slate-700 font-semibold">Dealsdray</span>
      </Link>

      <Link href="/dashboard" className="hover:underline">
        <span className="text-lg text-slate-800">Employee</span>
      </Link>

      <div className="flex gap-4 ml-auto">
        <p>username</p>
        <button>sign out</button>
      </div>
    </div>
  );
}
