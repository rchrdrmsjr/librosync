import AboutSection from "@/components/about-section";
import AnnouncementsSection from "@/components/announcements-section";
import BookSection from "@/components/book-section";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";

const Home = () => {
  return (
    <>
      <HeroSection />

      <BookSection />
      <AnnouncementsSection />
      <ServicesSection />
      <AboutSection />
    </>
  );
};

export default Home;
