import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
    const [users, setUsers] = useState({
        userId: "",
        name: "",
        email: "",
        password: "",
        role: "",
        companyId:"",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(users, "users....");
        dispatch(createUser(users));
        navigate("/");
    };

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">User Id</label>
                    <input
                        name="userId"
                        type="text"
                        className="form-control"
                        value={users.userId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company Id</label>
                    <input
                        name="companyId"
                        type="text"
                        className="form-control"
                        value={users.companyId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={users.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={users.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        value={users.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Enter Role Name</label>
                    <input
                        name="role"
                        type="text"
                        className="form-control"
                        value={users.role}
                        onChange={handleInputChange}
                        placeholder="Type a role..."
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CreateForm;
