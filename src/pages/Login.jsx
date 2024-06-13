import React, { useState } from 'react';
import SidebarLogo from '../images/ingreso-personal.png';
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';


const Login = () => {

    const auth = useAuth();

    const [user, setUser] = useState({ user: '', password: '' });
    const [errorResponse, setErrorResponse] = useState('');

    if (auth.isAuthenticated) return <Navigate to="/main" />;

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

    return (
        <div className="flex justify-center items-center h-screen bg-neutral-200">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <img src={SidebarLogo} alt="Logo" />
                <form className='form' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-blue-950  font-bold mb-2" htmlFor="username">
                            Usuario
                        </label>
                        <input
                            className="border-2 rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline focus:border-blue-950"
                            id="username"
                            type="text"
                            placeholder="Ingrese su usuario"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-blue-950  font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="border-2 rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline focus:border-blue-950"
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                        {errorResponse && <p className="text-red-500 text-xs italic mt-2">{errorResponse}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                        {/* <a
                            className="inline-block align-baseline ml-3 font-bold text-sm text-blue-700 hover:text-blue-950"
                            href="#"
                        >
                            ¿Olvidaste tu contraseña?
                        </a> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;