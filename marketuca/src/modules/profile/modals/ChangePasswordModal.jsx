import React, {useContext, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
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
                <div className="fixed inset-0 bg-gray-100/50 bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Cambiar contraseña</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Contraseña actual</label>
                                <input
                                    type="password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Nueva contraseña</label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Confirmar nueva contraseña</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ChangePasswordModal;