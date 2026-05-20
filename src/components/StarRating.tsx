type Props = {
  rate: number;
  count?: number;
};

export default function StarRating({ rate, count }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rate >= star;
        const half = rate >= star - 0.5 && rate < star;

        return (
          <span
            key={star}
            className={`text-lg ${
              filled
                ? "text-yellow-400"
                : half
                  ? "text-yellow-300"
                  : "text-gray-300"
            }`}
          >
            {filled ? "★" : half ? "★" : "☆"}
          </span>
        );
      })}

      {count !== undefined && (
        <span className="text-sm text-gray-400 ml-1">({count})</span>
      )}
    </div>
  );
}
