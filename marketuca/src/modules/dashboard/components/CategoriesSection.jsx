import { motion } from "framer-motion";
import { 
  IconApps, 
  IconBook, 
  IconDevices, 
  IconTool, 
  IconDeviceGamepad2, 
  IconPizza, 
  IconShirt,
  IconDots
} from '@tabler/icons-react';

const CategoriesSection = ({ categories, activeCategory, setActiveCategory }) => {
  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 100, damping: 15 },
    }),
  };

  const categoryConfig = {
    "all": { icon: IconApps, color: "text-purple-600", bgColor: "bg-purple-50" },
    "todos": { icon: IconApps, color: "text-purple-600", bgColor: "bg-purple-50" },
    "libros": { icon: IconBook, color: "text-green-600", bgColor: "bg-green-50" },
    "tecnologia": { icon: IconDevices, color: "text-blue-600", bgColor: "bg-blue-50" },
    "servicios": { icon: IconTool, color: "text-orange-600", bgColor: "bg-orange-50" },
    "entretenimiento": { icon: IconDeviceGamepad2, color: "text-pink-600", bgColor: "bg-pink-50" },
    "comida": { icon: IconPizza, color: "text-red-600", bgColor: "bg-red-50" },
    "ropa": { icon: IconShirt, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    "otros": { icon: IconDots, color: "text-gray-600", bgColor: "bg-gray-50" }
  };

  const getIconComponent = (categoryId) => {
    const config = categoryConfig[categoryId.toLowerCase()] || categoryConfig["otros"];
    const IconComponent = config.icon;
    return { IconComponent, color: config.color, bgColor: config.bgColor };
  };

  return (
      <div className="container px-4 py-12 mx-auto z-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 font-montserrat mb-2">Categorías</h2>
          <p className="text-gray-600 font-montserrat">Explora productos por categoría</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => {
            const { IconComponent, color, bgColor } = getIconComponent(category.id);
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg bg-white shadow-md hover:shadow-lg border-b-4 border-gray-400 transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "shadow-lg ring-2 ring-blue-200 bg-blue-50  border-sky-500" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveCategory(category.id)}
                variants={categoryVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-2 rounded-full ${bgColor}`}>
                  <IconComponent size={20} className={color} />
                </div>
                <span className={`font-medium font-montserrat ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                  {category.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
  );
};

export default CategoriesSection;
