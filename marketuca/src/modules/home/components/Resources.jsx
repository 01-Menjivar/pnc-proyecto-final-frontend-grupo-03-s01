import React from 'react';
import { motion } from 'framer-motion';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

const Resources = () => {
  const resources = [
    {
      title: 'Calculadora TI CS CAS I',
      rating: 5,
      image: '/TI.png',
      price: '$120'
    },
    {
      title: 'Laptop HC ks344l',
      rating: 4,
      image: '/laptop.png',
      price: '$95'
    },
    {
      title: 'Coleccion Santifana HB',
      rating: 3,
      image: '/linros.png',
      price: '$20'
    },
    {
      title: 'Chaqueta',
      rating: 5,
      image: '/jacket.webp',
      price: '$12'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      index < rating ? (
        <IconStarFilled key={index} className="w-5 h-5 text-yellow-400" />
      ) : (
        <IconStar key={index} className="w-5 h-5 text-gray-300" />
      )
    ));
  };

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
      className="px-4 sm:px-6 md:px-12 z-10 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="w-full max-w-screen-xl rounded-3xl p-8 sm:p-12 mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-3 font-montserrat"
          variants={titleVariants}
        >
          Recursos Universitarios<br />
          <span className="bg-gradient-to-r from-blue-800 to-green-700 bg-clip-text text-transparent">fácil y rápido</span>
        </motion.h2>
        
        <motion.p
          className="text-sm sm:text-base text-center text-gray-600 mb-12 max-w-2xl mx-auto font-montserrat"
          variants={titleVariants}
          transition={{ delay: 0.3 }}
        >
          Descubre nuestra amplia selección de productos. Desde tecnología hasta libros, encuentra todo lo que necesitas a los mejores precios
        </motion.p>

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
                boxShadow: '0 10px 20px rgba(30, 58, 138, 0.3), 0 6px 12px rgba(21, 128, 61, 0.2)',
                transition: { duration: 0.15, ease: 'easeOut' }
              }}
              transition={{ duration: 0.01, ease: 'easeOut' }} 
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 mb-4 object-contain"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h3>
              
              <div className="flex items-center justify-center gap-1 mb-4">
                {renderStars(item.rating)}
              </div>
              
              <div className="w-full h-px bg-gray-200 mb-8"></div>
              
              <p className="text-2xl font-medium text-blue-600">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Resources;
