import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'


const ProtectedRoute = () => {

    const auth = useAuth();

    return auth.isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute