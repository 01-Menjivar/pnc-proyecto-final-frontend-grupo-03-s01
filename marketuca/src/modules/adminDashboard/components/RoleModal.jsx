"use client"

import { useState, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Crown } from "lucide-react"
import { patchUserRole } from "../services/apiService"
import SuccessModal from "./SuccessModal"
import ErrorModal   from "./ErrorModal"
import { AuthContext } from "../../../context/AuthContext"

export default function RoleModal({ user, onClose }) {
  /* ────── Contexto & estado ────── */
  const { token } = useContext(AuthContext)          // ⬅️ Token del contexto
  const [isAdmin, setIsAdmin]       = useState(user.role === "ADMIN")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess]       = useState(null)
  const [error, setError]           = useState(null)

  /* ────── Handler ────── */
  const handleToggle = async () => {
    const newRole = isAdmin ? "USER" : "ADMIN"
    setIsAdmin(!isAdmin)           // feedback inmediato
    setIsSubmitting(true)

    try {
      const response = await patchUserRole(token, user.email, newRole)
      setSuccess(response.message || "Rol actualizado con éxito")
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || err.message || "Error al actualizar rol")
      // Revertir visualmente si falló
      setIsAdmin(isAdmin)          // vuelve al estado anterior
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ────── Render ────── */
  return (
    <div className="p-6">
      {/* Título dinámico */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={isAdmin ? "admin" : "user"}
          className={`text-2xl font-bold mb-6 text-center ${
            isAdmin ? "text-purple-600" : "text-blue-600"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {isAdmin ? "ADMIN" : "USER"}
        </motion.h2>
      </AnimatePresence>

      {/* Toggle */}
      <div className="flex justify-center">
        <motion.button
          disabled={isSubmitting}
          className={`relative w-24 h-12 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
            isAdmin ? "bg-purple-500 focus:ring-purple-300" : "bg-blue-500 focus:ring-blue-300"
          }`}
          onClick={handleToggle}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
            animate={{ x: isAdmin ? 48 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <AnimatePresence mode="wait">
              {isAdmin ? (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Crown className="w-5 h-5 text-purple-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="user"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <User className="w-5 h-5 text-blue-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>
      </div>

      {/* Modales de feedback */}
      {success && (
        <SuccessModal
          message={success}
          onClose={() => {
            setSuccess(null)
            onClose()              // cierra RoleModal
          }}
        />
      )}

      {error && (
        <ErrorModal
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  )
}
