import "./App.css";
import CreateFrom from "./components/CreateFrom";
import Navbar from "./components/Navbar";
import NewTodo from "./components/NewTodo";
import Read from "./components/Read";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Update from "./components/Update";
import Aboutus from "./components/Aboutus";
import Login from "./protectiontab/Login";
import RoleBasedRoute from "./protectiontab/RoleBasedRoute";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* <h1>Learn about Redux Toolkit</h1> */}
        <Routes>

          {/* Unauthorized routes */}
          {!user && <Route path="/login" element={<Login />} />}
          {user && <Route path="/login" element={<Navigate to="/" />} />}

          {/* Protected Routes with Role-Based Access */}



          {/* User Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["admin", "manager", "user"]} />}>
            {/* <Route path="/" element={<Read />} /> */}
            <Route path="/profile" element={<h2>User Profile</h2>} />
            <Route path="/read" element={<Read />} />
          </Route>

          {/* Manager Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["admin", "manager"]} />}>
            <Route path="/manage" element={<h2>Manager Dashboard</h2>} />
            <Route path="/read" element={<Read />} />
            <Route path="/createpost" element={<CreateFrom />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route path="/" element={<NewTodo />} />
            <Route path="/createpost" element={<CreateFrom />} />
            <Route path="/edit/:id" element={<Update />} />
            <Route path="/read" element={<Read />} />
          </Route>

          {/* Guest Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["guest"]} />}>
            <Route path="/" element={<h2>Welcome, Guest!</h2>} />
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<h2>Access Denied</h2>} />

          {/* Common page */}
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
