"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Product detail error:", error);
  }, [error]);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-96 text-center">
      <div className="text-5xl mb-4">😵</div>
      <h2 className="text-2xl font-bold mb-2">Could not load this product!</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        This product may no longer exist or there was a network issue.
      </p>
      <button
        onClick={reset}
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
      >
        Try Again
      </button>
    </div>
  );
}
