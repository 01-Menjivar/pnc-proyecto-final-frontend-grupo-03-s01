import React, {useContext, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {updatePassword} from "../services/profileService.js";

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const { token } = useContext(AuthContext);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            await updatePassword(currentPassword, newPassword, token);
            setSuccessMessage("Contraseña actualizada correctamente.");
            setError("");

            // Limpiar y cerrar tras un pequeño delay
            setTimeout(() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setSuccessMessage("");
                onClose();
            }, 1500);
        } catch (err) {
            setError("Error al actualizar la contraseña. Verifica tu contraseña actual.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md min-h-[400px] overflow-hidden"
                    >
         
                        <div className="bg-blue-800 text-white p-6 flex items-center gap-3">
                            <div className="p-3 rounded-full bg-white text-blue-800">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold">Cambiar contraseña</h2>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Contraseña actual</label>
                                    <input
                                        type="password"
                                        required
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Confirmar nueva contraseña</label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}
                                {successMessage && <p className="text-green-500 text-sm bg-green-50 p-2 rounded">{successMessage}</p>}
                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ChangePasswordModal;