// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { searchUser } from "../redux/userDetailSlice";

// const Navbar = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const role = user?.role; // Ensure safe access

//     const navigate = useNavigate();
//     const [searchData, setSearchData] = useState("");
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(searchUser(searchData));
//     }, [searchData, dispatch]);

//     const handleLogout = (e) => {
//         e.preventDefault();
//         localStorage.removeItem("user");
//         navigate("/login");
//     };

//     return (
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//             <div className="container-fluid">

//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon" />
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">

//                         {/* Admin: Full Access */}
//                         {role === "admin" && (
//                             <>
//                                 <Link className="navbar-brand" to="/">Navbar</Link>

//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/createpost">Create Post</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/read">All Posts</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/aboutus">About Us</Link>
//                                 </li>
//                             </>
//                         )}

//                         {/* Manager: Create + Read Access */}
//                         {role === "manager" && (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/createpost">Create Post</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/read">All Posts</Link>
//                                 </li>
//                             </>
//                         )}

//                         {/* User: Only Read Access */}
//                         {role === "user" && (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/read">All Posts</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/profile">Profile</Link>
//                                 </li>
//                             </>
//                         )}

//                         {/* Guest: No Private Routes */}
//                         {role === "guest" && (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/aboutus">About Us</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/"></Link>
//                                 </li>
//                             </>
//                         )}

//                         {/* No user */}
//                         {!user && (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/aboutus">About Us</Link>
//                                 </li>
//                             </>
//                         )}
//                     </ul>

//                     {/* Right Side: Buttons */}
//                     <div className="d-flex gap-3">
//                         {user ? (
//                             <>
//                                 {role === "admin" && (
//                                     <button className="btn btn-info">Register User</button>
//                                 )}
//                                 <button className="signinbutton btn-shine me-1  " onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <button className="btn btn-info">Get Register</button>
//                                 <Link to="/login" className="btn btn-success">Log In</Link>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
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
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {role === "admin" && (
                            <>
                                <Link className="navbar-brand" to="/">Navbar</Link>
                                <li className="nav-item"><Link className="nav-link" to="/createpost">Create Post</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/read">All Posts</Link></li>
                            </>
                        )}
                        {role === "manager" && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/createpost">Create Post</Link></li>
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
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-success">Log In</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
