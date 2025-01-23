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
                        <h3>ID : {singleUser[0].id}</h3>
                        <h3>Name : {singleUser[0].name}</h3>
                        <h3>Email : {singleUser[0].email}</h3>
                        <h4>Age : {singleUser[0].age}</h4>
                        <p>Gender : {singleUser[0].gender}</p>
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
