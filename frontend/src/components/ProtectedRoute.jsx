import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    if(!user || !user.data) {
        return <Navigate to="/login" replace/>
    }


  return <Outlet />;
}

export default ProtectedRoute;