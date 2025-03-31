import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define the shape of user data
interface User {
  status: string; 
  UserName: string; 
  Balance: number;
  Exposure: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=> {
    console.log("user data from UserContext", user)
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to use the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
