import React, { useContext, createContext, useState, useEffect } from 'react';
import requestNewAccesToken from './requestNewAccesToken';
import config from "../config";
import axios from "axios";

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
    const [user, setUser] = useState(null);

    const getToken = () => token;

    const login = (response, user) => {
        setTokens(response.data.token, response.data.refreshToken);
        localStorage.setItem('user', user);
        setUser(user);
        setIsAuthenticated(true);
        console.log(user);
        console.log(localStorage.getItem('user')); 
    };

    const logout = () => {
        localStorage.removeItem('authTokens');
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    const getRefreshToken = () => refreshToken;

    const getNewToken = async (refreshToken, token, user) => {
        const accessToken = await requestNewAccesToken(refreshToken, token, user);
        if (accessToken) {
            setToken(accessToken);
            return accessToken;
        }
        return null;
    };

    const checkauth = async () => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const user = localStorage.getItem('user');
            console.log(authTokens, user);
            if (authTokens && authTokens.token && authTokens.refreshToken) {

                const newToken = await getNewToken(authTokens.refreshToken, authTokens.token, user);
                if (newToken) {
                    const userInfo = await retrieveUserInfo(user);
                    setUser(userInfo);
                    setIsAuthenticated(true);
                } else {
                    logout();
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            logout();
        }
    };

    const getUser = () => user;

    useEffect(() => {
        checkauth();
    }, []);

    const setTokens = (token, refreshToken) => {
        setToken(token);
        setRefreshToken(refreshToken);
        localStorage.setItem('authTokens', JSON.stringify({ token, refreshToken }));
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            getToken,
            setTokens,
            getRefreshToken,
            getUser,
            login,
            logout
        }}>
            {children}
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
