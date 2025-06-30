import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, message, isError = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl text-center"
      >
        <h2 className={`text-xl font-bold mb-4 ${isError ? 'text-red-600' : 'text-indigo-600'}`}>
          {title}
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`px-6 py-2 rounded-xl text-white ${
            isError ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          Cerrar
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;