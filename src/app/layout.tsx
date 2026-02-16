import type { Metadata } from "next";
import { VILLA_NAME, VILLA_ADDRESS, BOOKING_URL } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: `${VILLA_NAME} | Luxury Vacation Rental in Marina, Croatia`,
  description:
    "Luxury private villa with pool in Marina, Croatia. Mountain views, modern amenities, peaceful Dalmatian coast escape. Book your Mediterranean paradise today.",
  keywords: [
    "villa rental Croatia",
    "Marina Croatia holiday home",
    "luxury villa Dalmatian coast",
    "private pool villa Croatia",
    "vacation rental Split area",
    "holiday home Oasis Villa Marina",
  ],
  openGraph: {
    title: `${VILLA_NAME} | Luxury Villa in Marina, Croatia`,
    description:
      "Luxury private villa with pool, mountain views, and Mediterranean charm on the Dalmatian Coast. Perfect for families and groups.",
    url: "https://villaoasismarina.com",
    siteName: VILLA_NAME,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: `${VILLA_NAME} - Luxury vacation rental in Marina, Croatia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${VILLA_NAME} | Luxury Villa in Marina, Croatia`,
    description:
      "Luxury private villa with pool on the Dalmatian Coast. Book your paradise.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://villaoasismarina.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: VILLA_NAME,
  description:
    "Luxury private villa with pool in Marina, Croatia. Mountain views, modern amenities, peaceful Dalmatian coast escape.",
  url: "https://villaoasismarina.com",
  image: "https://villaoasismarina.com/images/hero.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Podubaščak 2B",
    addressLocality: "Pozorac (Marina)",
    postalCode: "21222",
    addressCountry: "HR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.5072,
    longitude: 16.1153,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Barbecue Grill", value: true },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "10",
    bestRating: "10",
    ratingCount: "11",
  },
  sameAs: [BOOKING_URL],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
