import React, { useState } from "react";

const SuperAdmin = () => {
    const [users, setUsers] = useState({
        companyId: "",
        companyName: "",
        email: "",
        navitems: {},
    });

    const roles = {
        admin: [
            { name: "Home", link: "/home" },
            { name: "Add User", link: "/add-user" },
            { name: "Manage Users", link: "/manage-users" },
            { name: "Reports", link: "/reports" }
        ],
        hr: [
            { name: "Dashboard", link: "/dashboard" },
            { name: "Recruitment", link: "/recruitment" },
            { name: "Payroll", link: "/payroll" },
            { name: "Employee Management", link: "/employees" }
        ],
        manager: [
            { name: "Overview", link: "/overview" },
            { name: "Tasks", link: "/tasks" },
            { name: "Reports", link: "/reports" },
            { name: "Team Management", link: "/team" }
        ],
        user: [
            { name: "Tasks", link: "/tasks" },
            { name: "Profile", link: "/profile" }
        ]
    };

    const getUserData = (e) => {
        const { name, value, type, checked, dataset } = e.target;

        if (type === "checkbox") {
            if (dataset.parent) {
                // Handling sub-checkbox (nav item under a role)
                setUsers((prevUsers) => {
                    const parentRole = dataset.parent;
                    const selectedNavItem = roles[parentRole].find(item => item.name === name);

                    return {
                        ...prevUsers,
                        navitems: {
                            ...prevUsers.navitems,
                            [parentRole]: checked
                                ? [...(prevUsers.navitems[parentRole] || []), selectedNavItem]
                                : prevUsers.navitems[parentRole]?.filter(item => item.name !== name) || []
                        }
                    };
                });
            } else {
                // Handling main role checkbox
                setUsers((prevUsers) => {
                    const updatedNavItems = { ...prevUsers.navitems };

                    if (checked) {
                        updatedNavItems[name] = roles[name] || []; // Initialize with all sub-items
                    } else {
                        delete updatedNavItems[name]; // Remove role if unchecked
                    }

                    return { ...prevUsers, navitems: updatedNavItems };
                });
            }
        } else {
            // Handling text inputs
            setUsers((prevUsers) => ({
                ...prevUsers,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(users, "users....");

        try {
            const response = await fetch(
                "https://67b44113392f4aa94faa0586.mockapi.io/Navitems",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(users),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Successfully saved:", data);
                alert("Data saved successfully!");

                // Reset form after submission
                setUsers({
                    companyId: "",
                    companyName: "",
                    email: "",
                    navitems: {}
                });
            } else {
                console.error("Failed to save data");
                alert("Failed to save data");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error saving data");
        }
    };

    return (
        <div>
            <h2>Add new Company</h2>
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Company Id</label>
                    <input
                        name="companyId"
                        type="text"
                        className="form-control"
                        value={users.companyId}
                        onChange={getUserData} // Allow user input
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                        name="companyName"
                        type="text"
                        className="form-control"
                        value={users.companyName}
                        onChange={getUserData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company Email address</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={users.email}
                        onChange={getUserData}
                    />
                </div>

                {/* Role Checkboxes */}
                <div>
                    {Object.keys(roles).map((role) => (
                        <div key={role} className="mb-2">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name={role}
                                    checked={users.navitems.hasOwnProperty(role)}
                                    onChange={getUserData}
                                />
                                <label className="form-check-label fw-bold">{role.toUpperCase()}</label>
                            </div>

                            {/* Nested checkboxes for selected roles */}
                            {users.navitems.hasOwnProperty(role) && (
                                <div className="ms-4">
                                    {roles[role].map((item) => (
                                        <div key={item.name} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={item.name}
                                                data-parent={role}
                                                checked={users.navitems[role]?.some(nav => nav.name === item.name)}
                                                onChange={getUserData}
                                            />
                                            <label className="form-check-label">
                                                {item.name} <span className="text-muted">({item.link})</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SuperAdmin;
