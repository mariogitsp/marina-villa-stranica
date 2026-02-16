import type { Review, Attraction, GalleryImage, Restaurant } from "@/types";

export const VILLA_NAME = "Holiday Home Oasis Villa";
export const VILLA_ADDRESS = "Podubaščak 2B, 21222 Pozorac (Marina), Croatia";
export const BOOKING_URL = "https://www.vrbo.com/en-gb/p2674549";

export const CONTACT_NAME = "Vinko";
export const CONTACT_PHONE = "+385 XX XXX XXXX";
export const CONTACT_EMAIL = "contact@villaoasismarina.com";

export const buzzPhrases: string[] = [
  "Luxury Private Villa in Marina, Croatia",
  "Your Peaceful Escape on the Dalmatian Coast",
  "Private Pool & Mountain Views",
  "Elegance, Privacy & Mediterranean Charm",
  "Book Your Private Paradise",
];

export const reviews: Review[] = [
  {
    name: "Grant M.",
    date: "Aug 2025",
    rating: 10,
    title: "The best villa rental experience",
    comment:
      "We were a group of nine, the villa looked perfect for the size of our group online and was exactly as described when we arrived. The surroundings were very peaceful and quiet. Vinko is the most accommodating and helpful host I have ever experienced. I have been renting villas for 30 years, this is my best experience yet.",
    stayDuration: "14 nights",
  },
  {
    name: "Yamen H.",
    date: "Jul 2025",
    rating: 10,
    title: "Everything was perfect",
    comment:
      "Everything was perfect from cleanliness to ease of access. Thank you.",
    stayDuration: "7 nights",
  },
  {
    name: "Hilary D.",
    date: "Jul 2025",
    rating: 10,
    title: "Perfect villa in a heatwave",
    comment:
      "The villa is spacious & clean, the pool area and outside space was wonderful. We had an amazing time visiting a few islands and bays. All highly recommended!",
    stayDuration: "8 nights",
  },
  {
    name: "Fiona H.",
    date: "Sep 2024",
    rating: 10,
    title: "Exceptional",
    comment:
      "This is a beautiful villa in a lovely, quiet location. Vinko was a great host. The rooms were spacious, clean and very well maintained. Pool was ideal. The villa was only 1km from Marina, a beautiful harbour with a great beach. Overall fantastic, would come again!",
    stayDuration: "7 nights",
  },
  {
    name: "Petra M.",
    date: "Jul 2024",
    rating: 10,
    title: "Nice villa in quiet area with private pool",
    comment:
      "We liked that the villa had all facilities. It was situated in a quiet area with a nice pool. The host was available, friendly and had good tips.",
    stayDuration: "7 nights",
  },
  {
    name: "mattias e.",
    date: "Jul 2024",
    rating: 10,
    title: "Nice and fresh!",
    comment:
      "New and nice house with good standard. Clean and fresh pool that cooled off in the heat. Well equipped kitchen. Very nice surroundings. Vinko was a very nice host who helped us with everything we needed! We recommend this house!",
    stayDuration: "7 nights",
  },
  {
    name: "Charlotte K.",
    date: "Jul 2023",
    rating: 10,
    title: "A wonderful place!",
    comment:
      "This house may look too good to be true. It's not that, it's better! We had a wonderful holiday week. And Vinko is the best host! We will definitely be back.",
    stayDuration: "7 nights",
  },
  {
    name: "Erling M.",
    date: "Aug 2023",
    rating: 10,
    title: "Life quality in the sun",
    comment:
      "We had a great time in the house. Pictures weren't lying, it was even better. The pool and pool area was the highlight for almost everyone, perfect temperature and great for sun lovers. Two thumbs up!",
    stayDuration: "7 nights",
  },
  {
    name: "Thomas K.",
    date: "Sep 2023",
    rating: 10,
    title: "Fantastic",
    comment:
      "Excellent living, nice pool. Vinko was waiting for us and informed us of everything. 10 Stars!",
    stayDuration: "9 nights",
  },
  {
    name: "Ronny R.",
    date: "Aug 2023",
    rating: 10,
    title: "Top Vacation",
    comment:
      "Owner is a perfect host, helpful with any questions. House position is 2-3 min by car from sea in the hills above, a perfect quiet place. Location was perfect, clean and stuffed with all what is needed. We were 9 people and everybody enjoyed their stay.",
    stayDuration: "14 nights",
  },
  {
    name: "Kamil M.",
    date: "Aug 2022",
    rating: 10,
    title: "Summer 2022",
    comment:
      "It was a great week. House is very clean and comfortable for two families. Its situated in very quiet neighbourhood. Our kids spent most of the time at pool. Thank you Vinko for your hospitality. Hope we will come back next year!",
    stayDuration: "7 nights",
  },
];

export const attractions: Attraction[] = [
  {
    slug: "marinska-kula-marina-tower",
    title: "Marinska Kula (Marina Tower)",
    distance: "~5 minutes by car",
    description:
      "Marinska Kula is a 15th-century defensive tower located directly on the waterfront in the town of Marina. It was originally built by the bishops of Trogir to protect the bay from Ottoman naval attacks. The cylindrical stone structure dominates the small harbor and remains the most recognizable landmark in the area. Today, the tower stands as a preserved cultural monument and symbolizes Marina's maritime heritage. The surrounding waterfront promenade features traditional Dalmatian stone houses, small cafés, and local restaurants serving fresh seafood. It is an excellent spot for evening walks, photography, and experiencing authentic coastal village atmosphere.",
  },
  {
    slug: "church-st-mary-drid-hill",
    title: "Church of St. Mary of the Snow - Drid Hill",
    distance: "~10 minutes by car",
    description:
      "This small historic church sits on Drid Hill overlooking Marina and the Adriatic Sea. The site dates back to early medieval times and is surrounded by archaeological remnants from ancient settlements. The location offers panoramic views of the coastline, nearby islands, and the hinterland. Visitors often hike to the hill for both the historical significance and the scenic landscape. The peaceful environment makes it ideal for photography, short hikes, and sunset viewing.",
  },
  {
    slug: "stari-trogir-beach-sevid",
    title: "Stari Trogir Beach - Sevid",
    distance: "~15-20 minutes by car",
    description:
      "Stari Trogir Beach is one of the most beautiful natural beaches in the region. It features a combination of sandy and pebble shoreline with crystal-clear turquoise water. The beach is relatively uncommercialized, making it quieter than many larger Dalmatian beaches. An interesting historical feature is the presence of submerged Roman villa remains (Villa Rustica), visible in shallow water. The surrounding area is perfect for swimming, snorkeling, and relaxing in a natural coastal setting.",
  },
  {
    slug: "krka-national-park",
    title: "Krka National Park",
    distance: "~1 hour by car",
    description:
      "Krka National Park is one of Croatia's most famous natural attractions. The park is centered around the Krka River and is known for its series of spectacular waterfalls, the most famous being Skradinski Buk. Visitors can walk along wooden boardwalks that pass directly over the river and through lush vegetation. The park features emerald pools, cascading waterfalls, diverse wildlife, and historical sites including the Krka Monastery and traditional watermills. Krka is ideal for nature lovers, photographers, and anyone wanting to experience Croatia's inland beauty beyond the coastline. It makes an excellent full-day excursion from Marina-Pozorac.",
  },
  {
    slug: "diocletians-palace-split",
    title: "Diocletian's Palace - Split",
    distance: "~35 minutes by car",
    description:
      "A UNESCO World Heritage Site, Diocletian's Palace is one of the most impressive Roman monuments in the world. Built in the 4th century AD for Emperor Diocletian, the palace now forms the heart of Split's Old Town. The complex includes ancient stone walls, underground cellars, Peristyle Square, the Cathedral of Saint Domnius, and narrow marble streets filled with shops and restaurants. What makes it unique is that it is not just a museum — people still live and work within the palace walls. This destination combines history, architecture, culture, and vibrant city life.",
  },
  {
    slug: "klis-fortress",
    title: "Klis Fortress",
    distance: "~45 minutes by car",
    description:
      "Klis Fortress sits dramatically on a rocky ridge between the mountains and the sea. It has a long military history, having been controlled by Croatian kings, the Venetians, and the Ottomans. The fortress provides sweeping panoramic views over Split, the Adriatic Sea, and surrounding islands. It is also known as a filming location for Game of Thrones. Visitors can explore stone ramparts, defensive walls, and historical exhibits inside the fortress complex.",
  },
];

export const galleryImages: GalleryImage[] = Array.from(
  { length: 19 },
  (_, i) => ({
    src: `/images/gallery/image${String(i + 2).padStart(2, "0")}.jpg`,
    alt: `${VILLA_NAME} - Photo ${i + 1}`,
  })
);

export const amenities = [
  { name: "Pool", icon: "pool" },
  { name: "Washer", icon: "washer" },
  { name: "Free WiFi", icon: "wifi" },
  { name: "Air Conditioning", icon: "ac" },
  { name: "Outdoor Space", icon: "outdoor" },
  { name: "Parking Available", icon: "parking" },
  { name: "Barbecue Grill", icon: "bbq" },
  { name: "Beach Nearby", icon: "beach" },
  { name: "Mountain View", icon: "mountain" },
] as const;

export const restaurants: Restaurant[] = [
  {
    name: "Bijeli Galeb",
    cuisine: "Seafood & Mediterranean",
    distance: "~4 min drive",
    description:
      "Popular waterfront restaurant known for fresh seafood and grilled fish. A local favourite with stunning views of Marina harbour.",
    priceRange: "€€",
  },
  {
    name: "Luka & Lora",
    cuisine: "Modern Croatian",
    distance: "~5 min drive",
    description:
      "Contemporary dining with a creative twist on traditional Dalmatian dishes. Excellent wine selection featuring local Croatian varieties.",
    priceRange: "€€",
  },
  {
    name: "Cappuccino",
    cuisine: "Cafe & Light Dining",
    distance: "~5 min drive",
    description:
      "Relaxed cafe and eatery perfect for morning coffee, light lunches, and evening drinks. Great spot on the Marina waterfront.",
    priceRange: "€",
  },
  {
    name: "Restoran Samson",
    cuisine: "Traditional Dalmatian",
    distance: "~5 min drive",
    description:
      "Family-run restaurant serving hearty Dalmatian cuisine with fresh ingredients. Also offers rooms for guests, a well-known local establishment.",
    priceRange: "€€",
  },
  {
    name: "Konoba Marina",
    cuisine: "Seafood & Grill",
    distance: "~5 min drive",
    description:
      "Authentic konoba (tavern) experience with stone walls and outdoor terrace. Specialises in fresh catch of the day and traditional peka dishes.",
    priceRange: "€€",
  },
];
