"use client"

import { motion } from "framer-motion"
import { HomeIcon, UsersIcon, TagIcon, AcademicCapIcon, ChartBarIcon } from "@heroicons/react/24/outline"

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: HomeIcon },
  { id: "users", name: "Usuarios", icon: UsersIcon },
  { id: "categories", name: "Categorías", icon: TagIcon },
  { id: "faculties", name: "Facultades", icon: AcademicCapIcon },
]

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-blue-100">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AdminPanel</h1>
            <p className="text-sm text-gray-500">Gestión Universitaria</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <motion.div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" layoutId="activeIndicator" />
              )}
            </motion.button>
          )
        })}
      </nav>
    </div>
  )
}
