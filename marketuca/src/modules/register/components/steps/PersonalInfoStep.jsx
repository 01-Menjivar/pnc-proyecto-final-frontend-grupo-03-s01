import { useFormContext } from 'react-hook-form';

const PersonalInfoStep = ({ formDataStored, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            {...register('nombre', { required: 'El nombre es requerido' })}
            defaultValue={formDataStored.nombre || ''}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${
              errors.nombre ? 'border-red-500' : ''
            }`}
            placeholder="Juan"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
            Apellido *
          </label>
          <input
            type="text"
            id="apellido"
            {...register('apellido', { required: 'El apellido es requerido' })}
            defaultValue={formDataStored.apellido || ''}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${
              errors.apellido ? 'border-red-500' : ''
            }`}
            placeholder="Pérez"
          />
          {errors.apellido && (
            <p className="text-red-500 text-sm mt-1">{errors.apellido.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          type="tel"
          id="telefono"
          {...register('telefono', {
            required: 'El teléfono es requerido',
            pattern: {
              value: /^[267][0-9]{7}$/,
              message: 'Debe ser un número salvadoreño válido (ej: 73214531)',
            },
          })}
          defaultValue={formDataStored.telefono || ''}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${
            errors.telefono ? 'border-red-500' : ''
          }`}
          placeholder="73214531"
        />
        {errors.telefono && (
          <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
        )}
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-[#0056b3] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoStep;