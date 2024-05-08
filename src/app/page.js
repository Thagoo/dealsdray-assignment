import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center space-y-8">
        <h1 className="text-2xl font-semibold">
          {" "}
          Welcome to DealsDray Dashboard
        </h1>

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
