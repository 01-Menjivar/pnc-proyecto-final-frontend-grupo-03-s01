import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "../../utils/ParticlesBackground.jsx";
import { loginUser } from "../service/authService.js";
import { getUserInfo } from "../../profile/services/profileService.js";
import Modal from "../../register/modal/modal.jsx";
import LoginPreloader from "../components/LoginPreloader.jsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", message: "", isError: false });
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const savedCredentials = localStorage.getItem("remembered_credentials");
    if (savedCredentials) {
      const { email, password } = JSON.parse(savedCredentials);
      setSavedEmail(email);
      setSavedPassword(password);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    localStorage.setItem("email", email);
    
    if (rememberMe) {
      localStorage.setItem("remembered_credentials", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("remembered_credentials");
    }
    
    setIsLoading(true);

    try {
      const { data: token, message } = await loginUser({ email, password });
      const { data: userData } = await getUserInfo(email, token);
      login(token, userData);
      
      setModalData({
        title: "Inicio de sesión exitoso",
        message: message || "Has iniciado sesión correctamente.",
        isError: false,
      });
      setModalOpen(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Iniciar Sesión</h2>
          <p className="text-sm text-gray-500 text-center mb-6 font-montserrat">
            Accede a tu cuenta para comenzar a comprar y vender
          </p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
              <input
                type="email"
                name="email"
                defaultValue={savedEmail}
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
                defaultValue={savedPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                Recuérdame
              </label>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 transition duration-150 text-white py-2 rounded-xl cursor-pointer"
            >
              Iniciar Sesión
            </motion.button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <a href="/register" className="text-blue-800 hover:text-blue-900 font-medium">
                  Regístrate aquí
                </a>
              </p>
            </div>
          </form>
        </motion.div>
        
        <p className="text-xs text-gray-500 italic mt-4 text-center font-montserrat">
          Tus datos están seguros
        </p>
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
