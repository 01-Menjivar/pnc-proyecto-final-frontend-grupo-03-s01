import { motion } from "framer-motion";
import {Link} from "react-router-dom";

const HeroSection = ({ onSellClick }) => {
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
  };

  return (
    <motion.section
      className="relative py-16 px-4 sm:px-6 md:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={heroVariants}
      style={{ 
        backgroundImage: "url('/backgroundHero.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-white/20 z-0"></div>
      <div className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        <motion.div
          className="w-full md:w-1/2"
          variants={heroVariants}
        >
          <motion.p 
            className="text-blue-800 text-sm font-medium font-montserrat mb-4"
            variants={heroVariants}
          >
            Bienvenido a MarketPlace UCA
          </motion.p>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-montserrat mb-6 leading-tight"
            variants={heroVariants}
          >
            Compra, Vende<br />
            e <span className="text-blue-800">Intercambia</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-700 font-montserrat mb-8 max-w-xl"
            variants={heroVariants}
          >
            Todo lo que necesitas para tu vida universitaria en un solo lugar. Conecta con otros estudiantes y encuentra exactamente lo que buscas
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            variants={heroVariants}
          >
            <motion.button
              onClick={onSellClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-800 text-white px-6 py-3 rounded-lg text-base font-medium font-montserrat hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl w-fit cursor-pointer"
            >
              Vender un producto
            </motion.button>
            
            <Link to={{pathname: "/products"}}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-800 border-2 border-blue-800 px-6 py-3 rounded-lg text-base font-medium font-montserrat hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl w-fit cursor-pointer"
              >
                Explorar mis productos
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          variants={imageVariants}
        >
          <img
            src="/heroLaptop.png"
            alt="Laptop para estudiantes"
            className="w-full max-w-lg h-auto"
            loading="lazy"
          />
        </motion.div>
        
      </div>
    </motion.section>
  );
};

export default HeroSection;