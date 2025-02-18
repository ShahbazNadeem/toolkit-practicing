import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import "./protected.css";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [users, setUsers] = useState({ email: "", password: "" });

    const getUserData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(users));

        if (loginUser.fulfilled.match(result)) {
            const { role } = result.payload;
            navigate(
                role === "guest" ? "/aboutus" :
                role === "admin" ? "/" :
                role === "superadmin" ? "/superadmin" :
                "/read"
            );
        }
        
    };

    return (
        <div className="container mt-5">
            <div className="heading">Sign in to your account</div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-field">
                    <input required type="email" name="email" id="email" onChange={getUserData} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <input required type="password" name="password" id="password" onChange={getUserData} />
                    <label htmlFor="password">Password</label>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="btn-container">
                    <button type="submit" className="btn-shine signinbutton mx-auto mb-4" disabled={loading}>
                        <span>{loading ? "Signing in..." : "Sign in"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
