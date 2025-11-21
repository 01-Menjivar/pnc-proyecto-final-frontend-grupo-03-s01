import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Lock, User, Settings, LogIn } from "lucide-react"

const steps = [
    {
        id: 1,
        title: "Verificando credenciales",
        description: "Validando tu información...",
        icon: <Lock className="w-6 h-6" />,
        duration: 1800,
    },
    {
        id: 2,
        title: "Autenticando usuario",
        description: "Confirmando tu identidad...",
        icon: <User className="w-6 h-6" />,
        duration: 2200,
    },
    {
        id: 3,
        title: "Cargando tu perfil",
        description: "Preparando tu espacio...",
        icon: <Settings className="w-6 h-6" />,
        duration: 2000,
    },
    {
        id: 4,
        title: "¡Bienvenido de vuelta!",
        description: "Acceso concedido exitosamente",
        icon: <CheckCircle className="w-6 h-6" />,
        duration: 1500,
    },
];

const LoginPreloader = ({ onComplete = () => { } }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentStep < steps.length) {
            const stepDuration = steps[currentStep].duration;
            const interval = 50;
            const increment = (100 / stepDuration) * interval;

            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev + increment;
                    if (newProgress >= 100) {
                        clearInterval(progressInterval);
                        setTimeout(() => {
                            if (currentStep < steps.length - 1) {
                                setCurrentStep((prev) => prev + 1);
                                setProgress(0);
                            } else {
                                setIsComplete(true);
                                onComplete();
                            }
                        }, 300);
                        return 100;
                    }
                    return newProgress;
                });
            }, interval);

            return () => clearInterval(progressInterval);
        }
    }, [currentStep, onComplete]);


    const SecurityParticle = ({ delay = 0 }) => (
        <motion.div
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-70"
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
                duration: 4,
                delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            }}
        />
    )

    const LockIcon = () => (
        <motion.div
            className="absolute w-3 h-3 border-2 border-blue-400 rounded-sm opacity-40"
            animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
            }}
            style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
            }}
        />
    )

    if (isComplete) {
        return (
            <motion.div
                className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-50"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="text-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                    }}
                >
                    <motion.div
                        className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                        animate={{
                            boxShadow: [
                                "0 0 0 0 rgba(59, 130, 246, 0.4)",
                                "0 0 0 20px rgba(59, 130, 246, 0)",
                                "0 0 0 0 rgba(59, 130, 246, 0)",
                            ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                        <LogIn className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.h2
                        className="text-3xl font-bold text-gray-800 mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        ¡Bienvenido de vuelta!
                    </motion.h2>
                    <motion.p
                        className="text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Has iniciado sesión exitosamente
                    </motion.p>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Security Particles */}
            {Array.from({ length: 10 }).map((_, i) => (
                <SecurityParticle key={i} delay={i * 0.3} />
            ))}

            {/* Floating Lock Icons */}
            {Array.from({ length: 6 }).map((_, i) => (
                <LockIcon key={`lock-${i}`} />
            ))}

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-md mx-auto px-6">
                {/* Logo/Brand Area */}
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.2,
                    }}
                >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                        <Lock className="w-10 h-10 text-white" />
                    </div>
                </motion.div>

                {/* Progress Circle */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    {/* Background Circle */}
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="8" />
                        {/* Progress Circle */}
                        <motion.circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="url(#loginGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={314}
                            strokeDashoffset={314 - (314 * progress) / 100}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id="loginGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#6366F1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center Icon with Security Animation */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        key={currentStep}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    >
                        <motion.div
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-blue-600 relative"
                            animate={
                                currentStep === 0
                                    ? {
                                        boxShadow: [
                                            "0 0 0 0 rgba(59, 130, 246, 0.3)",
                                            "0 0 0 10px rgba(59, 130, 246, 0)",
                                            "0 0 0 0 rgba(59, 130, 246, 0.3)",
                                        ],
                                    }
                                    : {}
                            }
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                            {steps[currentStep]?.icon}
                        </motion.div>
                    </motion.div>

                    {/* Progress Percentage */}
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

                {/* Step Information */}
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

                {/* Step Indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                    {steps.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index <= currentStep ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-gray-300"
                                }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.2 }}
                        />
                    ))}
                </div>

                {/* Security Status */}
                <motion.div
                    className="flex items-center justify-center space-x-2 mt-6 text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                        }}
                    />
                    <span>Conexión segura</span>
                </motion.div>

                {/* Loading Animation */}
                <motion.div
                    className="flex justify-center space-x-1 mt-4"
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

            {/* Background Security Glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)`,
                        backgroundSize: "20px 20px",
                    }}
                />
            </div>
        </motion.div>
    )
}
export default LoginPreloader; 
