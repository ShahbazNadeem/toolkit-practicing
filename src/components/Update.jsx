import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from '../redux/userDetailSlice';

const Update = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const userDetail = useSelector((state) =>
        state.userDetail.users.find((user) => user.id === id)
    );
    const [updateduser, setUpdateduser] = useState(userDetail);

    useEffect(() => {
        if (userDetail) setUpdateduser(userDetail);
    }, [userDetail]);

    const handleInputChange = ({ target: { name, value } }) =>
        setUpdateduser((prev) => ({ ...prev, [name]: value }));

    if (!updateduser) return <h3>This user is not available</h3>;

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateduser));
        navigate("/");
    };
    return (
        <form className="w-50 mx-auto" onSubmit={handleUpdate}>
            {["name", "email", "age","role","password"].map((field) => (
                <div className="mb-3" key={field}>
                    <label className="form-label">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                        name={field}
                        type={field === "age" ? "number" : "text"}
                        className="form-control"
                        value={updateduser[field] || ""}
                        onChange={handleInputChange}
                    />
                </div>
            ))}
            <div className="mb-3">
                {["male", "female"].map((gender) => (
                    <div key={gender} className="form-check">
                        <input
                            name="gender"
                            className="form-check-input"
                            type="radio"
                            value={gender}
                            checked={updateduser.gender === gender}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">{gender.charAt(0).toUpperCase() + gender.slice(1)}</label>
                    </div>
                ))}
            </div>
            <button type="submit" className="btn btn-primary">
                Update
            </button>
        </form>
    );
};

export default Update;
