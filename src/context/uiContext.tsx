import React, { createContext, useState, useEffect, useContext } from "react";

// Define the context type
interface UIContextType {
  userData: Record<string, any> | null;
}

// Create Context
const UIContext = createContext<UIContextType | undefined>(undefined);

// Provider Component
export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetch("/api/UserData.json") // Adjust the path if necessary
      .then((response) => response.json())
      .then((data) =>{setUserData(data);} )
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return <UIContext.Provider value={{ userData }}>{children}</UIContext.Provider>;
};

// Custom hook for easy access
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
