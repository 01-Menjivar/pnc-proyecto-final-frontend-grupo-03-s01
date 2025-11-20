import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, User, CheckCircle } from 'lucide-react';
import Modal from '../modal/modal';
import Preloader from './Preloader';
import ParticlesBackground from '../../utils/ParticlesBackground';
import { postData } from '../service/apiService';

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', isError: false });
  const [formDataStored, setFormDataStored] = useState({});
  
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nombre: '',
      apellido: '',
      telefono: '',
      facultad: '',
      password: '',
      confirmPassword: '',
      email: '',
      otp: ''
    }
  });

  const password = watch('password');

  const steps = [
    {
      id: 1,
      title: "Información personal",
      subtitle: "Datos básicos y de contacto",
      icon: User,
      color: "bg-[#0056b3] border-[#0056b3]",
      bgColor: "bg-blue-50/50",
      borderColor: "border-[#0056b3]/30"
    },
    {
      id: 2,
      title: "Información académica",
      subtitle: "Facultad y credenciales de acceso",
      icon: User,
      color: "bg-indigo-600 border-indigo-600",
      bgColor: "bg-indigo-50/50",
      borderColor: "border-indigo-400/30"
    },
    {
      id: 3,
      title: "Verificación de correo",
      subtitle: "Enviaremos un código a tu correo institucional",
      icon: Mail,
      color: "bg-purple-600 border-purple-600",
      bgColor: "bg-purple-50/50",
      borderColor: "border-purple-400/30"
    },
    {
      id: 4,
      title: "Código de verificación",
      subtitle: "Ingresa el código enviado a tu correo",
      icon: CheckCircle,
      color: "bg-green-600 border-green-600",
      bgColor: "bg-green-50/50",
      borderColor: "border-green-400/30"
    }
  ];

  const handleModalClose = () => {
    setModalOpen(false);
    if (!modalData.isError && currentStep === 4) {
      window.location.href = '/login';
    }
  };

  const storeStepOneData = (data) => {
    const newData = { ...formDataStored, ...data };
    setFormDataStored(newData);
    Object.keys(data).forEach(key => {
      setValue(key, data[key]);
    });
    setCurrentStep(2);
  };

  const storeStepTwoData = (data) => {
    const combinedData = { ...formDataStored, ...data };
    setFormDataStored(combinedData);
    Object.keys(data).forEach(key => {
      setValue(key, data[key]);
    });
    setCurrentStep(3);
  };

  const storeFormDataAndSendCode = async (data) => {
    setIsLoading(true);
    try {
      const completeData = {
        ...formDataStored,
        email: data.email
      };
      setFormDataStored(completeData);
      setValue('email', data.email);
      
      await postData('/user/auth/register', { email: data.email });
      setCurrentStep(4);
    } catch (error) {
      setModalData({
        title: 'Error',
        message: error.message || 'Error al enviar el código de verificación',
        isError: true
      });
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAndRegister = async (data) => {
    setIsLoading(true);
    try {
      const requestBody = {
        name: `${formDataStored.nombre} ${formDataStored.apellido}`,
        email: formDataStored.email,
        password: formDataStored.password,
        faculty: formDataStored.facultad,
        phoneNumber: formDataStored.telefono,
        otp: data.otp
      };

      const result = await postData('/user/auth/verify', requestBody);

      setModalData({
        title: 'Registro exitoso',
        message: result.message || 'Tu cuenta ha sido creada exitosamente. Serás redirigido al inicio de sesión.',
        isError: false
      });
      setModalOpen(true);
    } catch (error) {
      setModalData({
        title: 'Error en el registro',
        message: error.message || 'Error al crear la cuenta. Verifica el código ingresado.',
        isError: true
      });
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepData = steps.find(step => step.id === currentStep);

  const goToPreviousStep = (targetStep) => {
    const currentData = getValues();
    const updatedData = { ...formDataStored, ...currentData };
    setFormDataStored(updatedData);
    setCurrentStep(targetStep);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticlesBackground />
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Preloader />
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col mx-auto">
          <div className="bg-gradient-to-r from-[#0056b3] to-[#003875] px-6 py-4 rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Crear cuenta</h2>
                <p className="text-blue-200 text-sm">Paso {currentStep} de {totalSteps}</p>
              </div>
            </div>
          </div>

       
          <div className="flex-1 overflow-y-auto relative">
            <div className="p-6">
            
              <div className="flex gap-2 mb-6">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <div
                    key={index + 1}
                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                      index + 1 <= currentStep ? 'bg-[#0056b3]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

            
              <div className={`rounded-lg border-2 p-4 mb-6 transition-all duration-300 ${currentStepData.bgColor} ${currentStepData.borderColor}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${currentStepData.color} text-white`}>
                    <currentStepData.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{currentStepData.title}</h3>
                    <p className="text-sm text-gray-600">{currentStepData.subtitle}</p>
                  </div>
                </div>
              </div>

              
              <div className="transition-opacity duration-300 ease-in-out"
                   style={{ opacity: isLoading ? 0.7 : 1 }}>

              
              {currentStep === 1 && (
                <form onSubmit={handleSubmit(storeStepOneData)} className="space-y-4 pb-6">
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
              )}

             
              {currentStep === 2 && (
                <form onSubmit={handleSubmit(storeStepTwoData)} className="space-y-4 pb-6">
                  <div>
                    <label htmlFor="facultad" className="block text-sm font-medium text-gray-700 mb-1">
                      Facultad *
                    </label>
                    <select
                      id="facultad"
                      {...register('facultad', { required: 'La facultad es requerida' })}
                      defaultValue={formDataStored.facultad || ''}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] ${
                        errors.facultad ? 'border-red-500' : ''
                      }`}
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      id="password"
                      {...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener al menos 8 caracteres',
                        },
                      })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar contraseña *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      {...register('confirmPassword', {
                        required: 'Debes confirmar la contraseña',
                        validate: (value) => value === password || 'Las contraseñas no coinciden',
                      })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => goToPreviousStep(1)}
                      className="text-gray-600 hover:text-gray-800 px-4 py-2 transition-colors"
                    >
                      ← Anterior
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Continuar
                    </button>
                  </div>
                </form>
              )}

              {currentStep === 3 && (
                <form onSubmit={handleSubmit(storeFormDataAndSendCode)} className="space-y-4 pb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico institucional *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'El correo es requerido',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@uca\.edu\.sv$/,
                          message: 'Debe ser un correo institucional (@uca.edu.sv)',
                        },
                      })}
                      defaultValue={formDataStored.email || ''}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] placeholder-gray-400 ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder="tu.nombre@uca.edu.sv"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-900">Verificación por correo</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          Te enviaremos un código de verificación a tu correo institucional. 
                          Asegúrate de que sea correcto antes de continuar.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => goToPreviousStep(2)}
                      className="text-gray-600 hover:text-gray-800 px-4 py-2 transition-colors"
                    >
                      ← Anterior
                    </button>
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enviando código...
                        </>
                      ) : (
                        "Enviar código"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {currentStep === 4 && (
                <form onSubmit={handleSubmit(verifyAndRegister)} className="space-y-4 pb-6">
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
                      onClick={async () => {
                        try {
                          await postData('/user/auth/resend', { email: formDataStored.email });
                          setModalData({
                            title: 'Código reenviado',
                            message: 'Se ha enviado un nuevo código a tu correo electrónico.',
                            isError: false
                          });
                          setModalOpen(true);
                        } catch {
                          setModalData({
                            title: 'Error',
                            message: 'No se pudo reenviar el código. Intenta nuevamente.',
                            isError: true
                          });
                          setModalOpen(true);
                        }
                      }}
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
                      onClick={() => goToPreviousStep(3)}
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
              )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={handleModalClose}
          title={modalData.title}
          message={modalData.message}
          isError={modalData.isError}
        />
      )}
    </div>
  );
};

export default RegisterForm;