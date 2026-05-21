export default function Loading() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-4 flex flex-col gap-3">
            <div className="w-full h-48 rounded-lg shimmer" />
            <div className="h-4 rounded shimmer" />
            <div className="h-4 rounded shimmer w-1/2" />
            <div className="h-10 rounded-lg shimmer mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
