import { VILLA_NAME, VILLA_ADDRESS } from "@/lib/data";

export default function Location() {
  return (
    <section id="location" className="section-padding bg-gray-50">
      <h2 className="section-title">Location</h2>
      <p className="section-subtitle">
        Nestled in the peaceful hills above Marina, just minutes from the coast
      </p>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-lg">
        <iframe
          title={`${VILLA_NAME} location on Google Maps`}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1720.1063359371533!2d16.097714309653064!3d43.52605988632024!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133515677fe750cf%3A0x922dfb0f8e56536d!2sNew%20luxury%20Villa%20with%20heated%20pool!5e0!3m2!1sen!2sus!4v1770853749685!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
      </div>

      <div className="mx-auto mt-6 max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 shadow-sm">
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
          <address className="not-italic text-sm font-medium text-gray-700">
            {VILLA_ADDRESS}
          </address>
        </div>
      </div>
    </section>
  );
}
