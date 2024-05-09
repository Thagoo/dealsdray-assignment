import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-8 h-80">
        <h1 className="text-2xl font-semibold"> Welcome to Admin Panel</h1>

        <Link
          href={"/dashboard"}
          className="bg-slate-900 py-2 px-8 rounded-md text-white hover:bg-slate-800"
        >
          Go to Dashboard
        </Link>
      </div>
    </>
  );
}
