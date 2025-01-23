import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../redux/userDetailSlice';

const Navbar = () => {
    const [searchData, setSearchData] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(searchUser(searchData));
      }, [searchData]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/createpost">Create Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/read'>All Post</Link>
                            </li>
                        </ul>
                        <div className="d-flex" >
                            <input className="form-control me-2" type="search" placeholder="Search by Name" onChange={(e) => setSearchData(e.target.value)} />
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar