import { motion } from 'framer-motion';
import useRegisterForm from '../hooks/useRegisterForm';
import Modal from '../modal/modal';
import Preloader from './Preloader';
import ParticlesBackground from '../../utils/ParticlesBackground';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    password,
    onSubmit,
    modalOpen,
    setModalOpen,
    modalData,
    isLoading,
    handleModalClose,
  } = useRegisterForm();

  return (
    <section className="relative min-h-screen">
      <ParticlesBackground />
      <div className="absolute inset-0 z-0" />

      {/* Contenedor del formulario */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Crear cuenta
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                <input
                  type="text"
                  {...register('nombre', { required: 'El nombre es requerido' })}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:ring-1 placeholder-gray-300 ${errors.nombre ? 'border-red-500' : ''}`}
                  placeholder="Juan"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Apellido</label>
                <input
                  type="text"
                  {...register('apellido', { required: 'El apellido es requerido' })}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:ring-1 placeholder-gray-300 ${errors.apellido ? 'border-red-500' : ''}`}
                  placeholder="Pérez"
                />
                {errors.apellido && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellido.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
              <input
                type="tel"
                {...register('telefono', {
                  required: 'El teléfono es requerido',
                  pattern: {
                    value: /^[267][0-9]{7}$/,
                    message: 'Debe ser un número salvadoreño válido (ej: 77777777)',
                  },
                })}
                className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:ring-1 placeholder-gray-300 ${errors.telefono ? 'border-red-500' : ''}`}
                placeholder="77777777"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
              <input
                type="email"
                {...register('email', {
                  required: 'El correo es requerido',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@uca\.edu\.sv$/,
                    message: 'Debe ser un correo de la UCA (ej: correo@uca.edu.sv)',
                  },
                })}
                className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:ring-1 placeholder-gray-300 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="correo@uca.edu.sv"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Facultad</label>
              <select
                {...register('facultad', { required: 'La facultad es requerida' })}
                className={`w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:ring-1 ${errors.facultad ? 'border-red-500' : ''}`}
                defaultValue=""
              >
                <option value="" disabled>Selecciona tu facultad</option>
                <option value="Facultad de Ciencias Sociales y Humanidades">Facultad de Ciencias Sociales y Humanidades</option>
                <option value="Facultad de Ciencias Económicas y Empresariales">Facultad de Ciencias Económicas y Empresariales</option>
                <option value="Facultad de Ingeniería y Arquitectura">Facultad de Ingeniería y Arquitectura</option>
                <option value="Facultad de Postgrados">Facultad de Postgrados</option>
              </select>
              {errors.facultad && (
                <p className="text-red-500 text-sm mt-1">{errors.facultad.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
              <input
                type="password"
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres',
                  },
                })}
                className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:ring-1 placeholder-gray-300 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Confirmar contraseña</label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Debes confirmar la contraseña',
                  validate: (value) => value === password || 'Las contraseñas no coinciden',
                })}
                className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:ring-1 placeholder-gray-300 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md transition-colors cursor-pointer"
              disabled={isLoading}
            >
              Registrarse
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Preloader */}
      {isLoading && <Preloader />}

      {/* Modal de confirmación o error */}
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title={modalData.title}
        message={modalData.message}
        isError={modalData.isError}
      />
    </section>
  );
};

export default RegisterForm;