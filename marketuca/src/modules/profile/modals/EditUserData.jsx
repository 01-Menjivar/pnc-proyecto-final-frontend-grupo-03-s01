import React, {useState, useEffect, useContext} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone } from "lucide-react";
import {updatePhoneNumber} from "../services/profileService.js";
import {AuthContext} from "../../../context/AuthContext.jsx";


const EditUserModal = ({ isOpen, onClose, user}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const {token} = useContext(AuthContext);
    useEffect(() => {
        if (user?.number) {
            setPhoneNumber(user.number);
        }
    }, [user, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phoneNumber.trim()) {
            setError("Por favor, ingresa un número de teléfono válido.");
            return;
        }

        try {
            await updatePhoneNumber(phoneNumber, token);
            setError("");
            setSuccessMessage("Número actualizado correctamente.");
            setTimeout(() => {
                setSuccessMessage("");
                onClose();
            }, 1500);
        } catch (err) {
            setError("Ocurrió un error al actualizar el número.");
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
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md min-h-[350px] overflow-hidden"
                    >
                        <div className="bg-blue-800 text-white p-6 flex items-center gap-3">
                            <div className="p-3 rounded-full bg-white text-blue-800">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold">Cambiar número de contacto</h2>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Número de teléfono</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="Ej: 7777-7777"
                                        required
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

export default EditUserModal;
