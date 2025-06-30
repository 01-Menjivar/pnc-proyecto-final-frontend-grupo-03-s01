"use client"

import { useState, useEffect, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusIcon, PencilIcon, TrashIcon, StarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useData } from "../hooks/useData"
import Modal from "./Modal"
import UserForm from "./UserForm"
import LoadingSkeleton from "./LoadingSkeleton"
import { AuthContext } from "../../../context/AuthContext";
import RoleModal from "./RoleModal";
import { getUsersByName } from "../services/apiService";


export default function Users() {
    const { users, addUser, updateUser, deleteUser, isLoading } = useData()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const { token } = useContext(AuthContext);
    const [searchedUsers, setSearchedUsers] = useState([]);
    useEffect(() => {
        setSearchedUsers(users);
    }, [users]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setSearchedUsers(users); // usar todos si no hay búsqueda
                return;
            }

            const fetchFilteredUsers = async () => {
                try {
                    const response = await getUsersByName(token, searchTerm.trim());
                    setSearchedUsers(response.data || []);
                } catch (error) {
                    console.error("Error al buscar usuarios por nombre:", error);
                    setSearchedUsers([]);
                }
            };

            fetchFilteredUsers();
        }, 500); // Espera 500ms antes de hacer la petición

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, token, users]);

    const [selectedUserForRole, setSelectedUserForRole] = useState(null)

    const handleAddUser = () => {
        setEditingUser(null)
        setIsModalOpen(true)
    }

    const handleEditUser = (user) => {
        setSelectedUserForRole(user)
    }


    const handleDeleteUser = (index) => {
        deleteUser(index)
    }

    const handleSubmit = (userData) => {
        if (editingUser) {
            const index = users.findIndex((u) => u === editingUser)
            updateUser(index, userData)
        } else {
            addUser(userData)
        }
        setIsModalOpen(false)
        setEditingUser(null)
    }

    if (isLoading) {
        return <LoadingSkeleton />
    }

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-8"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
                    <p className="text-gray-600">Administra los usuarios del sistema</p>
                </div>
                {/*
                    <motion.button
                        onClick={handleAddUser}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Agregar Usuario</span>
                    </motion.button>
                */}
            </motion.div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar usuarios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facultad</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            <AnimatePresence>
                                {searchedUsers.map((user, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-medium text-sm">{user.name.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                            <div className="text-sm text-gray-500">{user.phoneNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                {user.facultyName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                {user.role || "Sin rol"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-1">
                                                <StarIcon className="w-4 h-4 text-amber-400" />
                                                <span className="text-sm font-medium text-gray-900">{user.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    onClick={() => handleEditUser(user)}
                                                    className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </motion.button>
                                                {/*<motion.button
                                                    onClick={() => handleDeleteUser(index)}
                                                    className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </motion.button>
                                                */}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? "Editar Usuario" : "Agregar Usuario"}
            >
                <UserForm user={editingUser} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
            </Modal>
            <Modal
                isOpen={!!selectedUserForRole}
                onClose={() => setSelectedUserForRole(null)}
                title="Editar Rol del Usuario"
            >
                {selectedUserForRole && (
                    <RoleModal user={selectedUserForRole} onClose={() => setSelectedUserForRole(null)} />
                )}
            </Modal>

        </div>
    )
}
