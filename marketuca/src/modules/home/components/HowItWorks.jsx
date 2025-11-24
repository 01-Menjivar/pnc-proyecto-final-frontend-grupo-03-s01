import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const features = [
    { 
      icon: '/subir.gif', 
      title: 'Sube productos', 
      description: 'Publica tus artículos en minutos. Añade fotos, describe tu producto y establece el precio.' 
    },
    { 
      icon: '/anadir-cesta.gif', 
      title: 'Compara artículos', 
      description: 'Encuentra exactamente lo que necesitas. Filtra por categoría, precio y disponibilidad.' 
    },
    { 
      icon: '/charlar.gif', 
      title: 'Contacta directamente', 
      description: 'Comunícate con otros estudiantes de forma segura. Negocia y cierra los mejores acuerdos.' 
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Regístrate',
      description: 'Crea tu cuenta con tu email UCA en segundos'
    },
    {
      number: 2,
      title: 'Explora o Vende',
      description: 'Busca productos o publica los tuyos'
    },
    {
      number: 3,
      title: 'Conecta',
      description: 'Negocia y cierra transacciones'
    },
    {
      number: 4,
      title: 'Valora',
      description: 'Comparte tu experiencia con otros'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 md:px-12 z-20 relative">
      <div className="w-full max-w-screen-xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-montserrat mb-6">
            ¿Cómo <span className="text-blue-800">funciona</span> Marketplace UCA?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
            Tres sencillos pasos para conectar con la comunidad estudiantil UCA. Compra, vende e intercambia todo lo que necesitas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-8 rounded-xl shadow-md text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(30, 58, 138, 0.2)'
              }}
            >
              <motion.img
                src={feature.icon}
                alt={feature.title}
                className="w-16 h-16 mx-auto mb-4 object-contain"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-montserrat">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-montserrat">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat mb-4">
            El proceso paso a paso
          </h3>
          <p className="text-base md:text-lg text-gray-600 font-montserrat">
            Comienza en 4 sencillos pasos y únete a cientos de estudiantes UCA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-white p-6 rounded-xl shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 8px 16px rgba(30, 58, 138, 0.15)'
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                {step.number}
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2 font-montserrat">
                {step.title}
              </h4>
              <p className="text-gray-600 text-sm font-montserrat">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;