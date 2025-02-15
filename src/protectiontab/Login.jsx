import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./protected.css"

const Login = () => {
    const Navigate = useNavigate()
    const [users, setUsers] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const getUserData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://678a3b38dd587da7ac294985.mockapi.io/crud");
            const data = await response.json();
            const user = data.find(
                (user) => user.email === users.email && user.password === users.password
            );
            if (user) {
                localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email, role: user.role }));
                if (user.role == "guest") Navigate("/aboutus")
                else if (user.role == "user") Navigate("/read")
                else if (user.role == "manager") Navigate("/read")
                else if (user.role == "admin") Navigate("/")
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            setError("Failed to connect to the server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <form className="w-25 mx-auto mt-5" onSubmit={handleSubmit}>
                <h2></h2>
                <div className="form-outline mb-4">
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        onChange={getUserData}
                    />
                    <label className="form-label">Email address</label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={getUserData}
                    />
                    <label className="form-label">Password</label>
                </div>

                {error && <p className="text-danger">{error}</p>}
                <button type="submit" class="btn-shine signinbutton  mx-auto mb-4" disabled={loading}>
                    <span>{loading ? "Signing in..." : "Sign in"}</span>
                </button>
            </form> */}

            <div className="container mt-5">
                <div className="heading">SignIn to your account</div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input required type="email" name="email" id="email" onChange={getUserData} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input required type="password" name="password" id="password" onChange={getUserData} />
                        <label htmlFor="username">Password</label>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="btn-container">
                        <button type="submit" class="btn-shine signinbutton  mx-auto mb-4" disabled={loading}>
                            <span>{loading ? "Signing in..." : "Sign in"}</span>
                        </button>

                    </div>
                </form>
            </div>


        </>
    );
};

export default Login;
