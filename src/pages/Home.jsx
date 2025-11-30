import AboutSection from "@/components/about-section";
import AnnouncementsSection from "@/components/announcements-section";
import BookSection from "@/components/book-section";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import SEO from "@/components/SEO";
import { generateLibraryStructuredData } from "@/lib/seo";

const Home = () => {
  const structuredData = generateLibraryStructuredData();

  return (
    <>
      <SEO
        title="Home"
        description="Welcome to LibroSync - Southville 8B E-Library. Browse books, read announcements, and access free computer and printing services."
        path="/"
        structuredData={structuredData}
      />
      <HeroSection />

      <BookSection />
      <AnnouncementsSection />
      <ServicesSection />
      <AboutSection />
    </>
  );
};

export default Home;
