import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import requestNewAccesToken from './requestNewAccesToken';
import config from "../config";
import axios from "axios";
import Loading from '../components/Loading';

const AuthContext = createContext({
    isAuthenticated: false,
    getToken: () => { },
    setTokens: (_token, _refreshToken) => { },
    getRefreshToken: () => { },
    getUser: () => { },
    login: (_response, _user) => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [refreshToken, setRefreshToken] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isFirstMounted, setIsFirstMounted] = useState(true);
    const [isloading, setIsLoading] = useState(true);

    const getToken = () => token;

    const login = (response, user) => {
        setTokens(response.data.token, response.data.refreshToken);
        localStorage.setItem('user', user);
        setUser(user);
        setIsAuthenticated(true);
        console.log(user);
        console.log(localStorage.getItem('user'));
    };

    const logout = async (user) => {
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setUserInfo(null);
        await revokeToken(user);
    };

    const revokeToken = async (user) => {
        try {
            const response = await axios.delete(`${config.debugUrl}/revoke`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: user
            });
            if (response.status === 200) {
                console.log(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error al cerrar sesión:', error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const getRefreshToken = () => {
        if (!!refreshToken) {
            return refreshToken;
        }
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        if (authTokens && authTokens.refreshToken) {
            setRefreshToken(authTokens.refreshToken);
            return authTokens.refreshToken;
        }
        return null;
    };

    const getNewToken = async (refreshToken, token, user) => {
        const accessToken = await requestNewAccesToken(refreshToken, token, user);

        if (accessToken) {
            if (accessToken && accessToken.result === false && accessToken.message === "Token no ha expirado") {
                console.log("Token no ha expirado")
                return null;
            }
            return accessToken;
        }
        return null;
    };

    const checkAuth = async () => {
        console.log("Inicio CheckAuth: token", token, refreshToken);
        try {
            if (!!token) {
                const user = localStorage.getItem('user');
                const userInfo = await retrieveUserInfo(user);
                setUserInfo(userInfo);
                setTokens(token, refreshToken);
                setIsAuthenticated(true);
                console.log("no vacio: token", token, refreshToken);
            } else {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                console.log("useEffect: token", authTokens);
                const user = localStorage.getItem('user');
                if (authTokens && authTokens.token && authTokens.refreshToken) {
                    getNewToken(authTokens.refreshToken, authTokens.token, user)
                        .then(async (newToken) => {
                            if (newToken === null) {
                                const userInfo = await retrieveUserInfo(user);
                                setUserInfo(userInfo);
                                setIsAuthenticated(true);
                                console.log("Respuestas vacia: token", token, refreshToken);
                            } else if (newToken) {
                                const userInfo = await retrieveUserInfo(user);
                                setUserInfo(userInfo);
                                setTokens(newToken.token, newToken.refreshToken);
                                setIsAuthenticated(true);
                                console.log("Respuestas no vacia: token", token, refreshToken);
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error.message);
                        });
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error.message);
            setIsLoading(false);
        }
    };

    const getUser = () => userInfo;

    useEffect(() => {
        if (!refreshToken) {
            if (isFirstMounted) {
                checkAuth();
                setIsFirstMounted(false);
            }
        }
    }, []);

    const setTokens = (token, refreshToken) => {
        if (!token || !refreshToken) {
            return;
        }
        setToken(token);
        setRefreshToken(refreshToken);
        localStorage.setItem('authTokens', JSON.stringify({ token, refreshToken }));
        console.log('setTokens', token, refreshToken);
    };

    const contextValue = useMemo(() => ({
        isAuthenticated,
        getToken,
        setTokens,
        getRefreshToken,
        getUser,
        login,
        logout
    }), [isAuthenticated, token, refreshToken, userInfo]);

    return (
        <AuthContext.Provider value={contextValue}>
            {isloading ? <Loading/> : children}
        </AuthContext.Provider>
    );
};

const retrieveUserInfo = async (id) => {
    try {
        const response = await axios.get(`${config.url}/Usuario/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
