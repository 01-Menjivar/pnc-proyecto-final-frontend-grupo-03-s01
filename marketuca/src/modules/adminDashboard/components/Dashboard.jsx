"use client";

import { motion } from "framer-motion";
import { UsersIcon, TagIcon, AcademicCapIcon, StarIcon } from "@heroicons/react/24/outline";
import { useData } from "../hooks/useData";
import LoadingSkeleton from "./LoadingSkeleton";

export default function Dashboard() {
  const { users, categories, faculties, isLoading, error } = useData();

  // Depuración de los datos recibidos
  console.log('Datos en Dashboard:', { users, categories, faculties });

  const safeUsers = Array.isArray(users) ? users : [];
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeFaculties = Array.isArray(faculties) ? faculties : [];

  const stats = [
    {
      name: "Total Usuarios",
      value: safeUsers.length,
      icon: UsersIcon,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Categorías",
      value: safeCategories.length,
      icon: TagIcon,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      name: "Facultades",
      value: safeFaculties.length,
      icon: AcademicCapIcon,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      name: "Rating Promedio",
      value: safeUsers.length > 0 ? (safeUsers.reduce((acc, user) => acc + (user.rating || 0), 0) / safeUsers.length).toFixed(1) : "0.0",
      icon: StarIcon,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
  ];

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Error</h1>
        <p className="text-red-600">{error}</p>
        <p className="text-gray-600 mt-2">
          Por favor, intenta iniciar sesión nuevamente o contacta al soporte.
        </p>
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen general del sistema de gestión</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Usuarios por Rating</h3>
          <div className="space-y-3">
            {safeUsers.length > 0 ? (
              safeUsers
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, 5)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{user.name || "Usuario desconocido"}</p>
                      <p className="text-sm text-gray-500 truncate">{user.facultyName || "Sin facultad"}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-bold text-gray-900">{user.rating || "0.0"}</span>
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">#{index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-600">No hay usuarios disponibles. Verifica la conexión con el servidor o intenta de nuevo.</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen por Facultades</h3>
          <div className="space-y-4">
            {safeFaculties.length > 0 ? (
              safeFaculties.map((faculty, index) => {
                const facultyUsers = safeUsers.filter((user) => user.facultyName === faculty.faculty);
                const userCount = facultyUsers.length;
                const avgRating =
                  userCount > 0
                    ? (facultyUsers.reduce((acc, user) => acc + (user.rating || 0), 0) / userCount).toFixed(1)
                    : "0.0";
                const percentage = safeUsers.length > 0 ? (userCount / safeUsers.length) * 100 : 0;

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">{faculty.faculty || "Sin nombre"}</span>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-3 h-3 text-amber-400" />
                          <span className="text-xs text-gray-500">{avgRating}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{userCount} usuarios</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <div className="text-xs text-gray-400">{percentage.toFixed(1)}% del total</div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600">No hay facultades disponibles. Verifica la conexión con el servidor o intenta de nuevo.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}