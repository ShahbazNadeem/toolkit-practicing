import React from "react";
import "./widgets.css";
import { useSelector } from "react-redux";

const CustomModal = ({ id, setShowpopup }) => {
    const allusers = useSelector((state) => state.userDetail.users);

    const singleUser = allusers.filter((ele) => ele.id === id);
    return (
        <div className="modalBackgroung">
            <div className="modalContainer">
                <h2>Custom Modal</h2>
                {singleUser && singleUser.length > 0 ? (
                    <div>
                        <h6>ID : {singleUser[0].id}</h6>
                        {/* <h6>Name : {singleUser[0].name}</h6>
                        <h6>Email : {singleUser[0].email}</h6> */}
                        <p>Role : {singleUser[0].customRole}</p>
                        <p>Permissions:
                            <div className="d-flex flex-wrap">
                                {singleUser[0].permissions.map((perm, index) => (
                                    <span key={index} style={{ marginRight: "10px" }}>{index + 1} : {perm}</span>
                                ))}</div>
                        </p>
                    </div>
                ) : (
                    <p>No user found with the given ID.</p>
                )}
                <button className="btn btn-dark" onClick={() => setShowpopup(false)}>Close</button>
            </div>
        </div>
    );
};

export default CustomModal;
