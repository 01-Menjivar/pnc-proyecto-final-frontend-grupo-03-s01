import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ParticlesBackground from "../../utils/ParticlesBackground.jsx";
import PromoteForm from "./PromoteForm.jsx";
import UserModal from "./UserModal.jsx";

// 🧪 Datos de prueba
const mockUsers = [
    { id: 1, name: "Juan Pérez", email: "juan.perez@uca.edu.sv", role: "STUDENT", faculty: "Facultad de Ingeniería y Arquitectura" },
    { id: 2, name: "Ana López", email: "ana.lopez@uca.edu.sv", role: "STUDENT", faculty: "Facultad de Economía" },
    { id: 3, name: "Carlos Admin", email: "carlos.admin@uca.edu.sv", role: "ADMIN", faculty: "Facultad de Derecho" },
    { id: 4, name: "Sofía Ruiz", email: "sofia.ruiz@uca.edu.sv", role: "STUDENT", faculty: "Facultad de Medicina" },
    { id: 5, name: "Luis García", email: "luis.garcia@uca.edu.sv", role: "STUDENT", faculty: "Facultad de Psicología" },
    { id: 6, name: "María Torres", email: "maria.torres@uca.edu.sv", role: "STUDENT", faculty: "Facultad de Ciencias" },
];

const AcceptAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setUsers(mockUsers);
        setLoading(false);
    }, []);

    return (
        <motion.div className="relative min-h-screen flex flex-col items-center mt-4 text-center">
            <ParticlesBackground />
            <motion.h2
                className="text-2xl font-bold text-gray-600 mb-6 z-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Manejo de administradores
            </motion.h2>
            <PromoteForm users={users} setUsers={setUsers} />
            <div className="flex gap-4 z-20">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow transition"
                    onClick={() => setShowModal(true)}
                >
                    Ver usuarios
                </button>
            </div>
            {showModal && (
                <UserModal users={users} onClose={() => setShowModal(false)} />
            )}
        </motion.div>
    );
};

export default AcceptAdmin;
