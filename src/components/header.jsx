import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/e-library.png";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navs = [
  { label: "Home", path: "#hero" },
  { label: "Books", path: "#books" },
  { label: "Announcement", path: "#announcement" },
  { label: "Services", path: "#services" },
  { label: "About", path: "#about" },
];

const Header = () => {
  const navigate = useNavigate();

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
    <header
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
      style={{
        background: "linear-gradient(to right, #2C2C3E, #43435E)", // your palette
      }}
    >
      <div className="screen py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 text-white">
          <img
            src={Logo}
            alt="E-Library Logo"
            className="w-8 md:w-12 lg:w-14 h-8 md:h-12 lg:h-14"
          />
          <h2 className="font-bold">LibroSync</h2>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6">
          {navs.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.path}
              onClick={(e) => handleNavClick(e, nav.path)}
              className="text-white font-medium underline-offset-4 decoration-2"
              style={{
                transition: "color .2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#E0A526")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* MOBILE MENU */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="p-4"
            style={{
              background: "linear-gradient(to right, #2C2C3E, #43435E)",
            }}
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-white">
                <img src={Logo} alt="E-Library Logo" className="w-8 h-8" />
                LibroSync
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-4">
              {navs.map((nav, index) => (
                <NavLink
                  key={index}
                  to={nav.path}
                  onClick={(e) => handleNavClick(e, nav.path)}
                  className="block text-white font-medium"
                  style={{
                    transition: "color .2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#E0A526")}
                  onMouseLeave={(e) => (e.target.style.color = "white")}
                >
                  {nav.label}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
