import { createContext, useState, useContext } from "react";

// Create context
const NotificationContext = createContext();

// Provider component
export const NotificationProvider = ({ children }) => {
  const [successMsg, setSuccessMsg] = useState("");

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000); // auto-clear after 3s
  };

  return (
    <NotificationContext.Provider value={{ successMsg, showSuccess }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook for easy access
export const useNotification = () => useContext(NotificationContext);
