import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredPermission }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!user.permissions.includes(requiredPermission)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
