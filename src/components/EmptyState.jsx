import { motion } from "framer-motion";

/**
 * Reusable EmptyState component
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.icon - Icon component
 * @param {string} props.title - Title text
 * @param {string} props.description - Description text
 * @param {React.ReactNode} props.action - Optional action button/component
 * @returns {JSX.Element} EmptyState component
 */
const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Icon && (
        <div className="bg-gray-100 rounded-full p-6 mb-6">
          <Icon className="w-12 h-12 text-gray-400" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-700 mb-3">{title}</h3>
      {description && (
        <p className="text-gray-500 max-w-md mb-6">{description}</p>
      )}
      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default EmptyState;

