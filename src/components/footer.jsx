import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Services",
    links: [
      {
        label: "Computer Access",
        path: "/#services/computer",
        icon: "fas fa-desktop",
      },
      {
        label: "Printing & Copying",
        path: "/#services/printing",
        icon: "fas fa-print",
      },
      {
        label: "Study Rooms",
        path: "/#services/study-rooms",
        icon: "fas fa-chair",
      },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "Visit Us",
        path: "https://www.google.com/maps/search/Southville+8B+Phase+5,+Barangay+San+Isidro,+Montalban,+Rizal/@14.606816,121.0131297,11z",
        icon: "fas fa-map-marker-alt",
      },
      { label: "Email Us", path: "/#contact/email", icon: "fas fa-envelope" },
      {
        label: "Phone Directory",
        path: "/#contact/phone",
        icon: "fas fa-phone",
      },
      {
        label: "Social Media",
        path: "https://www.facebook.com/profile.php?id=61554969080114",
        icon: "fab fa-facebook",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "FAQs",
        path: "/#resources/faqs",
        icon: "fas fa-question-circle",
      },
      {
        label: "Library Catalog",
        path: "/#resources/catalog",
        icon: "fas fa-book",
      },
      {
        label: "Get the mobile app (APK)",
        path: "/apk/librosync-app.apk",
        icon: "fas fa-download",
        isButton: true,
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer
      className="text-white shadow-lg"
      style={{
        background: "linear-gradient(to right, #2C2C3E, #43435E)", // custom palette
      }}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3
                className="text-xl font-bold mb-6 pb-2 inline-block"
                style={{
                  color: "#E0A526",
                  borderBottom: "2px solid #E0A526",
                }}
              >
                {section.title}
              </h3>

              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="flex items-center transition-all duration-300 group"
                      aria-label={link.label}
                      style={{ color: "rgba(255,255,255,0.8)" }}
                      onMouseEnter={(e) => (e.target.style.color = "#E0A526")}
                      onMouseLeave={(e) =>
                        (e.target.style.color = "rgba(255,255,255,0.8)")
                      }
                    >
                      <i
                        className={`${link.icon} mr-3`}
                        style={{
                          color: "#E0A526",
                          transition: "color .2s ease",
                        }}
                      ></i>

                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="pt-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div className="text-center">
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              © 2025 LIBROSYNC. All rights reserved. | Southville 8B E-Library
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              Empowering knowledge through accessible digital resources.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
