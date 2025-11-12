import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

const LayoutWrapper = () => {
  const location = useLocation();
  const hideLayout = ["/login"].includes(location.pathname);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {!hideLayout && <Sidebar />}
      <div className={`flex-1 ${!hideLayout ? "md:ml-64" : ""}`}>
        {!hideLayout && <Navbar />}

        <main className="p-4">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<Users />} />
            </Route>
          </Routes>
        </main>
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
