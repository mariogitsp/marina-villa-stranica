import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { attractions, VILLA_NAME, VILLA_ADDRESS } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return attractions.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const attraction = attractions.find((a) => a.slug === slug);
  if (!attraction) return {};

  return {
    title: `${attraction.title} | Near ${VILLA_NAME}`,
    description: `${attraction.title} is ${attraction.distance} from ${VILLA_NAME}. ${attraction.description.slice(0, 140)}...`,
    openGraph: {
      title: `${attraction.title} | Near ${VILLA_NAME}`,
      description: attraction.description.slice(0, 200),
      type: "article",
    },
  };
}

export default async function AttractionPage({ params }: PageProps) {
  const { slug } = await params;
  const attraction = attractions.find((a) => a.slug === slug);

  if (!attraction) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-lg font-heading font-bold text-white"
          >
            {VILLA_NAME}
          </Link>
          <Link
            href="/#attractions"
            className="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
          <svg
            className="h-4 w-4"
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
          {attraction.distance} from {VILLA_NAME}
        </div>

        <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
          {attraction.title}
        </h1>

        <div className="prose prose-gray max-w-none">
          {attraction.description.split(". ").reduce<string[][]>(
            (acc, sentence, i) => {
              const paragraphIndex = Math.floor(i / 3);
              if (!acc[paragraphIndex]) acc[paragraphIndex] = [];
              acc[paragraphIndex].push(sentence);
              return acc;
            },
            []
          ).map((sentences, i) => (
            <p
              key={i}
              className="mb-4 text-base leading-relaxed text-gray-700"
            >
              {sentences.join(". ")}{sentences[sentences.length - 1].endsWith(".") ? "" : "."}
            </p>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-10 rounded-xl border border-primary-100 bg-primary-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-primary-800">
            Staying at {VILLA_NAME}?
          </h2>
          <p className="mb-4 text-sm text-primary-700">
            This attraction is just {attraction.distance} from our villa at{" "}
            {VILLA_ADDRESS}. Book your stay and explore all the wonders of the
            Dalmatian Coast.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.vrbo.com/en-gb/p2674549"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Book Your Stay
            </a>
            <Link
              href="/#attractions"
              className="rounded-lg border border-primary-300 px-5 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100"
            >
              View All Attractions
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {VILLA_NAME}. All rights reserved.
      </footer>
    </div>
  );
}
