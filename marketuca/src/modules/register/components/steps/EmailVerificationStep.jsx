import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { Mail } from 'lucide-react';

const EmailVerificationStep = ({ formDataStored = {}, onSubmit, onPrevious, isLoading }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useFormContext();

  useEffect(() => {
    if (formDataStored?.email) setValue('email', formDataStored.email);
  }, [formDataStored?.email, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico institucional *</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'El correo es requerido',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@uca\.edu\.sv$/,
              message: 'Debe ser un correo institucional (@uca.edu.sv)'
            }
          })}
          defaultValue={formDataStored.email || ''}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
          placeholder="tu.nombre@uca.edu.sv"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-900">Verificación por correo</h4>
            <p className="text-sm text-purple-700 mt-1">Te enviaremos un código de verificación a tu correo institucional. Asegúrate de que sea correcto antes de continuar.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onPrevious} className="text-gray-600 hover:text-gray-800 px-4 py-2 transition-colors">← Anterior</button>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enviando código...
            </>
          ) : (
            'Enviar código'
          )}
        </button>
      </div>
    </form>
  );
};

export default EmailVerificationStep;