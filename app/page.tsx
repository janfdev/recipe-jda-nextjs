import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/section/hero-section";
import RecipeLimitSection from "@/components/section/RecipeLimitSection";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Hero />
      <RecipeLimitSection />
      <Footer />
    </div>
  );
}
