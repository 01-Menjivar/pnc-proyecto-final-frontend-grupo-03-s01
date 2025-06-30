import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Si usas React Router

export default function RegisterPrompt() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 text-center text-sm text-gray-600"
        >
            ¿Aún no tienes una cuenta?{" "}
            <Link to="/register">
                <motion.span
                    initial={{ scale: 1}}
                    whileHover={{ scale: 1.1 }}
                    className="inline-block text-indigo-600 hover:underline transition duration-150 font-medium"
                >Regístrate aquí</motion.span>
            </Link>
        </motion.div>
    );
}
