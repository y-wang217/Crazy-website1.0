import Booking from "@/components/Booking";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import ProgressLog from "@/components/ProgressLog";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Subjects from "@/components/Subjects";
import Tutors from "@/components/Tutors";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Subjects />
        <WhyUs />
        <ProgressLog />
        <Tutors />
        <Pricing />
        <Booking />
      </main>
      <SiteFooter />
    </>
  );
}
