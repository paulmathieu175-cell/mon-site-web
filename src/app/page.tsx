import Hero from "@/components/scenes/Hero";
import Univers from "@/components/scenes/Univers";
import Experience from "@/components/scenes/Experience";
import Gastronomie from "@/components/scenes/Gastronomie";
import Galerie from "@/components/scenes/Galerie";
import Reservation from "@/components/scenes/Reservation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Univers />
      <Experience />
      <Gastronomie />
      <Galerie />
      <Reservation />
      <Footer />
    </>
  );
}
