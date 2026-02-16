import { VILLA_NAME, BOOKING_URL, buzzPhrases } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="parallax-hero relative flex min-h-screen items-center justify-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {VILLA_NAME}
        </h1>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {buzzPhrases.slice(0, 4).map((phrase) => (
            <span
              key={phrase}
              className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm sm:text-base"
            >
              {phrase}
            </span>
          ))}
        </div>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 sm:text-xl">
          Your peaceful escape on the Dalmatian Coast. Private pool, mountain
          views, and Mediterranean charm in Marina, Croatia.
        </p>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5"
        >
          Book Your Stay
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#gallery" className="block animate-bounce-slow text-white/70">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
