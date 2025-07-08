import Navbar from "@/components/blocks/header-01";
import Hero from "@/components/hero-02/HeroSection";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
    </div>
  );
}
