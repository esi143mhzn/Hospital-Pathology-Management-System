import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({allowedRoles }) => {
    const { user } = useContext(AuthContext);

    if (!user || !user.data) return <Navigate to="/login" />; // not logged in
    if (allowedRoles && !allowedRoles.includes(user.data.role)) return <Navigate to="/" />;


  return <Outlet />;
}

export default ProtectedRoute;