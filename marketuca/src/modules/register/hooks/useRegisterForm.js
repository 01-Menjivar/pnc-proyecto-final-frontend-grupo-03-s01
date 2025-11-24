import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../service/apiService';

// Hook personalizado que encapsula toda la lógica de registro de usuarios.
// Maneja formularios, validación, llamadas API, estados de carga y navegación.
const useRegisterForm = () => {
  // Configuración de react-hook-form para manejo del formulario
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  // Estados para controlar el modal de confirmación/error
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', isError: false });
  // Estado para mostrar spinner durante la petición API
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Observa el campo password para validación en tiempo real (confirmar password)
  const password = watch('password');

  // Función principal que maneja el envío del formulario de registro
  const onSubmit = async (data) => {
    setIsLoading(true);

    // Transforma los datos del formulario al formato esperado por el API
    const fullName = `${data.nombre} ${data.apellido}`;
    const payload = {
      name: fullName,
      email: data.email,
      password: data.password,
      faculty: data.facultad,
      phoneNumber: data.telefono,
    };

    try {
      // Envía los datos al servidor usando el servicio API centralizado
      await postData('/user/auth/register', payload);
      setModalData({
        title: '¡Registro exitoso!',
        message: 'Tu cuenta ha sido creada correctamente. Serás redirigido al inicio de sesión en unos segundos.',
        isError: false,
      });
      reset(); // Limpia el formulario después del éxito
      // Redirige automáticamente después de 2 segundos
      setTimeout(() => {
        setModalOpen(false);
        navigate('/login');
      }, 2000);
    } catch (error) {
      setModalData({
        title: 'Error en el registro',
        message: error.message || 'No se pudo completar el registro. Intenta de nuevo.',
        isError: true,
      });
    } finally {
      setIsLoading(false);
      setModalOpen(true);
    }
  };

  // Maneja el cierre del modal y redirige si el registro fue exitoso
  const handleModalClose = () => {
    setModalOpen(false);
    if (!modalData.isError) {
      navigate('/login');
    }
  };

  // Retorna todas las funciones y estados necesarios para el formulario de registro
  return {
    register,       // Función para registrar campos del formulario
    handleSubmit,   // Wrapper de react-hook-form para manejo de envío
    errors,         // Errores de validación del formulario
    password,       // Valor actual del campo password (para confirmación)
    onSubmit,       // Función principal de envío
    modalOpen,      // Estado del modal
    setModalOpen,   // Setter para controlar modal manualmente
    modalData,      // Datos del modal (título, mensaje, tipo)
    isLoading,      // Estado de carga para mostrar spinners
    handleModalClose, // Función para cerrar modal con lógica de navegación
  };
};

export default useRegisterForm;