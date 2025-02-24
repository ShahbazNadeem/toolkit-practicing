import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {

    const [users, setUsers] = useState({
        companyId: "",
        customRole: "",
        permissions: []
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const routes = [
        "home", "registerUser", "ManageUsers",
        "employeeRecords", "payroll",
        "teamPerformance", "reports",
        "dashboard", "profile","allPost"
    ];

    const handleRoleInput = (e) => {
        setUsers({ ...users, customRole: e.target.value });
    };

    const handlePermissionChange = (e) => {
        const { name, checked } = e.target;
        setUsers(prevUsers => ({
            ...prevUsers,
            permissions: checked
                ? [...prevUsers.permissions, name]
                : prevUsers.permissions.filter(item => item !== name)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(users, "users....");
        dispatch(createUser(users));
        navigate("/");
    };

    return (
        <div>
            <h2 className='my-5'>Register New User</h2>
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">User Id</label>
                    <input name="userId" type="text" className="form-control" placeholder="Enter User's Id" onChange={(e) => setUsers({ ...users, userId: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name="name" type="text" className="form-control" placeholder='Enter the name' onChange={(e) => setUsers({ ...users, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" placeholder='Enter the email' onChange={(e) => setUsers({ ...users, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name="password" type="text" placeholder='Enter the password' className="form-control" onChange={(e) => setUsers({ ...users, password: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company ID</label>
                    <input name="text" type="text" placeholder="What's the Company Id" className="form-control" onChange={(e) => setUsers({ ...users, companyId: e.target.value })} />
                </div>

                {/* Custom Role Input */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Enter Role Name</label>
                    <input
                        name="customRole"
                        type="text"
                        className="form-control"
                        value={users.customRole}
                        onChange={handleRoleInput}
                        placeholder="Type a role..."
                    />
                </div>

                {/* Permission Checkboxes */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Select Permissions for {users.customRole || "Role"}</label>
                    <div className="ms-3 d-flex flex-row flex-wrap gap-3">
                        {routes.map(route => (
                            <div key={route} className="form-check">
                                <input
                                    type="checkbox"
                                    name={route}
                                    className="form-check-input"
                                    checked={users.permissions.includes(route)}
                                    onChange={handlePermissionChange}
                                />
                                <label className="form-check-label">
                                    {route.charAt(0).toUpperCase() + route.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CreateForm;