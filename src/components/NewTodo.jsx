import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../redux/userDetailSlice";
import { Link } from "react-router-dom";
import CustomModal from "./CustomModal";

const NewTodo = () => {
    const dispatch = useDispatch();
    const { users, loading, error, searchData } = useSelector((state) => state.userDetail);
    const [id, setId] = useState(null);
    const [showpopup, setShowpopup] = useState(false);
    const [radioData, setRadioData] = useState("all");

    useEffect(() => {
        dispatch(showUser());
    }, [dispatch]);

    const handleRadioChange = (e) => setRadioData(e.target.value);

    const filteredUsers = users
        .filter(({ name }) =>
            searchData ? name.toLowerCase().includes(searchData.toLowerCase()) : true
        )
        .filter(({ gender }) =>
            radioData === "all" ? true : gender === radioData
        );

    return (
        <div>
            {showpopup && (
                <CustomModal id={id} showpopup={showpopup} setShowpopup={setShowpopup} />
            )}
            <h2>Fetch Data</h2>

            {users.length > 0 && (
                <>
                    <Link to="/createpost" className="btn btn-primary m-2">
                        Add New
                    </Link>
                    <div className="d-flex justify-content-center my-2">
                        {["all", "male", "female"].map((gender) => (
                            <div key={gender} className="form-check mx-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={radioData === gender}
                                    onChange={handleRadioChange}
                                />
                                <label className="form-check-label">
                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {loading && <>
                <div class="three-body">
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                </div></>}
            {error && <h3>Error while fetching users.</h3>}
            {/*  */}

            <div className="card mx-auto">
                <div className="card__title">Users</div>
                {filteredUsers.map(({ id, name }) => (
                    <div className="card__data">
                        <div className="card__right">
                            <div className="item">{name}</div>
                        </div>
                        <div className="card__left">
                            <div className="item">
                                <button
                                    className="btn btn-success me-2"
                                    onClick={() => {
                                        setId(id);
                                        setShowpopup(true);
                                    }}
                                >
                                    View
                                </button>
                                <Link to={`/edit/${id}`} className="btn btn-info me-2">
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => dispatch(deleteUser(id))}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>


            {/*  */}

            {/* <ul>
                {filteredUsers.map(({ id, name }) => (
                    <li
                        key={id}
                        className="d-flex gap-5 justify-content-center mb-1"
                    >
                        <h3>{name}</h3>
                        <button
                            className="btn btn-success me-2"
                            onClick={() => {
                                setId(id);
                                setShowpopup(true);
                            }}
                        >
                            View
                        </button>
                        <Link to={`/edit/${id}`} className="btn btn-info me-2">
                            Edit
                        </Link>
                        <button
                            className="btn btn-danger"
                            onClick={() => dispatch(deleteUser(id))}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul> */}

            {!filteredUsers.length && !loading && (
                <h5 className="text-center mt-3">
                    No users found for "{searchData}"
                </h5>
            )}
        </div>
    );
};

export default NewTodo;
