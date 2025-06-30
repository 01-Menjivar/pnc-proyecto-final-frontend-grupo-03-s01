import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../service/apiService';

const useRegisterForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);

    const fullName = `${data.nombre} ${data.apellido}`;
    const payload = {
      name: fullName,
      username: data.email,
      password: data.password,
      faculty: data.facultad,
      phoneNumber: data.telefono.replace('+503', ''),
    };

    try {
      await postData('/auth/register', payload);
      setModalData({
        title: '¡Registro exitoso!',
        message: 'Tu cuenta ha sido creada correctamente.',
        isError: false,
      });
      reset();

      setTimeout(() => {
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

  return {
    register,
    handleSubmit,
    errors,
    password,
    onSubmit,
    modalOpen,
    setModalOpen,
    modalData,
    isLoading,
  };
};

export default useRegisterForm;
