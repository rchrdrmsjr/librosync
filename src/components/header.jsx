import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/e-library.png";
import { Menu } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  const navs = [
    { label: t("header.home"), path: "#hero", key: "home", sectionId: "hero" },
    { label: t("header.books"), path: "#books", key: "books", sectionId: "books", route: "/books" },
    { label: t("header.announcement"), path: "#announcement", key: "announcement", sectionId: "announcement" },
    { label: t("header.services"), path: "#services", key: "services", sectionId: "services" },
    { label: t("header.about"), path: "#about", key: "about", sectionId: "about" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Detect active section based on scroll position and route
  useEffect(() => {
    // Check if we're on /books route
    if (location.pathname === "/books" || location.pathname.startsWith("/books/")) {
      setActiveSection("books");
      return;
    }

    // For home page, detect which section is in view
    const handleScroll = () => {
      const sectionIds = ["hero", "books", "announcement", "services", "about"];
      const sections = sectionIds
        .map(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: sectionId,
              key: sectionId === "hero" ? "home" : sectionId,
              top: rect.top,
              bottom: rect.bottom,
            };
          }
          return null;
        })
        .filter(Boolean);

      // Find the section currently in view
      const viewportMiddle = window.innerHeight / 2;
      let currentSection = "home";

      for (const section of sections) {
        if (section.top <= viewportMiddle && section.bottom >= viewportMiddle) {
          currentSection = section.key;
          break;
        }
      }

      // If no section is in the middle, check which is closest to top
      if (currentSection === "home") {
        const sortedSections = sections.sort((a, b) => Math.abs(a.top) - Math.abs(b.top));
        if (sortedSections.length > 0 && sortedSections[0].top < window.innerHeight) {
          currentSection = sortedSections[0].key;
        }
      }

      setActiveSection(currentSection);
    };

    if (location.pathname === "/") {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setActiveSection("home");
    }
  }, [location.pathname]);

  const handleNavClick = (e, path) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const targetId = path.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const elAfter = document.getElementById(targetId);
          if (elAfter) elAfter.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="banner"
    >
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#E0A526] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-[#E0A526] focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <motion.div
        className="w-full"
        animate={{
          backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
          backgroundColor: isScrolled
            ? "rgba(44, 44, 62, 0.85)"
            : "rgba(44, 44, 62, 1)",
          boxShadow: isScrolled
            ? "0 10px 30px rgba(0, 0, 0, 0.3)"
            : "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: isScrolled
            ? "linear-gradient(to right, rgba(44,44,62,0.95), rgba(67,67,94,0.95))"
            : "linear-gradient(to right, #2C2C3E, #43435E)",
        }}
      >
        <nav className="screen py-4 flex items-center justify-between gap-4 lg:gap-6" aria-label="Main navigation">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 text-white cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
          >
            <motion.img
              src={Logo}
              alt="LibroSync E-Library Logo"
              className="w-8 md:w-10 lg:w-14 h-8 md:h-10 lg:h-14"
              loading="eager"
              decoding="async"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            />
            <h2 className="font-bold text-sm md:text-base lg:text-lg">LibroSync</h2>
          </motion.div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 flex-wrap" role="navigation" aria-label="Main menu">
            {navs.map((nav, index) => (
              <motion.div
                key={nav.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <NavLink
                  to={nav.path}
                  onClick={(e) => handleNavClick(e, nav.path)}
                  className={`relative text-white font-medium text-sm xl:text-base px-2 xl:px-3 py-1.5 rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#E0A526] focus:ring-offset-2 focus:ring-offset-[#2C2C3E] whitespace-nowrap ${
                    activeSection === nav.key || (nav.route && location.pathname.startsWith(nav.route))
                      ? "border-[#E0A526] bg-[#E0A526]/10 text-[#E0A526]"
                      : "border-transparent hover:border-[#E0A526]/50"
                  }`}
                  aria-label={`Navigate to ${nav.label} section`}
                >
                  <span className="relative z-10">{nav.label}</span>
                </NavLink>
              </motion.div>
            ))}
            <LanguageSwitcher />
          </div>

          {/* MOBILE/TABLET MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <motion.button
                className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-[#E0A526] focus:ring-offset-2 focus:ring-offset-[#2C2C3E] rounded-md p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open navigation menu"
                aria-expanded="false"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="p-4"
              style={{
                background: "linear-gradient(to right, #2C2C3E, #43435E)",
              }}
              aria-label="Mobile navigation menu"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-white">
                  <img src={Logo} alt="LibroSync E-Library Logo" className="w-8 h-8" />
                  LibroSync
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile navigation menu for LibroSync
                </SheetDescription>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-4" aria-label="Mobile menu">
                {navs.map((nav, index) => (
                  <motion.div
                    key={nav.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={nav.path}
                      onClick={(e) => handleNavClick(e, nav.path)}
                      className={`block text-white font-medium px-4 py-2 rounded-md transition-colors border-2 focus:outline-none focus:ring-2 focus:ring-[#E0A526] focus:ring-offset-2 focus:ring-offset-[#2C2C3E] ${
                        activeSection === nav.key || (nav.route && location.pathname.startsWith(nav.route))
                          ? "border-[#E0A526] bg-[#E0A526]/20 text-[#E0A526]"
                          : "border-transparent hover:bg-[#E0A526]/20 hover:text-[#E0A526]"
                      }`}
                      aria-label={`Navigate to ${nav.label} section`}
                    >
                      {nav.label}
                    </NavLink>
                  </motion.div>
                ))}
                <div className="px-4 py-2">
                  <LanguageSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
