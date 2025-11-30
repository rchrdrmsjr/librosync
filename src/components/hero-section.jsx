import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * HeroSection component - Main hero banner with parallax effects
 * @returns {JSX.Element} HeroSection component
 */
const HeroSection = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Variants for fade-up animation
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative text-white overflow-hidden min-h-screen flex items-center"
      style={{
        background: "linear-gradient(to right, #2C2C3E, #43435E)",
      }}
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/033/859/206/non_2x/wooden-bookshelf-full-of-books-front-view-ai-generated-free-png.png')",
          y,
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(44,44,62,0.85), rgba(67,67,94,0.85))",
          }}
          animate={{
            background: [
              "linear-gradient(to right, rgba(44,44,62,0.85), rgba(67,67,94,0.85))",
              "linear-gradient(to right, rgba(67,67,94,0.85), rgba(44,44,62,0.85))",
              "linear-gradient(to right, rgba(44,44,62,0.85), rgba(67,67,94,0.85))",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000;
          const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#E0A526]/30 rounded-full"
              initial={{
                x: randomX,
                y: randomY,
              }}
              animate={{
                y: [null, randomY + (Math.random() - 0.5) * 200],
                x: [null, randomX + (Math.random() - 0.5) * 200],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        className="screen relative z-10 flex flex-col items-center text-center py-32 space-y-6"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("hero.title")}{" "}
          <motion.span
            style={{ color: "#E0A526" }}
            animate={{
              textShadow: [
                "0 0 20px rgba(224, 165, 38, 0.5)",
                "0 0 30px rgba(224, 165, 38, 0.8)",
                "0 0 20px rgba(224, 165, 38, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            LIBROSYNC
          </motion.span>
          {" – "}
          {t("hero.subtitle")}
        </motion.h1>

        <motion.p
          className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed"
          style={{ color: "#F3F3F7" }}
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="mt-8 text-white px-8 py-6 text-base sm:text-lg cursor-pointer relative overflow-hidden group"
              style={{
                backgroundColor: "#E0A526",
              }}
              onClick={() => navigation("/books")}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("hero.exploreButton")}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              <motion.span
                className="absolute inset-0 bg-[#C28A1A]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
