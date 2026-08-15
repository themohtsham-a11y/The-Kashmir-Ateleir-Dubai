import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import MaterialLibrary from "@/components/MaterialLibrary";
import FeaturedProjects from "@/components/FeaturedProjects";
import WhyChoose from "@/components/WhyChoose";
import ProcessTimeline from "@/components/ProcessTimeline";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import BeforeAfter from "@/components/BeforeAfter";
import VideoShowcase from "@/components/VideoShowcase";
import Gallery from "@/components/Gallery";
import InstagramReels from "@/components/InstagramReels";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="bg-ink">
      <Hero />
      <Marquee />
      <About />
      <Services />
      <MaterialLibrary />
      <FeaturedProjects />
      <WhyChoose />
      <ProcessTimeline />
      <Stats />
      <VideoShowcase />
      <BeforeAfter />
      <Testimonials />
      <Gallery />
      <InstagramReels />
      <Contact />
    </div>
  );
}
