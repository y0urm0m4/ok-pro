import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Marathon } from "@/components/sections/Marathon";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Marathon />
    </>
  );
}
