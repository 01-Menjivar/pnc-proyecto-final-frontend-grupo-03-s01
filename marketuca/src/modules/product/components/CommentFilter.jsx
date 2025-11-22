import { motion } from "framer-motion";

export const CommentFilter = ({ activeFilter, onFilterChange }) => {
    const filters = [
        { id: 'all', label: 'Recientes' },
        { id: 'relevant', label: 'Relevantes' }
    ];

    return (
        <div className="flex gap-2 mb-4">
            {filters.map((filter) => (
                <motion.button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        activeFilter === filter.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {filter.label}
                </motion.button>
            ))}
        </div>
    );
};
