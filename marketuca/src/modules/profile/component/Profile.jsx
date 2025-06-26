import React, {useState} from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "../../utils/ParticlesBackground";
import ChangePasswordModal from "../modals/ChangePasswordModal.jsx";
import EditUserModal from "../modals/EditUserData.jsx";


const Profile = ({user}) => {
    // Simulación de usuario (en un caso real, lo traerías del contexto o API)


//esta wea la arreglare cuando ya tengamos bien los productos
    const [showModal, setShowModal] = useState(false);

    const handlePasswordChange = ({ currentPassword, newPassword }) => {
        // Aquí puedes hacer fetch/axios al backend
        console.log("Cambiar contraseña:", { currentPassword, newPassword });
    };
    // En tu componente principal:
    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState(user);

    const handleEditSubmit = (newData) => {
        setUserData(newData); // aquí podrías hacer también la llamada a tu API
    };


    return (
        <div className="relative h-auto bg-gray-50">
            <ParticlesBackground />
            <div className="relative z-10 p-8 w-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil de usuario</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    {/* Tarjeta de información */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white shadow-md rounded-2xl p-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Información personal</h2>
                        <div className="space-y-3 text-gray-600">
                            <div>
                                <span className="font-medium">Nombre:</span> {user.name}
                            </div>
                            <div>
                                <span className="font-medium">Correo:</span> {user.email}
                            </div>
                            <div>
                                <span className="font-medium">Rol:</span> {user.role.toLowerCase()}
                            </div>
                            <div>
                                <span className="font-medium">Facultad:</span> {user.faculty}
                            </div>
                            <div>
                                <span className="font-medium">Num. Telefóno: </span> {user.number}
                            </div>
                        </div>
                        
                    </motion.div>

                    {/* Tarjeta de acciones */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h2
                            className="text-xl font-semibold text-gray-700 mb-4">Configuración</h2>
                            <p className="text-gray-600 mb-4">
                                Si deseas cambiar tu contraseña
                                actual, puedes hacerlo aquí:
                            </p>
                            <motion.button
                                whileTap={{scale: 0.95}}
                                whileHover={{scale: 1.03}}
                                className="self-start bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
                                onClick={() => setShowModal(true)}
                            >
                                Cambiar contraseña
                            </motion.button>
                        </div>
                        <div className="pt-6">

                            <p className="text-gray-600 mb-4">
                                Si deseas cambiar tus datos
                                actuales, puedes hacerlo aquí:
                            </p>
                            <motion.button
                                whileTap={{scale: 0.95}}
                                whileHover={{scale: 1.03}}
                                className="self-start bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
                                onClick={() => setShowEditModal(true)}
                            >
                                Cambiar datos
                            </motion.button>
                        </div>
                    </motion.div>
                    

                </div>
            </div>
            <ChangePasswordModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handlePasswordChange}
            />
            <EditUserModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                user={userData}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
};

export default Profile;
