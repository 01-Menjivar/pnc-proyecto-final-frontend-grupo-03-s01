"use client"

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export default function ErrorModal({ message, onClose }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-red-700 mb-2">Error</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors"
      >
        Cerrar
      </button>
    </div>
  )
}
