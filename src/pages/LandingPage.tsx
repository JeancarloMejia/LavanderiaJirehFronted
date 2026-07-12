import HeroSection       from "@/components/landing/HeroSection";
import AboutSection      from "@/components/landing/AboutSection";
import ServicesSection   from "@/components/landing/ServicesSection";
import FeaturesSection   from "@/components/landing/FeaturesSection";
import ProcessSection    from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BlogSection       from "@/components/landing/BlogSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
    </>
  );
}