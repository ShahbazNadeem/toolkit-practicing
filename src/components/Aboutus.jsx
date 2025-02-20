import React, { useEffect, useState } from 'react';
import { fetchCompanyData } from "../redux/companySlice";
import { useDispatch, useSelector } from 'react-redux';

const Aboutus = () => {
  const dispatch = useDispatch();
  const { company, loading, error } = useSelector((state) => state.company);
  const [userRole, setUserRole] = useState(null);

  // Retrieve user data from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCompanyData());
  }, [dispatch]);

  return (
    <>
      <h1>About Us</h1>

      {loading && <p>Loading company data...</p>}
      {error && <p>Error: {error}</p>}

      {company && (
        <div>
          <h2>Company Name: {company.companyName}</h2>
          <p>Company ID: {company.companyId}</p>
          <p>Email: {company.email}</p>

          {/* Display only navitems that match the user's role */}
          {company.navitems && userRole && company.navitems[userRole] ? (
            <div>
              <h3>Navigation Items for {userRole.toUpperCase()}:</h3>
              <ul>
                {company.navitems[userRole].map((item) => (
                  <li key={item.name}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No navigation items available for your role.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Aboutus;
