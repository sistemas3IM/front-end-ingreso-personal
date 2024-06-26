import React, { useState } from 'react';
import banner from '../images/xl05.jpg'
import { FloatingLabel } from 'flowbite-react';
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Loginp = () => {
    const auth = useAuth();

    const [user, setUser] = useState({ user: '', password: '' });
    const [errorResponse, setErrorResponse] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { user: e.target.username.value, password: e.target.password.value };
        setUser(userData);
        login(userData);
    };
    const login = async (userData) => {
        try {
            const response = await axios.post(`${config.debugUrl}/login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log(response);
                auth.login(response, userData.user);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error al iniciar sesión:', error.response.data);
                setErrorResponse(error.response.data.message);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
                setErrorResponse('No se recibió respuesta del servidor');
            } else {
                console.error('Error:', error.message);
                setErrorResponse('Error al iniciar sesión');
            }
        }
    };

    if (auth.isAuthenticated) return <Navigate to="/main" />;

    return (
        <div className='flex justify-center items-center h-screen bg-white'>
            <div className='flex bg-neutral-100 shadow-md rounded-3xl '>
                <div className='flex items-center max-h-[700px] max-w-[900px]'>
                    <img src={banner} alt="Banner" className='object-none w-full h-full rounded-3xl rounded-r-none shadow-md' />
                </div>
                <div className='items-center py-10 px-5 my-auto mx-16'>
                    <form action="submit" onSubmit={handleSubmit} className='flex flex-col w-full'>
                        <div className='flex flex-col mb-6'>
                            <h1 className='text-3xl text-blue-950 mb-2'>Iniciar sesión</h1>
                            <p className='text-sm text-blue-900'>
                                Ingrese sus credenciales para acceder al sistema
                            </p>
                        </div>

                        <div className='mb-3'>
                            <div className='bg-white rounded-b-none rounded-md'>
                                <FloatingLabel
                                    id='username'
                                    variant='standard'
                                    label='Usuario'
                                    type='text'
                                    className=' px-3 text-blue-950'
                                />

                            </div>
                        </div>
                        <div className='mb-3'>
                            <div className='bg-white rounded-b-none rounded-md relative'>
                                <FloatingLabel
                                    id='password'
                                    variant='standard'
                                    label='Contraseña'
                                    type={showPassword ? 'text' : 'password'}
                                    className=' px-3 text-blue-950'
                                />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-0 top-0 mt-3 mr-3'
                                    >
                                        {showPassword ? <HiEyeSlash className='text-blue-950' /> : <HiEye className='text-blue-950' />}
                                    </button>

                            </div>

                        </div>
                        {errorResponse &&
                            <p className="bg-red-200 text-red-600 p-1 border-b border-red-700 text-xs mb-1">
                                {errorResponse}
                            </p>}
                        <div className='flex items-center justify-between mt-6'>
                            <button
                                className="bg-blue-950 hover:bg-blue-700 text-white py-2 px-4 w-full rounded-md focus:outline-none"
                                type="submit"
                            >
                                Iniciar sesión
                            </button>

                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Loginp