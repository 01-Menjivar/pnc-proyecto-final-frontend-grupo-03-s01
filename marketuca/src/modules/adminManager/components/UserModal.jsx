import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const PAGE_SIZE = 5;

const UserModal = ({ users, onClose }) => {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(users.length / PAGE_SIZE);
    const paginatedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/30 flex justify-center items-center z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl p-6 w-[95vw] max-w-2xl relative"
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                >
                    <button
                        className="absolute right-4 top-3 text-gray-400 hover:text-red-500 text-2xl"
                        onClick={onClose}
                    >
                        ×
                    </button>
                    <h3 className="text-lg font-bold mb-4">Lista de usuarios</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {paginatedUsers.map((user) => (
                            <div key={user.id} className="bg-gray-100 rounded-xl p-3 flex flex-col sm:flex-row gap-2 items-center justify-between">
                                <span>{user.name} ({user.email})</span>
                                <span className={`px-3 py-1 rounded-full text-xs ${user.role === "ADMIN" ? "bg-green-200 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                                    {user.role}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="px-3 py-1 rounded-xl bg-gray-200 hover:bg-gray-300"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Anterior
                        </button>
                        <span className="text-sm text-gray-600">
                            Página {page} de {totalPages}
                        </span>
                        <button
                            className="px-3 py-1 rounded-xl bg-gray-200 hover:bg-gray-300"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UserModal;
