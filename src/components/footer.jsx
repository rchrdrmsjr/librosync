import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        label: "Get the mobile app (APK)",
        path: "https://expo.dev/artifacts/eas/3XDfjr1tzC8oXjk4UogZEY.apk",
        icon: "fas fa-download",
        isButton: true,
      },
    ],
  },
];

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer
      className="text-white shadow-lg relative overflow-hidden"
      style={{
        background: "linear-gradient(to right, #2C2C3E, #43435E)",
      }}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(224, 165, 38, 0.3) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {footerSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.h3
                className="text-xl font-bold mb-6 pb-2 inline-block relative"
                style={{
                  color: "#E0A526",
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {section.title}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-[#E0A526]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                />
              </motion.h3>

              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + linkIndex * 0.1 + 0.3 }}
                  >
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to={link.path}
                        className="flex items-center transition-all duration-300 group"
                        aria-label={link.label}
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        <motion.i
                          className={`${link.icon} mr-3`}
                          style={{
                            color: "#E0A526",
                          }}
                          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          whileHover={{ color: "#E0A526" }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="pt-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <motion.p
              className="text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.7)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              © 2025 LIBROSYNC. All rights reserved. | Southville 8B E-Library
            </motion.p>
            <motion.p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.5)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Empowering knowledge through accessible digital resources.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
