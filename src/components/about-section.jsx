import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * AboutSection component displaying mission and vision
 * @returns {JSX.Element} AboutSection component
 */
const AboutSection = () => {
  const { t } = useTranslation();
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section id="about" className="bg-[#43435E] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-[#E0A526]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="screen py-32 relative z-10">
        <motion.div
          className="text-center space-y-1 md:space-y-2 mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-white text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("about.title")}
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("about.description")}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Mission */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-8 w-full relative overflow-hidden group cursor-pointer transition-all duration-300"
          >
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#E0A526]/5 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Decorative corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 bg-[#E0A526]/10 rounded-bl-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />

            <motion.h3
              className="text-xl font-bold text-dark mb-3 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {t("about.mission.title")}
            </motion.h3>
            <motion.p
              className="text-gray-700 leading-relaxed relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {t("about.mission.text")}
            </motion.p>

            {/* Bottom border */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#E0A526]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ originX: 0 }}
            />
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-8 w-full relative overflow-hidden group cursor-pointer transition-all duration-300"
          >
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#E0A526]/5 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Decorative corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 bg-[#E0A526]/10 rounded-bl-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />

            <motion.h3
              className="text-xl font-bold text-dark mb-3 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {t("about.vision.title")}
            </motion.h3>
            <motion.p
              className="text-gray-700 leading-relaxed relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              {t("about.vision.text")}
            </motion.p>

            {/* Bottom border */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#E0A526]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.5 }}
              style={{ originX: 0 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
