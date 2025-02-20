
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const role = user?.role;

    const handleLogout = () => {
        navigate("/login");
        dispatch(logout());
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {role === "superadmin" && (
                            <>
                                <Link className="navbar-brand" to="/">Navbar</Link>
                                <li className="nav-item"><Link className="nav-link" to="/createpost">Register new User</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/read">All Posts</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/superadmin">Super Admin Panel</Link></li>
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <Link className="navbar-brand" to="/">Navbar</Link>
                                <li className="nav-item"><Link className="nav-link" to="/createpost">Register new User</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/read">All Posts</Link></li>
                            </>
                        )}
                        {role === "manager" && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/createpost">Register new User</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/read">All Posts</Link></li>
                            </>
                        )}
                        {role === "user" && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/read">All Posts</Link></li>
                            </>
                        )}
                        <li className="nav-item"><Link className="nav-link" to="/aboutus">About Us</Link></li>
                    </ul>

                    <div className="d-flex gap-3">
                        {user ? (
                            <>
                                <button className="btn-shine signinbutton" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-success">Log In</Link>
                                <Link to="/register" className="btn btn-info">Get Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
