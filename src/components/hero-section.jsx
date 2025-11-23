import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigation = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Variants for fade-up animation
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      className="relative text-white"
      style={{
        background: "linear-gradient(to right, #2C2C3E, #43435E)", // primary dark → primary
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/033/859/206/non_2x/wooden-bookshelf-full-of-books-front-view-ai-generated-free-png.png')",
        }}
      >
        {/* Overlay using primary color */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(44,44,62,0.85), rgba(67,67,94,0.85))",
          }}
        />
      </div>

      {/* Content */}
      <div className="screen relative z-10 flex flex-col items-center text-center py-32 space-y-6">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to{" "}
          <span style={{ color: "#E0A526" /* secondary */ }}>LIBROSYNC</span> –{" "}
          Your Gateway to Learning!
        </motion.h1>

        <motion.p
          className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl"
          style={{ color: "#F3F3F7" }} // light gray text
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Southville 8B E-Library, built through the initiative of Congressman
          Tom Hernandez, is a public library made especially for students. With
          LIBROSYNC, you can browse available books, read announcements, and
          search easily using smart filters. Plus, enjoy free computer use and
          free printing inside the library — all to support your learning.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            className={`mt-8 text-white px-8 py-6 text-base sm:text-lg cursor-pointer transition-all duration-300 ease-in-out ${
              isHovered ? "scale-105 shadow-lg" : "scale-100"
            }`}
            style={{
              backgroundColor: "#E0A526", // secondary
              hoverBackgroundColor: "#C28A1A",
            }}
            onClick={() => navigation("/books")}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            Explore Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
