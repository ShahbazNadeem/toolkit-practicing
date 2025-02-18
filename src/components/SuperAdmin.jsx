import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const SuperAdmin = () => {
    const [users, setUsers] = useState({
        companyName: "",
        email: "",
        navitems: [] // Array of objects { name: "", link: "" }
    });

    const [customCheckboxes, setCustomCheckboxes] = useState([]); // Stores dynamically added checkboxes
    const [newCheckbox, setNewCheckbox] = useState(""); // New feature name input
    const [newLink, setNewLink] = useState(""); // New feature link input

    const getUserData = (e) => {
        const { name, value, type, checked, dataset } = e.target;

        if (type === "checkbox") {
            setUsers((prevUsers) => ({
                ...prevUsers,
                navitems: checked
                    ? [...prevUsers.navitems, { name, link: dataset.link }] // Add if checked
                    : prevUsers.navitems.filter(item => item.name !== name) // Remove if unchecked
            }));
        } else {
            setUsers((prevUsers) => ({
                ...prevUsers,
                [name]: value
            }));
        }
    };

    const handleAddCheckbox = () => {
        if (newCheckbox.trim() === "" || newLink.trim() === "") return; // Prevent empty values

        const newFeature = { name: newCheckbox, link: newLink };

        if (!customCheckboxes.find(item => item.name === newCheckbox)) {
            setCustomCheckboxes([...customCheckboxes, newFeature]); // Add new feature
        }
        setNewCheckbox("");
        setNewLink("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(users, "users....");

        try {
            const response = await fetch(
                "https://67b44113392f4aa94faa0586.mockapi.io/NavbarList",
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
                // alert("Data saved successfully!");

                setUsers({
                    companyName: "",
                    email: "",
                    navitems: []
                });
                setCustomCheckboxes([]); // Reset dynamically added checkboxes
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

                {/* Dynamic Checkbox Input */}
                <div className="mb-3">
                    <label className="form-label">Add a New Feature</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Feature Name"
                        value={newCheckbox}
                        onChange={(e) => setNewCheckbox(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Enter Feature Link (e.g., /dashboard)"
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                    />
                    <button type="button" className="btn btn-secondary mt-2" onClick={handleAddCheckbox}>
                        Add New Feature
                    </button>
                </div>

                {/* Predefined Checkboxes */}
                <div>
                    {[
                        { name: "Home", link: "/" },
                        { name: "Register New User", link: "/register" },
                        { name: "All Post", link: "/posts" }
                    ].map((item) => (
                        <div className="form-check" key={item.name}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name={item.name}
                                data-link={item.link}
                                checked={users.navitems.some(nav => nav.name === item.name)}
                                onChange={getUserData}
                            />
                            <label className="form-check-label">{item.name}</label>
                        </div>
                    ))}
                </div>

                {/* Dynamically Added Checkboxes */}
                {customCheckboxes.map((item, index) => (
                    <div className="form-check" key={index}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name={item.name}
                            data-link={item.link}
                            checked={users.navitems.some(nav => nav.name === item.name)}
                            onChange={getUserData}
                        />
                        <label className="form-check-label">{item.name} ({item.link})</label>
                    </div>
                ))}

                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>

            {/* Navigation Bar Preview */}
            <nav className="mt-5">
                <h3>Navigation Bar</h3>
                <ul className="nav nav-pills">
                    {users.navitems.map((item, index) => (
                        <li className="nav-item" key={index}>
                            <Link className="nav-link" to={item.link}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SuperAdmin;
