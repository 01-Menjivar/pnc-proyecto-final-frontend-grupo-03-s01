import { motion } from "framer-motion";
import {Link} from "react-router-dom";

const HeroSection = ({ onSellClick }) => {
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="relative py-12 animate-gradient"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={heroVariants}
      style={{ backgroundImage: "linear-gradient(to right, #0056b3, #339CFF, #00C4B4)", backgroundSize: "200% 200%" }}
    >
      <div className="relative container px-4 mx-auto h-full">
        <div className="relative text-center">
          <motion.h1 className="mb-4 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white font-montserrat" variants={heroVariants}>
            Marketplace UCA
          </motion.h1>
          <motion.p className="max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 text-base sm:text-lg md:text-2xl lg:text-2xl text-emerald-50 font-montserrat" variants={heroVariants}>
            Compra, vende e intercambia con otros estudiantes. Todo lo que necesitas para tu vida universitaria en un solo lugar.
          </motion.p>
          <motion.div className="flex flex-col items-center justify-center gap-4 sm:flex-row" variants={heroVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="z-10">
              <button
                onClick={onSellClick}
                className="bg-[#000000] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-base md:text-xl font-medium font-montserrat hover:bg-[#0056b3] transition-colors"
              >
                Vender un producto
              </button>
            </motion.div>
            <Link to={{pathname: "/profile"}}>
              <motion.div whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.95}} className="z-10">
                <button
                    className="text-white border-white px-6 sm:px-8 py-2 sm:py-3 rounded-md border-2 hover:bg-white/10 transition-colors">
                  Explorar mis Ventas
                </button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;