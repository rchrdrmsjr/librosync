import { motion } from "framer-motion";
import AnnoncementCard from "./cards/announcement-card";
import { useAnnouncement } from "@/hooks/useAnnouncement";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { announcements } from "@/lib/sample";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AnnouncementsSection = () => {
  const { announcements } = useAnnouncement();
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 3; // number of cards per page

  // calculate displayed announcements based on current page
  const indexOfLast = currentPage * announcementsPerPage;
  const indexOfFirst = indexOfLast - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(announcements.length / announcementsPerPage);

  return (
    <section id="announcement">
      <div className="screen py-32">
        <div className="text-center space-y-1 md:space-y-2 mb-10">
          <h2 className="text-dark text-2xl md:text-3xl font-bold">
            Library Updates & Events
          </h2>
          <p className="text-gray-600">
            Stay informed about the latest news, events, and updates from our
            library
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentAnnouncements.map((a) => (
            <motion.div
              key={a.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <AnnoncementCard announcement={a} />
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                variant={currentPage === idx + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
