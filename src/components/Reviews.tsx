"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { reviews, BOOKING_URL } from "@/lib/data";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Show 1 on mobile, 2 on md, 3 on lg — we track via state
  const [perPage, setPerPage] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerPage(3);
      else if (window.innerWidth >= 768) setPerPage(2);
      else setPerPage(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, reviews.length - perPage);

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  };

  const handlePrev = () => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
    resetTimer();
  };
  const handleNext = () => { next(); resetTimer(); };

  const visible = reviews.slice(current, current + perPage);
  // Handle wrap-around
  const displayReviews =
    visible.length < perPage
      ? [...visible, ...reviews.slice(0, perPage - visible.length)]
      : visible;

  return (
    <section id="reviews" className="section-padding bg-gray-50">
      <h2 className="section-title">Guest Reviews</h2>
      <p className="section-subtitle">
        Rated 10/10 by our guests &mdash; read their experiences
      </p>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayReviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${current}-${i}`} review={review} />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="rounded-full border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Previous reviews"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: Math.ceil(reviews.length / perPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i * perPage); resetTimer(); }}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(current / perPage) === i
                    ? "w-6 bg-primary-600"
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to review page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="rounded-full border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Next reviews"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border-2 border-primary-600 px-6 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
          >
            Join Our Happy Guests
          </a>
        </div>
      </div>
    </section>
  );
}
