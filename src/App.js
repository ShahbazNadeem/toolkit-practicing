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
import SuperAdmin from "./components/SuperAdmin";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Unauthorized Routes */}
          {!user ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <Route path="/login" element={<Navigate to="/" />} />
          )}

          {/* Super Admin Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["superadmin"]} />}>
            <Route path="/superadmin" element={<SuperAdmin />} />
          </Route>

          {/* Admin + Super Admin Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["admin", "superadmin"]} />}>
            <Route path="/" element={<NewTodo />} />
            <Route path="/edit/:id" element={<Update />} />
          </Route>

          {/* Manager Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["admin", "manager", "superadmin"]} />}>
            <Route path="/manage" element={<h2>Manager Dashboard</h2>} />
            <Route path="/createpost" element={<CreateFrom />} />
          </Route>

          {/* User Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["admin", "manager", "user", "superadmin"]} />}>
            <Route path="/profile" element={<h2>User Profile</h2>} />
            <Route path="/read" element={<Read />} />
          </Route>

          {/* Guest Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["guest"]} />}>
            <Route path="/" element={<h2>Welcome, Guest!</h2>} />
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<h2>Access Denied</h2>} />

          {/* Common Pages */}
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
