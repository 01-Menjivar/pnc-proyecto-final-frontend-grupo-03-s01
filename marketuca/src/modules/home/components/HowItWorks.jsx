import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    { icon: '/subir.gif', text: 'Sube productos', description: 'Publica tus artículos en minutos' },
    { icon: '/anadir-cesta.gif', text: 'Compara artículos', description: 'Encuentra lo que necesites fácilmente' },
    { icon: '/charlar.gif', text: 'Contacta directamente', description: 'Comunícate con otros estudiantes' }
  ];

  return (
    <section id="how-it-works" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 z-20 relative">
      <div className="w-full max-w-screen-xl flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-3/5 space-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-montserrat mb-10">
            ¿Cómo funciona?
          </h2>

          {steps.map((step) => (
            <div key={step.text} className="flex items-center gap-6">
              <motion.img
                src={step.icon}
                alt={step.text}
                className="w-16 h-16 object-contain border-2 border-gray-200 shadow-md rounded-lg"
                whileHover={{ scale: 1.05 }}
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{step.text}</h3>
                <p className="text-xl text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-2/5 flex justify-end">
          <img
            src="/students.jpg"
            alt="Estudiante con laptop"
            className="w-full max-w-md rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;