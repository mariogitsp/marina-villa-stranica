import type { Review } from "@/types";

function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(rating / 2);
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 10`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < stars ? "text-gold-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="mb-3 flex items-center justify-between">
        <StarRating rating={review.rating} />
        <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
          {review.rating}/10
        </span>
      </div>

      <h3 className="mb-2 text-base font-semibold text-gray-900">
        {review.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div className="mt-auto border-t border-gray-50 pt-3">
        <p className="text-sm font-medium text-gray-800">{review.name}</p>
        <p className="text-xs text-gray-500">
          {review.date} &middot; {review.stayDuration}
        </p>
      </div>
    </div>
  );
}
