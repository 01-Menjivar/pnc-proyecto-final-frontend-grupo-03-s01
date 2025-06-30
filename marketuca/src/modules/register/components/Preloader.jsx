import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, User, Shield, Mail } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Validando información',
    description: 'Verificando tus datos...',
    icon: <Shield className="w-6 h-6" />,
    duration: 2000,
  },
  {
    id: 2,
    title: 'Creando tu cuenta',
    description: 'Configurando tu perfil...',
    icon: <User className="w-6 h-6" />,
    duration: 2500,
  },
  {
    id: 3,
    title: 'Enviando confirmación',
    description: 'Preparando tu bienvenida...',
    icon: <Mail className="w-6 h-6" />,
    duration: 2000,
  },
  {
    id: 4,
    title: 'Finalizando',
    description: 'Completando el registro...',
    icon: <CheckCircle className="w-6 h-6" />,
    duration: 1500,
  },
];

const FloatingParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
    initial={{
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      scale: 0,
    }}
    animate={{
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      scale: [0, 1, 0],
      rotate: 360,
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    }}
  />
);

const Preloader = ({ isLoading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    if (currentStep < steps.length) {
      const stepDuration = steps[currentStep].duration;
      const interval = 50; // Actualizar cada 50ms para animación suave
      const increment = (100 / stepDuration) * interval;

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              // Ciclar al siguiente paso o volver al primero
              setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
              setProgress(0);
            }, 300);
            return 100;
          }
          return newProgress;
        });
      }, interval);

      return () => clearInterval(progressInterval);
    }
  }, [currentStep, isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Partículas flotantes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.2} />
      ))}

      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Área de logo/marca */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Círculo de progreso */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Círculo de fondo */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="8" />
            {/* Círculo de progreso */}
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={314}
              strokeDashoffset={314 - (314 * progress) / 100}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Ícono central */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            key={currentStep}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-blue-600">
              {steps[currentStep]?.icon}
            </div>
          </motion.div>

          {/* Porcentaje de progreso */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full shadow-md">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </div>

        {/* Información del paso */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep]?.title}</h2>
            <p className="text-gray-600">{steps[currentStep]?.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores de pasos */}
        <div className="flex justify-center space-x-2 mt-8">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index <= currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Animación de puntos de carga */}
        <motion.div
          className="flex justify-center space-x-1 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Efecto de brillo de fondo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default Preloader;