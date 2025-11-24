import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Mail, User, CheckCircle } from 'lucide-react';
import Modal from '../modal/modal';
import Preloader from './Preloader';
import ParticlesBackground from '../../utils/ParticlesBackground';
import { postData } from '../service/apiService';
import StepProgressBar from './StepProgressBar';
import StepInfoCard from './StepInfoCard';
import PersonalInfoStep from './steps/PersonalInfoStep';
import AcademicInfoStep from './steps/AcademicInfoStep';
import EmailVerificationStep from './steps/EmailVerificationStep';
import OTPVerificationStep from './steps/OTPVerificationStep';

const STEPS_CONFIG = [
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

const TOTAL_STEPS = 4;

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', isError: false });
  const [formDataStored, setFormDataStored] = useState({});

  const formMethods = useForm({
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

  const { setValue, getValues } = formMethods;

  const currentStepData = STEPS_CONFIG.find(step => step.id === currentStep);

  const handleModalClose = () => {
    setModalOpen(false);
    if (!modalData.isError && currentStep === 4) {
      window.location.href = '/login';
    }
  };

  const goToPreviousStep = (targetStep) => {
    const currentData = getValues();
    const updatedData = { ...formDataStored, ...currentData };
    setFormDataStored(updatedData);
    setCurrentStep(targetStep);
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

  const handleResendCode = async () => {
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
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formDataStored={formDataStored}
            onSubmit={storeStepOneData}
          />
        );
      case 2:
        return (
          <AcademicInfoStep
            formDataStored={formDataStored}
            onSubmit={storeStepTwoData}
            onPrevious={() => goToPreviousStep(1)}
          />
        );
      case 3:
        return (
          <EmailVerificationStep
            formDataStored={formDataStored}
            onSubmit={storeFormDataAndSendCode}
            onPrevious={() => goToPreviousStep(2)}
            isLoading={isLoading}
          />
        );
      case 4:
        return (
          <OTPVerificationStep
            formDataStored={formDataStored}
            onSubmit={verifyAndRegister}
            onPrevious={() => goToPreviousStep(3)}
            onResend={handleResendCode}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
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
                <p className="text-blue-200 text-sm">Paso {currentStep} de {TOTAL_STEPS}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto relative">
            <div className="p-6">
              <StepProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
              <StepInfoCard stepData={currentStepData} />
              
              <div className="transition-opacity duration-300 ease-in-out"
                   style={{ opacity: isLoading ? 0.7 : 1 }}>
                <FormProvider {...formMethods}>
                  {renderCurrentStep()}
                </FormProvider>
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