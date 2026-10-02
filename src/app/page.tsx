import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import About from "@/components/sections/About";
import Apply from "@/components/sections/Apply";
import Coaching from "@/components/sections/Coaching";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Included from "@/components/sections/Included";
import Method from "@/components/sections/Method";
import Outcomes from "@/components/sections/Outcomes";
import RecipeStrip from "@/components/sections/RecipeStrip";
import Results from "@/components/sections/Results";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Stats />
        <Outcomes />
        <RecipeStrip />
        <Coaching />
        <Included />
        <Method />
        <Results />
        <About />
        <Testimonials />
        <Faq />
        <Contact />
        <Apply />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
