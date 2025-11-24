import { useFormContext } from 'react-hook-form';

const OTPVerificationStep = ({ formDataStored, onSubmit, onPrevious, onResendCode, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Hemos enviado un código de verificación a:
        </p>
        <p className="font-semibold text-[#0056b3]">{formDataStored?.email}</p>
        <p className="text-sm text-gray-500 mt-2">
          Revisa tu bandeja de entrada y tu carpeta de spam
        </p>
        
        <button
          type="button"
          onClick={onResendCode}
          className="text-sm text-[#0056b3] hover:underline mt-2"
        >
          ¿No recibiste el código? Reenviar
        </button>
      </div>
      
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
          Código de verificación *
        </label>
        <input
          type="text"
          id="otp"
          {...register('otp', {
            required: 'El código es requerido',
            pattern: {
              value: /^[0-9]{6}$/,
              message: 'El código debe tener 6 dígitos',
            },
          })}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 text-center text-2xl tracking-widest ${
            errors.otp ? 'border-red-500' : ''
          }`}
          placeholder="123456"
          maxLength="6"
        />
        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="text-gray-600 hover:text-gray-800 px-4 py-2 transition-colors"
        >
          ← Anterior
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creando cuenta...
            </>
          ) : (
            "Crear cuenta"
          )}
        </button>
      </div>
    </form>
  );
};

export default OTPVerificationStep;