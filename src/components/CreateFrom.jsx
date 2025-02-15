import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const CreateFrom = () => {
    const [users, setUsers] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUserData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(users, "users....")
        dispatch(createUser(users));
        navigate("/")
    }
    return (
        <div>
            <form className='w-50 mx-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name='name' type="text" className="form-control" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input name='email' type="email" className="form-control" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input name='age' type="number" className="form-control" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name='password' type="text" className="form-control" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input name='role' type="text" className="form-control" onChange={getUserData} />
                </div>
                <div>
                    <div className="mb-3">
                        <input name='gender' className="form-check-input" value="male" type="radio" onChange={getUserData} />
                        <label className="form-check-label" >
                            Male
                        </label>
                    </div>
                    <div className="mb-3">
                        <input name='gender' className="form-check-input" value="female" type="radio" onChange={getUserData} />
                        <label className="form-check-label" >
                            Femail
                        </label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default CreateFrom