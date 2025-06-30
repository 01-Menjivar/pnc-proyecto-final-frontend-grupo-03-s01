import { motion } from "framer-motion";

const CategoriesSection = ({ categories, activeCategory, setActiveCategory }) => {
  const categoryVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 100, damping: 15 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 86, 179, 0.2)" },
    tap: { scale: 0.95 },
  };

  return (
      <div className="container px-4 py-12 mx-auto z-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Categorías</h2>
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <button
                className="text-[#0056b3] hover:text-[#339CFF] transition-colors"
                onClick={() => setActiveCategory("all")}
            >
              Ver todas
            </button>
          </motion.div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-12 sm:grid-cols-4 md:grid-cols-8">
          {categories.map((category, index) => (
              <motion.button
                  key={category.id}
                  className={`flex flex-col items-center justify-center h-24 rounded-xl border-2 transition-all ${
                      activeCategory === category.id
                          ? "border-[#0056b3] bg-gradient-to-r from-[#0056b3]/10 to-[#339CFF]/10 text-[#0056b3]"
                          : "border-gray-200 hover:border-[#339CFF] hover:bg-blue-50/60"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  variants={categoryVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={index}
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 86, 179, 0.2)" }}
              >
                <div className={`p-2 rounded-full ${activeCategory === category.id ? "bg-blue-100" : "bg-gray-100"}`}>
                  {category.icon}
                </div>
                <span className="mt-2 text-sm font-medium">{category.name}</span>
              </motion.button>
          ))}
        </div>
      </div>
  );
};

export default CategoriesSection;
