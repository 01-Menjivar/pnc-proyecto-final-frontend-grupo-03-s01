import React, {useContext, useEffect, useState} from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Book, Lock, Smartphone } from "lucide-react";
import ParticlesBackground from "../../utils/ParticlesBackground";
import ChangePasswordModal from "../modals/ChangePasswordModal.jsx";
import EditUserModal from "../modals/EditUserData.jsx";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {getUserInfo} from "../services/profileService.js";


const Profile = () => {
    const {token} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("info"); // 'info' | 'config'
    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState({});
    const email = localStorage.getItem("email");
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data } = await getUserInfo(email, token);
                setUser(data);
                setUserData(data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        fetchUserInfo();
    }, [email, token]);

    if (!user) return <p>Cargando usuario...</p>;
    
    const handlePasswordChange = ({ currentPassword, newPassword }) => {
        // Aquí puedes hacer fetch/axios al backend
        console.log("Cambiar contraseña:", { currentPassword, newPassword });
    };

    const handleEditSubmit = (newData) => {
        setUserData(newData); // aquí podrías hacer también la llamada a tu API
    };


    return (
        <div className="relative min-h-screen bg-gray-50">
            <ParticlesBackground />
            <div className="relative z-10 p-8 w-screen flex flex-col items-center">
                <div className="max-w-4xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-lg bg-blue-800 text-white p-6 flex items-center gap-4 mb-6"
                    >
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold text-2xl">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user.name || "Usuario"}</h1>
                        </div>
                    </motion.div>

                  
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <div className="flex border-b border-gray-200 mb-6">
                            <button
                                onClick={() => setActiveTab("info")}
                                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
                                    activeTab === "info"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                <User className="w-4 h-4" />
                                Información personal
                            </button>
                            <button
                                onClick={() => setActiveTab("config")}
                                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
                                    activeTab === "config"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                <Lock className="w-4 h-4" />
                                Configuración
                            </button>
                        </div>

                  
                        {activeTab === "info" && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              
                                    <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full">
                                            <User className="w-6 h-6 text-blue-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Nombre</p>
                                            <p className="font-semibold text-gray-800">{user.name || "Sin nombre"}</p>
                                        </div>
                                    </div>

                               
                                    <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full">
                                            <Mail className="w-6 h-6 text-blue-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Correo</p>
                                            <p className="font-semibold text-gray-800">{user.email || "Sin correo"}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full">
                                            <Phone className="w-6 h-6 text-blue-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Teléfono</p>
                                            <p className="font-semibold text-gray-800">{user.phoneNumber || "Sin teléfono"}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full">
                                            <Book className="w-6 h-6 text-blue-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Facultad</p>
                                            <p className="font-semibold text-gray-800">{user.facultyName || "No especificada"}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "config" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="w-full bg-white border border-gray-200 p-4 rounded-lg flex items-start gap-3 text-left hover:shadow transition-shadow"
                                >
                                    <div className="p-2 bg-blue-50 rounded-full">
                                        <Lock className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Cambiar contraseña</p>
                                        <p className="text-sm text-gray-500">Actualiza tu contraseña de forma segura</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="w-full bg-white border border-gray-200 p-4 rounded-lg flex items-start gap-3 text-left hover:shadow transition-shadow"
                                >
                                    <div className="p-2 bg-blue-50 rounded-full">
                                        <Smartphone className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Cambiar número de contacto</p>
                                        <p className="text-sm text-gray-500">Actualiza tu número de contacto nuevo</p>
                                    </div>
                                </button>
                            </motion.div>
                        )}
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
