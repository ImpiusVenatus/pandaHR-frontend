import PandaHRAbout from "@/components/home/Description";
import EmployeeAnalyticsSection from "@/components/home/EmployeeAnalytics";
import FeaturesSection from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import Partners from "@/components/home/Partners";
import PerformanceSection from "@/components/home/Performance";
import ScheduleDemoSection from "@/components/home/Schedule";
import { Testimonials } from "@/components/home/Testimonial";
import TimeAndAttendeeSection from "@/components/home/TimeAttendee";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <PandaHRAbout />
      <FeaturesSection />
      <EmployeeAnalyticsSection />
      <TimeAndAttendeeSection />
      <PerformanceSection />
      <Partners />
      <Testimonials />
      <ScheduleDemoSection />
      <Footer />
    </div>
  );
}
