import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

const AnnoncementCard = ({ announcement }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Check if announcement is recent (within 7 days)
  const isRecent = () => {
    const date = new Date(announcement.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        key={announcement.id}
        className="rounded-2xl border-2 border-gray-200 hover:border-[#E0A526] transition-all duration-300 flex flex-col h-full overflow-hidden relative bg-white group cursor-pointer"
      >
        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E0A526] via-blue-500 to-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0 }}
        />

        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#E0A526]/5 via-blue-50/30 to-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <CardHeader className="relative z-10 pb-3 px-6 pt-6">
          {/* Date and Badge Row */}
          <motion.div
            className="flex justify-between items-start mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <motion.div
                animate={{ 
                  scale: isHovered ? [1, 1.1, 1] : 1,
                  rotate: isHovered ? [0, -5, 5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="w-4 h-4 text-[#E0A526]" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">{formatDate(announcement.createdAt)}</span>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(announcement.createdAt)}</span>
                </div>
              </div>
            </div>
            {isRecent() && (
              <Badge className="bg-green-100 text-green-700 border-green-300 text-xs px-2 py-0.5">
                New
              </Badge>
            )}
          </motion.div>

          {/* Title */}
          <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#E0A526] transition-colors">
            {announcement.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 flex-1 flex flex-col px-6 pb-6">
          <motion.p
            className="text-sm text-gray-600 leading-relaxed flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {announcement.content}
          </motion.p>
        </CardContent>

        {/* Bottom decorative element */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E0A526] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0.5 }}
        />
      </Card>
    </motion.div>
  );
};

export default AnnoncementCard;
