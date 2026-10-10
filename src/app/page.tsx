import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import About from "@/components/sections/About";
import Enquiry from "@/components/sections/Enquiry";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Membership from "@/components/sections/Membership";
import Method from "@/components/sections/Method";
import Pricing from "@/components/sections/Pricing";
import Results from "@/components/sections/Results";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";

/**
 * The page is one funnel for the Team Bodymechanik Membership (hosted on Skool):
 * promise → proof → what's inside → how it works → social proof → price →
 * who we are → objections → 1:1 coaching and questions.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Stats />
        <Results />
        <Membership />
        <Method />
        <Testimonials />
        <Pricing />
        <About />
        <Faq />
        <Enquiry />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
