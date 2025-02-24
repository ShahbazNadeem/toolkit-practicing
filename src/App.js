import "./App.css";
import CreateFrom from "./components/CreateFrom";
import Navbar from "./components/Navbar";
import NewTodo from "./components/NewTodo";
import Read from "./components/Read";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Update from "./components/Update";
import Aboutus from "./components/Aboutus";
import Login from "./protectiontab/Login";
import ProtectedRoute from "./protectiontab/ProtectedRoute";
import SuperAdmin from "./components/SuperAdmin";
import DynamicNavbar from "./components/DynamicNavbar";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <DynamicNavbar />

        <Routes>
          {/* Unauthorized Routes */}
          {!user ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <Route path="/login" element={<Navigate to="/" />} />
          )}

          {/* Super Admin Routes */}
          <Route element={<ProtectedRoute requiredPermission="dashboard" />}>
            <Route path="/superadmin" element={<SuperAdmin />} />
          </Route>

          {/* Admin + Super Admin Routes */}
          <Route element={<ProtectedRoute requiredPermission="home" />}>
            <Route path="/" element={<NewTodo />} />
          </Route>

          <Route element={<ProtectedRoute requiredPermission="registerUser" />}>
            <Route path="/edit/:id" element={<Update />} />
          </Route>

          {/* Manager Routes */}
          <Route element={<ProtectedRoute requiredPermission="ManageUsers" />}>
            <Route path="/manage" element={<h2>Manager Dashboard</h2>} />
          </Route>

          <Route element={<ProtectedRoute requiredPermission="employeeRecords" />}>
            <Route path="/createpost" element={<CreateFrom />} />
          </Route>

          {/* User Routes */}
          <Route element={<ProtectedRoute requiredPermission="profile" />}>
            <Route path="/profile" element={<h2>User Profile</h2>} />
          </Route>

          <Route element={<ProtectedRoute requiredPermission="reports" />}>
            <Route path="/read" element={<Read />} />
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<h2>Access Denied</h2>} />
          
          <Route path="*" element={<h2>Not a valid url</h2>} />

          {/* Common Pages */}
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
