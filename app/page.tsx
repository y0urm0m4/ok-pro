import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Marathon } from "@/components/sections/Marathon";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Marathon />
      <HowItWorks />
      <Projects />
      <Testimonials />
      <ContactCta />
    </>
  );
}
