"use client"

import { CheckCircleIcon } from "@heroicons/react/24/outline"

export default function SuccessModal({ message, onClose }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
      <h3 className="text-xl font-semibold text-green-700 mb-2">¡Operación exitosa!</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-colors"
      >
        Cerrar
      </button>
    </div>
  )
}
