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
            className={`text-sm ${
              filled || half ? "text-amber-500" : "text-border"
            }`}
          >
            {filled ? "★" : half ? "★" : "☆"}
          </span>
        );
      })}

      <span className="text-xs text-muted ml-1">
        {rate.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}
