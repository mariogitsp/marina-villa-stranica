import { amenities } from "@/lib/data";

function AmenityIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, JSX.Element> = {
    pool: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M2 15c2 0 3-1.5 5-1.5S10 15 12 15s3-1.5 5-1.5S20 15 22 15" strokeLinecap="round" />
        <path d="M2 19c2 0 3-1.5 5-1.5S10 19 12 19s3-1.5 5-1.5S20 19 22 19" strokeLinecap="round" />
        <path d="M8 11V7a2 2 0 012-2h0a2 2 0 012 2v.5" strokeLinecap="round" />
      </svg>
    ),
    washer: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <rect x="3" y="2" width="18" height="20" rx="2" />
        <circle cx="12" cy="13" r="5" />
        <circle cx="12" cy="13" r="2" />
        <circle cx="7" cy="5.5" r="0.75" fill="currentColor" />
      </svg>
    ),
    wifi: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M5 12.55a11 11 0 0114 0" strokeLinecap="round" />
        <path d="M8.5 16.05a7 7 0 017 0" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    ac: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M12 2v10M12 12l-4 6M12 12l4 6M12 12l-7-3M12 12l7-3" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    outdoor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    parking: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 16V8h4a3 3 0 010 6H9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    bbq: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <ellipse cx="12" cy="12" rx="8" ry="4" />
        <path d="M7 16l-2 5M17 16l2 5M12 16v5" strokeLinecap="round" />
        <path d="M9 8c0-2 1-3 1-4M12 8c0-2 1-3 1-4M15 8c0-2 1-3 1-4" strokeLinecap="round" />
      </svg>
    ),
    beach: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M17.5 8.5L19 2l-4.5 3.5L12 2 9.5 5.5 5 2l1.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 21c1.5-2 4-3 7-3s5.5 1 7 3" strokeLinecap="round" />
        <path d="M3 21h18" strokeLinecap="round" />
        <path d="M12 8.5V18" strokeLinecap="round" />
      </svg>
    ),
    mountain: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M3 20l5-12 4 6 3-4 6 10H3z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="5" r="2" />
      </svg>
    ),
  };

  return iconMap[icon] || null;
}

export default function Amenities() {
  return (
    <section id="amenities" className="section-padding">
      <h2 className="section-title">Amenities</h2>
      <p className="section-subtitle">
        Everything you need for a comfortable and memorable stay
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3">
        {amenities.map((amenity) => (
          <div
            key={amenity.name}
            className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="text-primary-600">
              <AmenityIcon icon={amenity.icon} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {amenity.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
