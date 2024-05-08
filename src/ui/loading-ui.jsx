import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border"></div>
    </div>
  );
}
