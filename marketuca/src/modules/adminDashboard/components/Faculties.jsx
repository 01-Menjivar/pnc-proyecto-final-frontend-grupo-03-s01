"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { useData } from "../hooks/useData";
import Modal from "./Modal";
import FacultyForm from "./FacultyForm";
import LoadingSkeleton from "./LoadingSkeleton";

export default function Faculties() {
  const { faculties, users, addFaculty, updateFaculty, deleteFaculty, isLoading } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Depuración de los datos de faculties
  console.log('Faculties en Faculties.jsx:', faculties);

  // Asegurarse de que faculty.faculty sea una cadena válida
  const filteredFaculties = faculties.filter((faculty) =>
    typeof faculty?.faculty === 'string'
      ? faculty.faculty.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  const handleAddFaculty = () => {
    setEditingFaculty(null);
    setIsModalOpen(true);
  };

  const handleEditFaculty = (faculty) => {
    setEditingFaculty(faculty);
    setIsModalOpen(true);
  };

  const handleDeleteFaculty = (index) => {
    deleteFaculty(index);
  };

  const handleSubmit = (facultyData) => {
    if (editingFaculty) {
      const index = faculties.findIndex((f) => f === editingFaculty);
      updateFaculty(index, facultyData);
    } else {
      addFaculty(facultyData);
    }
    setIsModalOpen(false);
    setEditingFaculty(null);
  };

  const getUserCountByFaculty = (facultyName) => {
    return users.filter((user) => user.facultyName === facultyName).length;
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Facultades</h1>
          <p className="text-gray-600">Administra las facultades del sistema</p>
        </div>
        <motion.button
          onClick={handleAddFaculty}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Agregar Facultad</span>
        </motion.button>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar facultades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <AnimatePresence>
            {filteredFaculties.length > 0 ? (
              filteredFaculties.map((faculty, index) => {
                const userCount = getUserCountByFaculty(faculty.faculty);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                        <AcademicCapIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleEditFaculty(faculty)}
                          className="text-cyan-600 hover:text-cyan-900 p-2 rounded-lg hover:bg-cyan-100 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteFaculty(index)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-100 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faculty.faculty || "Sin nombre"}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Usuarios registrados</span>
                      <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                        {userCount}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-gray-600 p-6">No hay facultades disponibles que coincidan con la búsqueda.</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFaculty ? "Editar Facultad" : "Agregar Facultad"}
      >
        <FacultyForm faculty={editingFaculty} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}