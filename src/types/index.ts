export interface Review {
  name: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  stayDuration: string;
}

export interface Attraction {
  slug: string;
  title: string;
  distance: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  distance: string;
  description: string;
  priceRange: string;
}
