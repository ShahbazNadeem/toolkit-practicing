import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("User:", user);
    // console.log("Allowed Roles:", allowedRoles);

    // Check if the user exists and their role is in allowedRoles
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;
