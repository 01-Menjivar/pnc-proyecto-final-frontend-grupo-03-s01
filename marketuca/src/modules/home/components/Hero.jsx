import React from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import ParticlesBackground from "../../utils/ParticlesBackground.jsx";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  // Variantes para animaciones de entrada
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } }
  };

  return (
<section className="relative pb-20">
      <ParticlesBackground/>
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-20 lg:px-24 xl:px-32 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-12 pt-32 sm:pt-36 md:pt-44">
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 sm:mb-12 md:mb-16 lg:mb-20 2xl:mb-24">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 font-montserrat mb-4 sm:mb-6 md:mb-8"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Bienvenido a Marketplace UCA
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-2xl lg:text-2xl text-gray-600 font-montserrat mb-4 sm:mb-6 md:mb-8"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            Un espacio donde los estudiantes pueden comprar y vender lo que les ayuda a crecer
          </motion.p>
          <motion.button
            className="bg-[#000000] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-base md:text-xl font-medium font-montserrat hover:bg-[#0056b3] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => navigate('/login')}
          >
            Comprar ahora
          </motion.button>
        </div>
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end mt-4 md:mt-6 lg:mt-8 2xl:mt-10"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src="/students.png"
            alt="Estudiantes con tablet"
            className="w-3/4 sm:w-2/3 md:w-[100%] lg:w-[120%] xl:w-full max-w-[800px] h-auto"
          />

        </motion.div>
      </div>
     
    </section>
  );
};

export default Hero;