import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUser } from '../redux/userDetailSlice';

const Read = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch])

  return (
    <div>
      <h2>All Data</h2>
      <div className="">
        {users.users && users.users?.map((item) => (
          <div className="card mx-auto" style={{ width: '18rem' }} key={item.id}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">{item.email}</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
