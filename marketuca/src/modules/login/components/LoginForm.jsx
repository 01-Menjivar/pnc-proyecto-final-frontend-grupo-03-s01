import { useState } from "react";
import { motion } from "framer-motion";
import RegisterPrompt from "./RegisterPrompt.jsx";
import ParticlesBackground from "../../utils/ParticlesBackground.jsx";
import { loginUser } from "../service/authService.js";
import Modal from "../../register/modal/modal.jsx";
import LoginPreloader from "../components/LoginPreloader.jsx"; // Tu preloader adaptado
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", message: "", isError: false });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    localStorage.setItem("email", email);
    setIsLoading(true);

    try {
      const { data, message } = await loginUser({ email, password });
      setModalData({
        title: "Inicio de sesión exitoso",
        message: message || "Has iniciado sesión correctamente.",
        isError: false,
      });
      setModalOpen(true);

      // Esperar 2 segundos y redirigir
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setModalData({
        title: "Error de autenticación",
        message: error.message,
        isError: true,
      });
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen">
      <ParticlesBackground />
      <div className="relative min-h-screen z-20 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="correo@uca.edu.sv"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
                required
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-800 transition duration-150 text-white py-2 rounded-xl"
            >
              Iniciar Sesión
            </motion.button>
          </form>
        </motion.div>
        <RegisterPrompt />
      </div>

      {isLoading && <LoginPreloader />}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        message={modalData.message}
        isError={modalData.isError}
      />
    </section>
  );
};

export default LoginForm;
