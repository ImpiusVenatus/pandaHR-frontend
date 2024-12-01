import PandaHRAbout from "@/components/home/Description";
import FeaturesSection from "@/components/home/Features";
import HeroSection from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <PandaHRAbout />
      <FeaturesSection />
    </div>
  );
}
