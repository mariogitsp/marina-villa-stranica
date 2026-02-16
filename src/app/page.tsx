import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import Reviews from "@/components/Reviews";
import AttractionsPreview from "@/components/AttractionsPreview";
import NearbyRestaurants from "@/components/NearbyRestaurants";
import Location from "@/components/Location";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Gallery />
      <Amenities />
      <Reviews />
      <AttractionsPreview />
      <NearbyRestaurants />
      <Location />
      <ContactInfo />
      <Footer />
      <ScrollToTopButton />
    </main>
  );
}
