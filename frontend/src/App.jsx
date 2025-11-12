import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Navbar from "./components/Layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Layout/Sidebar";
import UsersList from "./pages/Users/UsersList";
import UserCreate from "./pages/Users/UsersCreate";
import UserEdit from "./pages/Users/UsersEdit";
import { NotificationProvider } from "./context/NotificationContext";

const LayoutWrapper = () => {
  const location = useLocation();
  const hideLayout = ["/login"].includes(location.pathname);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {!hideLayout && <Sidebar />}
      <div className={`flex-1 ${!hideLayout ? "md:ml-64" : ""}`}>
        {!hideLayout && <Navbar />}

        <NotificationProvider>
          <main className="p-4">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/user" element={<UsersList />} />
                <Route path="/user/create" element={<UserCreate />} />
                <Route path="/user/:id" element={<UserEdit />} />
              </Route>
            </Routes>
          </main>
        </NotificationProvider>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper />
      </Router>
    </AuthProvider>
  )
}

export default App
