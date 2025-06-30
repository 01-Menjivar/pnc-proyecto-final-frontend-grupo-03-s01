"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useData } from "../hooks/useData"
import Modal from "./Modal"
import CategoryForm from "./CategoryForm"
import LoadingSkeleton from "./LoadingSkeleton"

export default function Categories() {
    const { categories, addCategory, updateCategory, deleteCategory, isLoading } = useData()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredCategories = categories.filter(
        (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleAddCategory = () => {
        setEditingCategory(null)
        setIsModalOpen(true)
    }

    const handleEditCategory = (category) => {
        setEditingCategory(category)
        setIsModalOpen(true)
    }

    const handleDeleteCategory = (index) => {
        deleteCategory(index)
    }

    const handleSubmit = (categoryData) => {
        if (editingCategory) {
            const index = categories.findIndex((c) => c === editingCategory)
            updateCategory(index, categoryData)
        } else {
            addCategory(categoryData)
        }
        setIsModalOpen(false)
        setEditingCategory(null)
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Categorías</h1>
                    <p className="text-gray-600">Administra las categorías del sistema</p>
                </div>
                <motion.button
                    onClick={handleAddCategory}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Agregar Categoría</span>
                </motion.button>
            </motion.div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar categorías..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    <AnimatePresence>
                        {filteredCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">{category.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <motion.button
                                            onClick={() => handleEditCategory(category)}
                                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </motion.button>
                                        {/*
                    <motion.button
                      onClick={() => handleDeleteCategory(index)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </motion.button>
*/}
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingCategory ? "Editar Categoría" : "Agregar Categoría"}
            >
                <CategoryForm category={editingCategory} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    )
}
