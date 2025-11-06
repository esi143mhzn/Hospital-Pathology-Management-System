import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (userData, token) => {
        setUser(userData)
        setToken(token)
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
    }
  return (
    <AuthContext.Provider value={{user, token, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}