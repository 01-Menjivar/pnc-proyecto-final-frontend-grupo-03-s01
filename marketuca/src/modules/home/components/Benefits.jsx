import React from 'react';
import { motion } from 'framer-motion';

const Benefits = () => {
  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut', willChange: 'opacity, transform' }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', willChange: 'opacity, transform' }
    }
  };

  const benefitVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.3 + i * 0.15,
        duration: 0.5,
        willChange: 'opacity, transform'
      }
    })
  };

  const benefits = [
    'Conexión exclusiva entre estudiantes de la UCA',
    'Acceso a los mejores precios',
    'Facil de usar y seguro universitario',
    'Apoyo al emprendimiento estudiantil'
  ];

  return (
    <motion.section
      id="benefits"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 z-10 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="w-full max-w-screen-xl flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          className="w-full md:w-1/2 flex justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={benefitVariants}
          custom={benefits.length} // Imagen como último elemento
        >
          <img
            src="/young-friends-park.jpg"
            alt="Grupo de estudiantes"
            className="w-full max-w-md rounded-lg shadow-lg"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          className="w-full md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-montserrat mb-8">
            Beneficios para estudiantes
          </h2>
          <ul className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                className="text-2xl text-gray-800 flex items-start gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={benefitVariants}
                custom={index}
              >
                <span className="text-3xl text-[#007BFF]">•</span>
                <p>{benefit}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Benefits;