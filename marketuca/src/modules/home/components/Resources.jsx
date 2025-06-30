import React from 'react';
import { motion } from 'framer-motion';

const Resources = () => {
  const resources = [
    {
      title: 'Calculadora TI CS CAS I',
      description: '⭐⭐⭐⭐⭐ 5.0/5 Estado',
      image: '/TI.png',
      price: '$120'
    },
    {
      title: 'Laptop HC ks344l',
      description: '⭐⭐⭐⭐ 4.0/5 Estado',
      image: '/laptop.png',
      price: '$95'
    },
    {
      title: 'Coleccion Santifana HB',
      description: '⭐⭐⭐ 3.0/5 Estado',
      image: '/linros.png',
      price: '$20'
    },
    {
      title: 'Chaqueta',
      description: '⭐⭐⭐⭐⭐ 5.0/5 Estado',
      image: '/jacket.webp',
      price: '$12'
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: 'easeOut' }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
    }
  };

  const cardVariants = {
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
        duration: 0.8
      }
    })
  };

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 z-10 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="w-full max-w-screen-xl bg-blue-100 rounded-3xl p-8 sm:p-12">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-montserrat"
          variants={titleVariants}
        >
          Recursos Universitarios fácil y rápido
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center min-h-[380px]"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(0, 123, 255, 0.41)',
                transition: { duration: 0.15, ease: 'easeOut' }
              }}
              transition={{ duration: 0.01, ease: 'easeOut' }} // más rápida la salida
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-39 h-39 mb-6 object-contain"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-base text-gray-600 mb-4">{item.description}</p>
              <p className="text-2xl font-bold text-gray-900">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Resources;
