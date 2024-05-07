import Image from "next/image";

export default function LoadingSpinner({ height, width }) {
  return (
    <div role="status " className="inline-block animate-[spin_1s_infinite]">
      <Image
        src={"/assets/loading-spinner.svg"}
        height={height || 30}
        width={width || 30}
        alt="spinner"
      />
    </div>
  );
}
