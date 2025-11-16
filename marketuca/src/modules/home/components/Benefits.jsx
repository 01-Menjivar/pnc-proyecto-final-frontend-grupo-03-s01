import React from 'react';
import { motion } from 'framer-motion';
import { IconBolt } from '@tabler/icons-react';

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
    'Transacciones seguras entre estudiantes UCA',
    'Comunicación directa sin intermediarios',
    'Acceso a miles de productos y servicios',
    'Facil de usar y seguro universitario',
    'Apoyo al emprendimiento estudiantil'
  ];

  return (
    <motion.section
      id="benefits"
      className="py-12 px-4 sm:px-6 md:px-12 z-10 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        <motion.div
          className="w-full md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat mb-4">
            <span className="text-blue-800">Beneficios</span> de ser parte de la comunidad
          </h3>
          
          <p className="text-lg text-gray-600 font-montserrat mb-8">
            Acceso exclusivo a una red segura de estudiantes verificados
          </p>
          
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                className="text-lg text-gray-800 flex items-start gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={benefitVariants}
                custom={index}
              >
                <IconBolt className="w-10 h-10 text-blue-400 flex-shrink-0 mt-1" />
                <span className="font-montserrat">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={benefitVariants}
          custom={benefits.length}
        >
          <img
            src="/young-friends-park.jpg"
            alt="Grupo de estudiantes"
            className="w-full max-w-md rounded-lg shadow-lg"
            loading="lazy"
          />
        </motion.div>
        
      </div>
    </motion.section>
  );
};

export default Benefits;