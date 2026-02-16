import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import Reviews from "@/components/Reviews";
import AttractionsPreview from "@/components/AttractionsPreview";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
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
      <Location />
      {/* <Contact /> */}
      <Footer />
      <ScrollToTopButton />
    </main>
  );
}
