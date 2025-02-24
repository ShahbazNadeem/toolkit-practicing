import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DynamicNavbar = () => {
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem("user"));

  const allNavItems = [
    { name: "Home", link: "/", key: "home" },
    { name: "Register User", link: "/createpost", key: "registerUser" },
    { name: "Manage Users", link: "/manage-users", key: "ManageUsers" },
    { name: "Employee Records", link: "/employee-records", key: "employeeRecords" },
    { name: "Payroll", link: "/payroll", key: "payroll" },
    { name: "Dashboard", link: "/dashboard", key: "dashboard" },
    { name: "Reports", link: "/reports", key: "reports" },
    { name: "Team Performance", link: "/team-performance", key: "teamPerformance" },
    { name: "Profile", link: "/profile", key: "profile" },
    { name: "All Post", link: "/read", key: "all-post" },
  ];

  const allowedNavItems = allNavItems.filter((item) => user?.permissions?.includes(item.key));

  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#f8f9fa" }}>

      {allowedNavItems.map((navItem) => (
        <Link key={navItem.key} to={navItem.link} style={{ textDecoration: "none", color: "black" }}>
          {navItem.name}
        </Link>
      ))}

      <Link to="/aboutus" style={{ textDecoration: "none", color: "black" }}>
        About Us
      </Link>
    </nav>
  );
};

export default DynamicNavbar;
