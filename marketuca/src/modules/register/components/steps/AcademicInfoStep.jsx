import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

const AcademicInfoStep = ({ formDataStored = {}, onSubmit, onPrevious }) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useFormContext();
  const password = watch('password');

  useEffect(() => {
    if (formDataStored) {
      if (formDataStored.facultad) setValue('facultad', formDataStored.facultad);
      if (formDataStored.password) setValue('password', formDataStored.password);
    }
  }, [formDataStored, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-6">
      <div>
        <label htmlFor="facultad" className="block text-sm font-medium text-gray-700 mb-1">Facultad *</label>
        <select
          id="facultad"
          {...register('facultad', { required: 'La facultad es requerida' })}
          defaultValue={formDataStored.facultad || ''}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] ${errors.facultad ? 'border-red-500' : ''}`}
        >
          <option value="" disabled>Selecciona tu facultad</option>
          <option value="Facultad de Ciencias Sociales y Humanidades">Facultad de Ciencias Sociales y Humanidades</option>
          <option value="Facultad de Ciencias Económicas y Empresariales">Facultad de Ciencias Económicas y Empresariales</option>
          <option value="Facultad de Ingeniería y Arquitectura">Facultad de Ingeniería y Arquitectura</option>
          <option value="Facultad de Postgrados">Facultad de Postgrados</option>
        </select>
        {errors.facultad && <p className="text-red-500 text-sm mt-1">{errors.facultad.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
          })}
          defaultValue={formDataStored.password || ''}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${errors.password ? 'border-red-500' : ''}`}
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña *</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Debes confirmar la contraseña',
            validate: (value) => value === password || 'Las contraseñas no coinciden'
          })}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onPrevious} className="text-gray-600 hover:text-gray-800 px-4 py-2 transition-colors">← Anterior</button>
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">Continuar</button>
      </div>
    </form>
  );
};

export default AcademicInfoStep;