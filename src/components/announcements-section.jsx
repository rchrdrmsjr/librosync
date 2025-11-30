import { motion } from "framer-motion";
import AnnoncementCard from "./cards/announcement-card";
import { useAnnouncementsQuery } from "@/hooks/useAnnouncementsQuery";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Loader2 } from "lucide-react";
// import { announcements } from "@/lib/sample";

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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const AnnouncementsSection = () => {
  const { announcements, loading, error } = useAnnouncementsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 3; // number of cards per page

  // calculate displayed announcements based on current page
  const indexOfLast = currentPage * announcementsPerPage;
  const indexOfFirst = indexOfLast - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(announcements.length / announcementsPerPage);

  return (
    <section id="announcement" className="bg-[#43435E]">
      <div className="screen py-32">
        <motion.div
          className="text-center space-y-1 md:space-y-2 mb-10"
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
            Library Updates & Events
          </motion.h2>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay informed about the latest news, events, and updates from our
            library
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="w-8 h-8 text-[#E0A526] animate-spin" />
              <p className="text-gray-300">Loading announcements...</p>
            </motion.div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-red-100/10 rounded-full p-6 mb-6">
              <BookOpen className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Error Loading Announcements
            </h3>
            <p className="text-red-300 mb-4">{error}</p>
          </div>
        )}

        {/* Announcements Grid */}
        {!loading && !error && (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {currentAnnouncements.length > 0 ? (
              currentAnnouncements.map((a, index) => (
                <motion.div key={a.id || `announcement-${index}`} variants={cardVariants}>
                  <AnnoncementCard announcement={a} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-gray-100/10 rounded-full p-6 mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  No Announcements Available
                </h3>
                <p className="text-gray-300">
                  Check back later for updates and events.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div
            className="flex justify-center gap-2 mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Prev
              </Button>
            </motion.div>
            {[...Array(totalPages)].map((_, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant={currentPage === idx + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={
                    currentPage === idx + 1
                      ? "bg-[#E0A526] text-white hover:bg-[#C28A1A]"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }
                >
                  {idx + 1}
                </Button>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Next
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
