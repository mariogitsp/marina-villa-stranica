import Link from "next/link";
import { attractions } from "@/lib/data";

export default function AttractionsPreview() {
  return (
    <section id="attractions" className="section-padding">
      <h2 className="section-title">Nearby Attractions</h2>
      <p className="section-subtitle">
        Discover the rich history, stunning nature, and vibrant culture of the Dalmatian Coast
      </p>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {attractions.map((attraction) => (
          <Link
            key={attraction.slug}
            href={`/${attraction.slug}`}
            className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="mb-3 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z"
                />
              </svg>
              <span className="text-xs font-medium text-primary-600">
                {attraction.distance}
              </span>
            </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
              {attraction.title}
            </h3>

            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
              {attraction.description}
            </p>

            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700">
              Learn more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
