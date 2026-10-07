import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Omakase from "@/components/Omakase";
import Chef from "@/components/Chef";
import Craft from "@/components/Craft";
import Space from "@/components/Space";
import Menu from "@/components/Menu";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";
import TempoRail from "@/components/TempoRail";

export default function Home() {
  return (
    <>
      <Header />
      <TempoRail />
      <main>
        <Hero />
        <Philosophy />
        <Omakase />
        <Chef />
        <Craft />
        <Space />
        <Menu />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
