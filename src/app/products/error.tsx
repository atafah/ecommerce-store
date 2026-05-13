"use client"; // <- error files must always be client components

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void; // <- Next.js passes this to retry
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Products page error:", error);
  }, [error]);

  return (
    <div className="p-8 flex flex-col items-center min-h-96 text-center">
      <div className="text-5xl mb-4">😵</div>
      <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        We could not load the products. This might be a network issue or the
        server may be down.
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
