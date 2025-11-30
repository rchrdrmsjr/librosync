import { Book, BookOpen, Laptop, Clock, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 1,
      titleKey: "services.service1.title",
      descriptionKey: "services.service1.description",
      icon: Book,
    },
    {
      id: 2,
      titleKey: "services.service2.title",
      descriptionKey: "services.service2.description",
      icon: BookOpen,
    },
    {
      id: 3,
      titleKey: "services.service3.title",
      descriptionKey: "services.service3.description",
      icon: Laptop,
    },
    {
      id: 4,
      titleKey: "services.service4.title",
      descriptionKey: "services.service4.description",
      icon: Clock,
    },
    {
      id: 5,
      titleKey: "services.service5.title",
      descriptionKey: "services.service5.description",
      icon: Printer,
    },
  ];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

  return (
    <section id="services">
      <div className="screen py-32">
        <motion.div
          className="text-center space-y-1 md:space-y-2 mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-dark text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("services.description")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer relative overflow-hidden group"
              >
                {/* Hover background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#E0A526]/5 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="bg-primary/10 text-primary rounded-full p-4 mb-6 relative z-10"
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(224, 165, 38, 0.4)",
                        "0 0 0 10px rgba(224, 165, 38, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-full"
                  />
                  <Icon className="w-8 h-8 relative z-10" />
                </motion.div>
                <h3 className="text-lg font-semibold text-dark mb-3 relative z-10">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                  {t(service.descriptionKey)}
                </p>

                {/* Bottom border animation */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#E0A526]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
