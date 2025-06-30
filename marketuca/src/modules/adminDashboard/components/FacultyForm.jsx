"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function FacultyForm({ faculty, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ facultyName: "" })

  /* Rellena cuando editas */
  useEffect(() => {
    if (faculty) setFormData({ facultyName: faculty.faculty })
  }, [faculty])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("🟢 submit FacultyForm →", formData)      // 👀 DEBUG
    onSubmit(formData)                                   // { facultyName: "..." }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre de la Facultad
        </label>
        <input
          type="text"
          name="facultyName"
          value={formData.facultyName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <motion.button type="submit" className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-shadow" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {faculty ? "Actualizar" : "Crear"}
        </motion.button>
        <motion.button type="button" onClick={onCancel} className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Cancelar
        </motion.button>
      </div>
    </form>
  )
}
